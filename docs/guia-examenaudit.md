# Recuperación Sprint 1: ExamenAudit ↔ Company

Resuelto y probado el 22-nov-2026 en tu rama local `sprint-1` (sin commit ni push).
Entidad elegida: **Company** (`companies`).

## 0. Lo que falló el día 17 y cómo queda ahora

| Corrección del profe | Causa | Solución |
|---|---|---|
| No hay asociación en `associations.ts` | No se añadió | `Company.hasMany(ExamenAudit)` + `ExamenAudit.belongsTo(Company)` |
| Falta `companyId` | La migración tenía `name` y `companyName` | Columna `company_id` NOT NULL con FK a `companies.id` |
| El proyecto no arranca / no hay tabla | `sync({ force: true })` borra y recrea tablas al arrancar, y la migración no se llegó a ejecutar | Se comenta el `sync` y las tablas las crean solo las migraciones |
| No hay seeder ni Bruno | No dio tiempo | Seeder + carpeta Bruno "Examen audits" |

### Cómo se lee el ERD
`ExamenAudit >o——|| Company`
- Lado ExamenAudit: pata de gallo + círculo = **0..N** (una empresa puede tener 0 o muchos registros).
- Lado Company: dos rayas = **exactamente 1** (cada ExamenAudit pertenece a una empresa) → `companyId` **NOT NULL**.
- En Sequelize: 1:N → `hasMany` en el lado "1" y `belongsTo` en el lado "N". La FK vive en la tabla del lado N (`examen_audit.company_id`).

## 1. Pasos en el examen (orden exacto)

1. Rama: `git checkout sprint-1` y `git checkout -b examen-tu-nombre`.
2. `backend/.env.development` con los datos del examen:
   ```
   NODE_ENV=development
   PORT=3000
   API_URL=http://localhost:3000
   DB_DIALECT=postgres
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=examen
   DB_USER=postgres
   DB_PASSWORD=examen
   ```
3. `cd backend` y `npm install` (si no está `node_modules`).
4. Crear los archivos del apartado 2 (modelo, service, controller, routes, migración, seeder) y tocar `associations.ts`, `routes/index.ts` y `server.ts`.
5. **Migración**: `npm run db:migrate` → tiene que salir `20261122170000-create-examen-audit: migrated`.
   Pantallazo → `docs/screenshots/01-migracion.png` (la consola y/o pgAdmin con la tabla `examen_audit` y sus columnas).
6. **Seeder**: `npm run db:seed` → tiene que salir `20261122170100-seed-examen-audit: migrated`.
   Pantallazo → `docs/screenshots/02-seeder.png` (consola + `SELECT * FROM examen_audit;` en pgAdmin).
7. **Arrancar**: `npm run dev` → `Servidor funcionando en http://localhost:3000`.
8. **Bruno** (baseUrl = `http://localhost:3000/api`), carpeta "Examen audits": Get all, Get by id, Create, Update, Delete y **Get examen audits with operation CREATE**.
   Pantallazo de esta última → `docs/screenshots/03-consulta-operation-create.png`.

Notas:
- En PowerShell, si `npm` da "running scripts is disabled", usa `npm.cmd run ...` o abre `cmd`.
- La BD `examen` del examen está vacía: `db:migrate` crea las 27 tablas y `db:seed` mete los datos de todos. Si la BD ya tuviera tablas de un `sync`, la migración falla con "relation already exists": bórralas o usa una BD vacía.
- Si te equivocas: `npm run db:seed:undo` y `npm run db:migrate:undo` deshacen (el undo de migraciones es de todas).
- El seeder depende de las empresas del seeder de company (`B35123456`, `B38234567`), por eso su fecha es posterior.

## 2. Código

### 2.1 `backend/src/modules/examen-audit/examen-audit.model.ts`
```ts
import {
    Model,
    DataTypes,
    type InferAttributes,
    type InferCreationAttributes,
    type CreationOptional,
} from "sequelize";
import { sequelize } from "../../config/database.js";

export class ExamenAudit extends Model<
    InferAttributes<ExamenAudit>,
    InferCreationAttributes<ExamenAudit>
> {
    declare id: CreationOptional<number>;
    // FK obligatoria: cada ExamenAudit pertenece a una Company (N:1 en el ERD)
    declare companyId: number;
    declare description: string;
    // Puede ser null; si tiene valor solo puede ser CREATE, MODIFY o READ
    declare operation: CreationOptional<"CREATE" | "MODIFY" | "READ" | null>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

ExamenAudit.init(
    {
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        companyId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        description: { type: DataTypes.STRING(255), allowNull: false },
        operation: { type: DataTypes.ENUM("CREATE", "MODIFY", "READ"), allowNull: true },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        sequelize,
        tableName: "examen_audit",
        modelName: "ExamenAudit",
        timestamps: true,
    }
);
```

