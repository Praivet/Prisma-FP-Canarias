# Chuleta del examen DSW (rama sprint-1)

Todo se ejecuta desde la carpeta `backend`.

## 1. Arrancar el proyecto desde cero

```bash
npm install                 # instala dependencias (si sale "Please install pg package manually", es esto)
                            # Crear la base de datos vacía en pgAdmin: prisma_fp_develop
npm run db:migrate          # crea las tablas con las migraciones
npm run db:seed             # mete los datos de prueba
npm run dev                 # arranca la API en http://localhost:3000/api
```

**El orden importa**: primero `db:migrate` y después `npm run dev`. Si arrancas antes la API, `sync()` crea las tablas y luego las migraciones fallan porque ya existen. Si pasa, borra la base de datos, créala de nuevo y repite en este orden.

## 2. Comandos de migraciones

| Comando | Qué hace |
|---|---|
| `npm run db:migrate` | Ejecuta todas las migraciones pendientes |
| `npm run db:migrate:status` | Lista las migraciones: `up` = ejecutada, `down` = pendiente |
| `npx sequelize-cli db:migrate:undo` | Deshace **solo la última** migración |
| `npm run db:migrate:undo:all` | Deshace **todas** las migraciones |
| `npx sequelize-cli migration:generate --name add-loquesea` | Crea una migración vacía en `database/ivan/migrations` |

## 3. Comandos de seeders

| Comando | Qué hace |
|---|---|
| `npm run db:seed` | Ejecuta todos los seeders pendientes |
| `npx sequelize-cli db:seed:undo` | Deshace **solo el último** seeder |
| `npm run db:seed:undo` | ⚠️ Deshace **todos** los seeders |
| `npx sequelize-cli seed:generate --name seed-loquesea` | Crea un seeder vacío en `database/ivan/seeders` |
| `npm run db:reset` | Deshace todo y lo vuelve a crear: seeders fuera, migraciones fuera, migraciones y seeders otra vez |

⚠️ **Después de `migration:generate` o `seed:generate`, renombra el archivo de `.js` a `.cjs`.** El proyecto es `"type": "module"` y sequelize-cli solo puede cargar `.cjs`.

Para deshacer todo a mano, el orden es **primero seeders y luego migraciones**: `npm run db:seed:undo` y después `npm run db:migrate:undo:all`.

## 4. Orden para hacer un ejercicio de examen

1. **Columna o FK nueva en un modelo**: `declare` con `CreationOptional<... | null>` y en el `init` el mismo `allowNull`.
2. **Asociación** en `associations.ts`: el que tiene la FK hace `belongsTo`; el otro, `hasMany` (o `hasOne` si es 1:1). Las dos con el mismo `foreignKey`.
3. **Migración**: `createTable` si es tabla nueva, `addColumn` si es columna nueva en una tabla que ya existe.
4. **Seeder**: `bulkInsert` para filas nuevas y `bulkUpdate` para cambiar filas que ya existen. Los ids siempre con un SELECT.
5. **Consultas**: service, controller y ruta (las rutas con texto fijo van antes de `/:id`).
6. **Módulo nuevo**: `import` + `router.use(...)` en `src/routes/index.ts`.
7. **Bruno**: colección `bruno/examen-sprint1.json`.

## 5. Errores que ya nos han salido

| Error | Causa | Solución |
|---|---|---|
| `Please install pg package manually` | Falta `node_modules` | `npm install` |
| `received invalid response: 4a` | Se conecta a MySQL (puerto 3306) | Revisar `.env.development` (puerto 5432) |
| `ECONNREFUSED` | PostgreSQL no está arrancado | `services.msc` → iniciar `postgresql-x64-…` |
| `no existe la base de datos` | Falta crear la BD | Crearla en pgAdmin |
| `relation "X" already exists` al migrar | Se arrancó la API antes de migrar | Borrar la BD, crearla otra vez, `db:migrate` antes de `npm run dev` |
| `relation "training_program" does not exist` | Nombre de tabla mal escrito | Tablas en plural y snake_case: `training_programs` |
| `column "programId" does not exist` en un seeder | Columna en camelCase | En migraciones y seeders, snake_case: `program_id` |
| `... is associated to ... using an alias ... does not match` | El `as` del `include` no coincide | Copiar el alias exacto de `associations.ts` |
| `X is not defined` en el `down` de un seeder | Usar en el `down` una variable del `up` | Repetir el SELECT en el `down` o poner el valor directamente |
| `Cannot read properties of undefined (reading 'id')` en un seeder | El SELECT no encontró nada (`[0]` no existe) | Revisar el valor buscado y que el seeder que lo crea vaya antes (orden = nombre del archivo) |
| Bruno: 404 en un módulo nuevo | No está registrado | `import` + `router.use(...)` en `src/routes/index.ts` |
| Bruno: 404 o 500 en `/eagerly/...` | La ruta está debajo de `/:id` | Subir la ruta por encima de `/:id` |
| Bruno: 500 "Error interno del servidor" | Ver la terminal de `npm run dev` | Por ejemplo, `req.params.X` con un nombre distinto al de la ruta |

## 6. Migraciones (`database/ivan/migrations`)

