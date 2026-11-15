# PRISMA FP Canarias

Plataforma web (PMV) para que el **CIFP Felo Monzón Grau-Bassas** recopile, gestione y analice datos sobre la trayectoria formativa, las competencias y la inserción laboral de su alumnado y egresados, y los convierta en información útil para la orientación, la empleabilidad y la toma de decisiones del centro.

Proyecto de 2.º DAW (módulos DSW y DOR) desarrollado por el Grupo 4: JP, Kacper e Iván.

📄 **Documento de organización del equipo:** [Organización PRISMA-FP GRUPO 4 (Google Docs)](https://docs.google.com/document/d/1LFWr4dQsPcH8lydZjAEaxMwlPW2INK4ucyzxXhBc8Gg/edit?usp=sharing)

> Este README describe el estado de la rama `develop` a fecha de 15 de noviembre de 2026.

---

## Índice

1. [Stack tecnológico](#stack-tecnológico)
2. [Estructura del repositorio](#estructura-del-repositorio)
3. [Backend](#backend)
4. [Frontend](#frontend)
5. [Puesta en marcha](#puesta-en-marcha)
6. [Base de datos: migraciones y seeders](#base-de-datos-migraciones-y-seeders)
7. [Colección Bruno](#colección-bruno)
8. [Integración continua](#integración-continua)
9. [Ramas y flujo de trabajo](#ramas-y-flujo-de-trabajo)
10. [Estado actual](#estado-actual)

---

## Stack tecnológico

| Capa | Tecnologías |
|------|-------------|
| Frontend | React 19, TypeScript, Vite 8, Tailwind CSS v4, Vitest + Testing Library |
| Backend | Node.js 22, Express 5, TypeScript (ESM), Sequelize 6 |
| Base de datos | PostgreSQL |
| Pruebas de API | Bruno |
| Calidad | oxlint, `tsc --noEmit`, Vitest + Supertest |
| CI | GitHub Actions |

Previsto en la planificación (todavía no está en el código): Headless UI, autenticación JWT, Docker Compose, despliegue en IsardVDI con Caddy y envío de correos con Mailgun.

## Estructura del repositorio

```
.
├── .github/workflows/ci.yml   # Pipeline de CI (backend + frontend)
├── backend/                   # API REST (Express + Sequelize)
├── frontend/                  # Aplicación web (React + Vite)
└── bruno/                     # Colección Bruno exportada (JSON)
```

## Backend

```
backend/
├── src/
│   ├── app.ts                 # Configura Express (JSON, CORS, /api, 404 y errores)
│   ├── server.ts              # Arranque: asociaciones, conexión y sync de modelos
│   ├── config/
│   │   ├── database.ts        # Instancia de Sequelize
│   │   └── env.ts             # Carga de variables de entorno según NODE_ENV
│   ├── middlewares/           # not-found y error
│   ├── models/associations.ts # Relaciones entre modelos
│   ├── routes/index.ts        # Monta las rutas de todos los módulos bajo /api
│   └── modules/               # Un módulo por entidad
├── database/
│   ├── migrations/            # Migración generada con sequelize-schema-sync
│   ├── seeders/               # Seeders de sequelize-cli
│   ├── .config.js             # Configuración de sequelize-cli
│   └── .sequelizerc
├── scripts/schema-sync.ts     # Generar / ejecutar migraciones con sequelize-schema-sync
├── schema-sync.config.ts
└── tests/app.test.ts          # Tests de la API (Vitest + Supertest)
```

Cada módulo sigue el patrón `model` / `service` / `controller` / `routes`. El controlador valida los campos obligatorios (400), los valores únicos (409), los recursos que no existen (404) y devuelve 204 al borrar.

### Módulos y rutas

Todas las rutas cuelgan de `/api` y exponen un CRUD (`GET`, `GET /:id`, `POST`, `PUT`, `DELETE /:id`).

| Bloque | Rutas |
|--------|-------|
| Seguridad y usuarios | `/users`, `/roles`, `/permissions`, `/user-roles`, `/role-permissions`, `/auth-tokens`, `/audit-logs` |
| Centro y oferta formativa | `/educational-centers`, `/professional-families`, `/academic-years`, `/training-programs`, `/tutor-assignments` |
| Alumnado | `/students`, `/student-enrollments`, `/student-interests`, `/student-skills`, `/skills` |
| Empleabilidad | `/companies`, `/internships`, `/employment-records` |
| RGPD | `/consent-requests`, `/consents` |
| Encuestas | `/surveys`, `/survey-questions`, `/survey-invitations`, `/survey-answers` |

En total son 26 módulos en `src/modules` (la carpeta de asignaciones de tutor se llama `tutor-assignament`, aunque su ruta es `/tutor-assignments`).

### Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Arranca la API en modo desarrollo con `tsx watch` |
| `npm run build` | Compila TypeScript a `dist/` |
| `npm start` | Ejecuta la versión compilada |
| `npm run lint` | oxlint |
| `npm run typecheck` | Comprobación de tipos |
| `npm test` | Tests con Vitest |

## Frontend

```
frontend/src/
├── App.tsx                    # Renderiza StudentsPage
├── components/ui/             # Button, Modal (+ test de Button)
├── features/prismaFP/
│   ├── components/            # StudentList, StudentRow
│   ├── hooks/useStudents.ts
│   ├── pages/StudentsPage.tsx
│   ├── services/              # Servicios de las entidades de alumnado y oferta formativa
│   └── types/                 # Tipos TypeScript de esas entidades
├── services/api.ts            # apiFetch: cliente HTTP sobre VITE_API_URL
└── styles/global.css
```

Por ahora la aplicación muestra una única página con el listado de alumnos. No hay router ni login.

Scripts: `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`, `npm test`.

## Puesta en marcha

### Requisitos

- Node.js 22
- PostgreSQL (con una base de datos creada, por ejemplo `prisma_fp_develop`)
- Bruno (opcional, para probar la API)

### Backend

```bash
cd backend
npm install
cp .env.example .env.development   # y rellena tus datos
npm run dev
```

Variables de entorno (`.env.<NODE_ENV>`; `NODE_ENV` puede ser `development`, `test` o `production`):

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=prisma_fp_develop
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_DIALECT=postgres
```

La API queda en `http://localhost:3000` (`GET /` responde `{ "message": "API working" }`).

> ⚠️ Al arrancar, `server.ts` ejecuta `sequelize.sync({ force: true })`, que **borra y vuelve a crear todas las tablas** en cada arranque.

### Frontend

```bash
cd frontend
npm install
echo "VITE_API_URL=http://localhost:3000/api" > .env
npm run dev
```

## Base de datos: migraciones y seeders

El modelo de datos tiene 26 tablas repartidas en seguridad, oferta formativa, alumnado, empleabilidad, RGPD y encuestas.

### Migraciones

Hay una migración, `database/migrations/20261029174806_create-tables.ts`, generada con `sequelize-schema-sync` a partir de los modelos. Se maneja con el script `scripts/schema-sync.ts`:

```bash
cd backend
npx tsx scripts/schema-sync.ts dry-run            # ver diferencias entre modelos y BD
npx tsx scripts/schema-sync.ts generate <nombre>  # generar migración
npx tsx scripts/schema-sync.ts migrate            # ejecutar migraciones
npx tsx scripts/schema-sync.ts rollback           # deshacer la última
npx tsx scripts/schema-sync.ts status             # estado
```

### Seeders

Los seeders están en `database/seeders` (formato `sequelize-cli`): insertan datos con `bulkInsert` y resuelven las claves foráneas buscando por una clave natural (email, código, DNI, nombre). Su orden de ejecución depende del timestamp del nombre del archivo.

```bash
cd backend
npx sequelize-cli db:seed:all
npx sequelize-cli db:seed:undo:all
```

## Colección Bruno

`bruno/prisma-fp-canarias.json` es la colección exportada con 163 peticiones: una carpeta por entidad (Create, Get all, Get by id, Update, Delete) y una carpeta **Queries** con consultas con carga ansiosa (`eagerly`) y filtros por alumno o tutor.

Para usarla: en Bruno, *Import Collection* → selecciona el JSON, y ejecuta las peticiones con la API arrancada.

## Integración continua

`.github/workflows/ci.yml` se ejecuta en cada push y pull request a `main`, `develop` y `stagging`, con dos jobs en Node 22:

- **Backend:** `npm ci`, lint, typecheck y tests.
- **Frontend:** `npm ci`, lint, tests y build.

## Ramas y flujo de trabajo

| Rama | Uso |
|------|-----|
| `main` | Producción |
| `stagging` | Preproducción |
| `develop` | Integración del trabajo del sprint |
| `E<épica>-HU<historia>-T<tarea>` | Ramas de tarea (por ejemplo, `E1-HU01-T10`) |

El trabajo se organiza con Scrum y GitHub Projects. Cada tarea se hace en su rama y se integra en `develop` mediante pull request.

## Estado actual

Hecho:

- Estructura de la API con los 26 módulos CRUD y sus rutas.
- Asociaciones entre modelos (parciales), migración inicial y seeders.
- Colección Bruno con todas las peticiones.
- Frontend con la página de listado de alumnos.
- CI con lint, tipos, tests y build.

Pendiente o conocido:

- La migración crea 22 de las 26 tablas; faltan `educational_centers`, `professional_families`, `training_programs` y `tutor_assignments`, que tampoco tienen asociaciones en `associations.ts`.
- `database/.sequelizerc` está vacío y en `database/.config.js` el `module.exports` está dentro de la función, por lo que `sequelize-cli` no encuentra la configuración.
- `server.ts` usa `sync({ force: true })` y su mensaje de log aún dice "MySQL".
- Quedan restos del proyecto plantilla: `config/config.json`, `models/`, el nombre `api-products` en `package.json` y la dependencia `mysql2`.
- Sin implementar todavía: autenticación JWT, permisos por rol, validación de DNI/NIF, envío de correos, Docker y despliegue.