### 2.2 `backend/src/models/associations.ts` (2 cambios)
```ts
// arriba, con los imports de tus modelos
import { ExamenAudit } from "../modules/examen-audit/examen-audit.model.js";

// dentro de defineAssociations(), después de las de EmploymentRecord
// EXAMEN: una Company tiene 0..N ExamenAudit y cada ExamenAudit pertenece a 1 Company
Company.hasMany(ExamenAudit, { foreignKey: "companyId", as: "examenAudits", onDelete: "CASCADE" }); //1:N
ExamenAudit.belongsTo(Company, { foreignKey: "companyId", as: "company" }); //N:1
```

### 2.3 `backend/src/modules/examen-audit/examen-audit.service.ts`
```ts
import { ExamenAudit } from "./examen-audit.model.js";
import { Company } from "../company/company.model.js";

const includeCompany = { model: Company, as: "company", attributes: ["id", "name"] };

export class ExamenAuditService {
    static async findAll() {
        return ExamenAudit.findAll({ include: [includeCompany], order: [["id", "ASC"]] });
    }
    static async findById(id: number) {
        return ExamenAudit.findByPk(id, { include: [includeCompany] });
    }
    // Consulta del examen: solo los registros cuya operation es CREATE
    static async findOperationCreate() {
        return ExamenAudit.findAll({
            where: { operation: "CREATE" },
            include: [includeCompany],
            order: [["id", "ASC"]],
        });
    }
    static async companyExists(companyId: number) {
        const company = await Company.findByPk(companyId);
        return company !== null;
    }
    static async create(data: { companyId: number; description: string; operation?: "CREATE" | "MODIFY" | "READ" | null }) {
        const examenAudit = await ExamenAudit.create(data);
        return ExamenAuditService.findById(examenAudit.id);
    }
    static async update(
        examenAudit: ExamenAudit,
        data: { companyId?: number; description?: string; operation?: "CREATE" | "MODIFY" | "READ" | null }
    ) {
        await examenAudit.update(data);
        return ExamenAuditService.findById(examenAudit.id);
    }
    static async delete(examenAudit: ExamenAudit) {
        await examenAudit.destroy();
    }
}
```

### 2.4 `backend/src/modules/examen-audit/examen-audit.controller.ts`
```ts
import type { Request, Response, NextFunction } from "express";
import { ExamenAuditService } from "./examen-audit.service.js";

// Valores permitidos para operation (además de null)
const OPERATIONS = ["CREATE", "MODIFY", "READ"];

export class ExamenAuditController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            res.json(await ExamenAuditService.findAll());
        } catch (error) { next(error); }
    }
    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const examenAudit = await ExamenAuditService.findById(Number(req.params.id));
            if (!examenAudit) {
                res.status(404).json({ message: "ExamenAudit not found" });
                return;
            }
            res.json(examenAudit);
        } catch (error) { next(error); }
    }
    static async getOperationCreate(req: Request, res: Response, next: NextFunction) {
        try {
            res.json(await ExamenAuditService.findOperationCreate());
        } catch (error) { next(error); }
    }
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { companyId, description, operation } = req.body;
            if (companyId === undefined || description === undefined) {
                res.status(400).json({ message: "companyId and description are required" });
                return;
            }
            // operation es opcional, pero si viene con valor tiene que ser uno de los 3
            if (operation !== undefined && operation !== null && !OPERATIONS.includes(operation)) {
                res.status(400).json({ message: "operation must be CREATE, MODIFY or READ" });
                return;
            }
            if (!(await ExamenAuditService.companyExists(Number(companyId)))) {
                res.status(400).json({ message: "Company not found" });
                return;
            }
            const examenAudit = await ExamenAuditService.create({ companyId: Number(companyId), description, operation });
            res.status(201).json(examenAudit);
        } catch (error) { next(error); }
    }
    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const examenAudit = await ExamenAuditService.findById(Number(req.params.id));
            if (!examenAudit) {
                res.status(404).json({ message: "ExamenAudit not found" });
                return;
            }
            const { companyId, description, operation } = req.body;
            if (operation !== undefined && operation !== null && !OPERATIONS.includes(operation)) {
                res.status(400).json({ message: "operation must be CREATE, MODIFY or READ" });
                return;
            }
            if (companyId !== undefined && !(await ExamenAuditService.companyExists(Number(companyId)))) {
                res.status(400).json({ message: "Company not found" });
                return;
            }
            const updated = await ExamenAuditService.update(examenAudit, {
                ...(companyId !== undefined && { companyId: Number(companyId) }),
                ...(description !== undefined && { description }),
                ...(operation !== undefined && { operation }),
            });
            res.json(updated);
        } catch (error) { next(error); }
    }
    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const examenAudit = await ExamenAuditService.findById(Number(req.params.id));
            if (!examenAudit) {
                res.status(404).json({ message: "ExamenAudit not found" });
                return;
            }
            await ExamenAuditService.delete(examenAudit);
            res.status(204).send();
        } catch (error) { next(error); }
    }
}
```
(En tu PC está escrito con el formato largo de los demás controladores; el de aquí está compactado para leerlo mejor, hace lo mismo.)