| Archivo | Caso de examen | Métodos |
|---|---|---|
| `20261115100100-create-academic-years` | Tabla sin FKs | `createTable` / `dropTable` |
| `20261115100200-create-skills` | Tabla sin FKs con `unique` | `createTable` / `dropTable` |
| `20261115100300-create-training-programs` | Tabla con dos FKs (1:N) | `references` + `onDelete` |
| `20261115100400-create-students` | FK 1:1 (`user_id` con `unique: true`) | `createTable` con timestamps |
| `20261115100500-create-student-enrollments` | Tabla con tres FKs | tres `references` |
| `20261115100600-create-student-interests` | 1:N sencilla | una FK con `onDelete: "CASCADE"` |
| `20261115100700-create-student-skills` | Tabla intermedia N:M con PK compuesta | dos FKs con `primaryKey: true` |
| `20261115100800-create-tutor-assignments` | FK a `users` con otro nombre (`tutor_id`) | `references: { model: "users" }` |
| `20261117100000-ejemplo-add-notes-to-student-enrollments` | Columna nueva en una tabla que ya existe | `addColumn` / `removeColumn`, tipo `TEXT` |
| `20261117100200-ejemplo-change-skill-category-length` | Cambiar tipo o tamaño de una columna | `changeColumn` (el `down` la deja como estaba) |
| `20261117100300-ejemplo-add-index-enrollment-status` | Índice para buscar más rápido | `addIndex` / `removeIndex` |

## 7. Seeders (`database/ivan/seeders`)

| Archivo | Caso de examen | Qué usa |
|---|---|---|
| `20261115110200-seed-skills` | Filas sin FK | Solo `bulkInsert` / `bulkDelete` |
| `20261115110300-seed-training-programs` | Varias filas con FKs | SELECT con `IN` + `Object.fromEntries` |
| `20261115110700-seed-student-skills` | Tabla intermedia N:M | SELECT de los dos lados + `bulkInsert` |
| `20261117110000-ejemplo-seed-enrollment-notes` | Rellenar una columna en filas que ya existen | `bulkUpdate` por `status`, sin buscar ids |
| `20261117110100-ejemplo-seed-more-skills` | "Crea estas skills" | `bulkInsert` + constante para el `down` |
| `20261117110200-ejemplo-seed-training-program-with-fks` | Una fila con dos FKs | dos SELECT + `bulkInsert` con `[0].id` |
| `20261117110300-ejemplo-seed-user-and-student` | Alumno nuevo (necesita su user 1:1) | `bulkInsert` user → SELECT → `bulkInsert` student; `down` al revés |
| `20261117110400-ejemplo-seed-enrollment-three-fks` | Matrícula nueva con tres FKs | tres SELECT + `bulkInsert`; SELECT repetido en el `down` |
| `20261117110500-ejemplo-seed-student-skills-and-interests` | Filas N:M y 1:N para un alumno | SELECT con `IN` + `Object.fromEntries` |
| `20261117110600-ejemplo-seed-tutor-assignment` | Asignar un tutor (FK `tutor_id`) | tres SELECT + `bulkInsert` |
| `20261117110700-ejemplo-update-program-center` | Cambiar una FK en una fila existente | SELECT + `bulkUpdate`; el `down` pone el valor anterior |

## 8. Métodos de consulta

| Ruta (Bruno, delante va `{{baseUrl}}`) | Método del service | Qué enseña |
|---|---|---|
| `GET /training-programs/eagerly/family-center` | `TrainingProgramService.findAllWithFamilyAndCenter` | **Q1** Dos `include` al mismo nivel con `attributes` |
| `GET /training-programs/eagerly/family/:familyCode` | `TrainingProgramService.findAllByFamilyCode` | **Q2** `where` dentro del `include` (INNER JOIN) |
| `GET /students/born-after/:date` | `StudentService.findAllBornAfter` | **Q3** `[Op.gt]` sobre la tabla principal |
| `GET /students/enrolled/level/:level` | `StudentService.findAllEnrolledByProgramLevel` | **Q4** `include` anidado con un `where` en cada nivel |
| `GET /student-enrollments/eagerly/student-program` | `StudentEnrollmentService.findAllWithStudentAndProgram` | **Q5** `include` con `attributes` |
| `GET /student-enrollments/before/:date` | `StudentEnrollmentService.findAllBefore` | **Q6** `[Op.lt]` |
| `GET /skills/eagerly/status/:status/program/:programCode` | `SkillService.findAllByEnrollmentStatusAndProgramCode` | **Q7** Tres saltos: Skill → students → enrollments → trainingProgram |
| `GET /students/eagerly/skills-level/:level` | `StudentService.findAllWithSkillsAtLevel` | **Q8** N:M con `through: { where }` + `required: true` |
| `GET /students/eagerly/skills-interests` | `StudentService.findAllWithSkillsAndInterests` | **Q9** N:M y 1:N en la misma consulta |
| `GET /student-enrollments/status/:status` | `StudentEnrollmentService.findAllByStatus` | **Q10** `where` simple, sin `Op` |
| `GET /student-enrollments/between/:from/:to` | `StudentEnrollmentService.findAllBetween` | **Q11** `[Op.between]`, dos parámetros y `DESC` |
| `GET /student-enrollments/with-notes` | `StudentEnrollmentService.findAllWithNotes` | **Q12** `[Op.ne]: null` ("que tenga valor") |
| `GET /academic-years/active/eagerly` | `AcademicYearService.findActiveEagerly` | **Q13** `findOne` + dos `hasMany` + 404 |
| `GET /student-interests/search/:text` | `StudentInterestService.findAllByNameContaining` | **Q14** `[Op.iLike]` (contiene, sin mayúsculas) |
| `GET /skills/category/:category` | `SkillService.findAllByCategory` | **Q15** `where` + `order` |
| `GET /tutor-assignments/eagerly/tutor-email/:email` | `TutorAssignmentService.findAllByTutorEmail` | **Q16** `where` en un `include` con alias propio (`tutor`) |

Las consultas que ya tenías antes siguen ahí: `/students/search/:lastNameSearch` (`Op.like`), `/students/eagerly/skill/:skillName` (N:M con `through.attributes`) y `/student-enrollments/eagerly/academic-year/:academicYearName`.