### 2.5 `backend/src/modules/examen-audit/examen-audit.routes.ts`
```ts
import { Router } from "express";
import { ExamenAuditController } from "./examen-audit.controller.js";
const router = Router();
router.get("/", ExamenAuditController.getAll);
// Va antes de "/:id" para que Express no tome "operation" como un id
router.get("/operation/create", ExamenAuditController.getOperationCreate);
router.get("/:id", ExamenAuditController.getById);
router.post("/", ExamenAuditController.create);
router.put("/:id", ExamenAuditController.update);
router.delete("/:id", ExamenAuditController.delete);
export default router;
```

### 2.6 `backend/src/routes/index.ts` (2 líneas)
```ts
import examenAuditRoutes from "../modules/examen-audit/examen-audit.routes.js";
router.use("/examen-audits", examenAuditRoutes);
```

### 2.7 `backend/src/server.ts`
```ts
// Las tablas las crean las migraciones (npm run db:migrate). Con sync({ force: true })
// se borrarían las tablas y los datos de los seeders cada vez que arranca el servidor.
// await sequelize.sync({ force: true });
```

### 2.8 Migración `backend/database/migrations/20261122170000-create-examen-audit.js`
Columnas en snake_case (porque `underscored: true`) y fecha posterior a la de `companies`.
```js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('examen_audit', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      // FK a companies: cada registro pertenece a una empresa (N:1)
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'companies', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      description: { type: Sequelize.STRING(255), allowNull: false },
      operation: { type: Sequelize.ENUM('CREATE', 'MODIFY', 'READ'), allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('examen_audit');
    // PostgreSQL keeps the ENUM type after dropping the table.
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_examen_audit_operation";');
  }
};
```

### 2.9 Seeder `backend/database/seeders/20261122170100-seed-examen-audit.js`
```js
'use strict';

const TAX_IDS = ['B35123456', 'B38234567'];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();

    // Depende del seeder de company: se busca el id de cada empresa por su tax_id
    const companies = await queryInterface.sequelize.query(
      'SELECT id, tax_id FROM companies WHERE tax_id IN (:taxIds)',
      { replacements: { taxIds: TAX_IDS }, type: Sequelize.QueryTypes.SELECT }
    );

    const companyId = Object.fromEntries(companies.map((c) => [c.tax_id, c.id]));

    // operation admite CREATE, MODIFY, READ o null
    await queryInterface.bulkInsert('examen_audit', [
      { company_id: companyId['B35123456'], description: 'Alta de la empresa en la plataforma', operation: 'CREATE', created_at: now, updated_at: now },
      { company_id: companyId['B35123456'], description: 'Cambio del email de contacto', operation: 'MODIFY', created_at: now, updated_at: now },
      { company_id: companyId['B38234567'], description: 'Alta de la empresa en la plataforma', operation: 'CREATE', created_at: now, updated_at: now },
      { company_id: companyId['B38234567'], description: 'Consulta de la ficha de la empresa', operation: 'READ', created_at: now, updated_at: now },
      { company_id: companyId['B38234567'], description: 'Registro sin operación indicada', operation: null, created_at: now, updated_at: now },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const companies = await queryInterface.sequelize.query(
      'SELECT id FROM companies WHERE tax_id IN (:taxIds)',
      { replacements: { taxIds: TAX_IDS }, type: Sequelize.QueryTypes.SELECT }
    );

    await queryInterface.bulkDelete('examen_audit', { company_id: companies.map((c) => c.id) }, {});
  }
};
```
Plan B si en el examen no hay seeder de company: insertar la empresa en el propio seeder o poner `company_id: 1` después de crear una empresa desde Bruno.

## 3. Bruno: carpeta "Examen audits"

Ya creada en `Documents\bruno\prisma-fp-canarias\Examen audits` (seq 28):

| Petición | Método y URL | Body |
|---|---|---|
| Create examen audit | POST `{{baseUrl}}/examen-audits` | `{"companyId":1,"description":"Alta creada desde Bruno","operation":"CREATE"}` |
| Create examen audit (to delete) | POST `{{baseUrl}}/examen-audits` | `{"companyId":2,"description":"Registro para borrar","operation":"READ"}` |
| Get all examen audits | GET `{{baseUrl}}/examen-audits` | |
| Get examen audit by id | GET `{{baseUrl}}/examen-audits/1` | |
| Update examen audit | PUT `{{baseUrl}}/examen-audits/1` | `{"description":"Descripcion modificada desde Bruno","operation":"MODIFY"}` |
| Delete examen audit | DELETE `{{baseUrl}}/examen-audits/2` | |
| Get examen audits with operation CREATE | GET `{{baseUrl}}/examen-audits/operation/create` | |

## 4. Resultado de la prueba (BD temporal, 22-nov)
- `db:migrate`: 27 migraciones OK; `\d examen_audit` muestra `company_id integer not null` con FK `REFERENCES companies(id) ON DELETE CASCADE` y `operation enum_examen_audit_operation` nullable.
- `db:seed`: 5 filas (2 CREATE, 1 MODIFY, 1 READ, 1 null).
- Servidor arranca sin `sync`. `GET /operation/create` → 200 con los 2 CREATE e `include` de la empresa.
- POST → 201; operation "DELETE" → 400; sin companyId → 400; companyId 999 → 400; PUT → 200; DELETE → 204; GET del borrado → 404.
