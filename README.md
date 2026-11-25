# PRISMA FP Canarias

Web platform (MVP) that lets **CIFP Felo Monzón Grau-Bassas** collect, manage and analyse data about the training path, skills and employment outcomes of its students and graduates, turning it into useful information for guidance, employability and the school's decision-making.

2nd-year DAW project (DSW and DOR modules) developed by Group 4: JP, Kacper and Iván.

📄 **Team organisation document:** [Organización PRISMA-FP GRUPO 4 (Google Docs)](https://docs.google.com/document/d/1LFWr4dQsPcH8lydZjAEaxMwlPW2INK4ucyzxXhBc8Gg/edit?usp=sharing)

> This README describes the state of the `develop` branch as of 15 November 2026.

---

## Table of contents

1. [Tech stack](#tech-stack)
2. [Repository structure](#repository-structure)
3. [Backend](#backend)
4. [Frontend](#frontend)
5. [Getting started](#getting-started)
6. [Database: migrations and seeders](#database-migrations-and-seeders)
7. [Bruno collection](#bruno-collection)
8. [Continuous integration](#continuous-integration)
9. [Branches and workflow](#branches-and-workflow)
10. [Current status](#current-status)

---

## Tech stack

| Layer | Technologies |
|-------|--------------|
| Frontend | React 19, TypeScript, Vite 8, Tailwind CSS v4, Vitest + Testing Library |
| Backend | Node.js 22, Express 5, TypeScript (ESM), Sequelize 6 |
| Database | PostgreSQL |
| API testing | Bruno |
| Quality | oxlint, `tsc --noEmit`, Vitest + Supertest |
| CI | GitHub Actions |

Planned but not yet in the code: Headless UI, JWT authentication, Docker Compose, deployment to IsardVDI with Caddy, and email delivery with Mailgun.

## Repository structure

```
.
├── .github/workflows/ci.yml   # CI pipeline (backend + frontend)
├── backend/                   # REST API (Express + Sequelize)
├── frontend/                  # Web app (React + Vite)
└── bruno/                     # Exported Bruno collection (JSON)
```

## Backend

```
backend/
├── src/
│   ├── app.ts                 # Express setup (JSON, CORS, /api, 404 and errors)
│   ├── server.ts              # Startup: associations, connection and model sync
│   ├── config/
│   │   ├── database.ts        # Sequelize instance
│   │   └── env.ts             # Loads environment variables based on NODE_ENV
│   ├── middlewares/           # not-found and error
│   ├── models/associations.ts # Relationships between models
│   ├── routes/index.ts        # Mounts every module's routes under /api
│   └── modules/               # One module per entity
├── database/
│   ├── migrations/            # Migration generated with sequelize-schema-sync
│   ├── seeders/               # sequelize-cli seeders
│   ├── .config.js             # sequelize-cli configuration
│   └── .sequelizerc
├── scripts/schema-sync.ts     # Generate / run migrations with sequelize-schema-sync
├── schema-sync.config.ts
└── tests/app.test.ts          # API tests (Vitest + Supertest)
```

Each module follows the `model` / `service` / `controller` / `routes` pattern. The controller checks required fields (400), unique values (409) and missing resources (404), and returns 204 on delete.

### Modules and routes

All routes hang from `/api` and expose a CRUD (`GET`, `GET /:id`, `POST`, `PUT`, `DELETE /:id`).

| Area | Routes |
|------|--------|
| Security and users | `/users`, `/roles`, `/permissions`, `/user-roles`, `/role-permissions`, `/auth-tokens`, `/audit-logs` |
| School and training offer | `/educational-centers`, `/professional-families`, `/academic-years`, `/training-programs`, `/tutor-assignments` |
| Students | `/students`, `/student-enrollments`, `/student-interests`, `/student-skills`, `/skills` |
| Employability | `/companies`, `/internships`, `/employment-records` |
| GDPR | `/consent-requests`, `/consents` |
| Surveys | `/surveys`, `/survey-questions`, `/survey-invitations`, `/survey-answers` |

There are 26 modules in `src/modules` in total (the tutor assignments folder is named `tutor-assignament`, although its route is `/tutor-assignments`).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the API in development mode with `tsx watch` |
| `npm run build` | Compiles TypeScript to `dist/` |
| `npm start` | Runs the compiled build |
| `npm run lint` | oxlint |
| `npm run typecheck` | Type checking |
| `npm test` | Tests with Vitest |

## Frontend

```
frontend/src/
├── App.tsx                    # Renders StudentsPage
├── components/ui/             # Button, Modal (+ Button test)
├── features/prismaFP/
│   ├── components/            # StudentList, StudentRow
│   ├── hooks/useStudents.ts
│   ├── pages/StudentsPage.tsx
│   ├── services/              # Services for the student and training offer entities
│   └── types/                 # TypeScript types for those entities
├── services/api.ts            # apiFetch: HTTP client on top of VITE_API_URL
└── styles/global.css
```

For now the app shows a single page with the list of students. There is no router or login yet.

Scripts: `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`, `npm test`.

## Getting started

### Requirements

- Node.js 22
- PostgreSQL (with a database already created, e.g. `prisma_fp_develop`)
- Bruno (optional, to test the API)

### Backend

```bash
cd backend
npm install
cp .env.example .env.development   # then fill in your values
npm run dev
```

Environment variables (`.env.<NODE_ENV>`; `NODE_ENV` can be `development`, `test` or `production`):

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=prisma_fp_develop
DB_USER=postgres
DB_PASSWORD=your_password
DB_DIALECT=postgres
```

The API runs at `http://localhost:3000` (`GET /` returns `{ "message": "API working" }`).

> ⚠️ On startup, `server.ts` runs `sequelize.sync({ force: true })`, which **drops and recreates every table** each time the server starts.

### Frontend

```bash
cd frontend
npm install
echo "VITE_API_URL=http://localhost:3000/api" > .env
npm run dev
```

## Database: migrations and seeders

The data model has 26 tables covering security, training offer, students, employability, GDPR and surveys.

### Migrations

There is one migration, `database/migrations/20261029174806_create-tables.ts`, generated from the models with `sequelize-schema-sync`. It is managed with the `scripts/schema-sync.ts` script:

```bash
cd backend
npx tsx scripts/schema-sync.ts dry-run            # show differences between models and DB
npx tsx scripts/schema-sync.ts generate <name>    # generate a migration
npx tsx scripts/schema-sync.ts migrate            # run migrations
npx tsx scripts/schema-sync.ts rollback           # undo the last one
npx tsx scripts/schema-sync.ts status             # status
```

### Seeders

The seeders live in `database/seeders` (`sequelize-cli` format). They insert data with `bulkInsert` and resolve foreign keys by looking rows up by a natural key (email, code, national ID, name). They run in the order given by the timestamp in each file name.

```bash
cd backend
npx sequelize-cli db:seed:all
npx sequelize-cli db:seed:undo:all
```

## Bruno collection

`bruno/prisma-fp-canarias.json` is the exported collection with 163 requests: one folder per entity (Create, Get all, Get by id, Update, Delete) plus a **Queries** folder with eager-loading queries and filters by student or tutor.

To use it: in Bruno, *Import Collection* → select the JSON file, and run the requests with the API running.

## Continuous integration

`.github/workflows/ci.yml` runs on every push and pull request to `main`, `develop` and `stagging`, with two jobs on Node 22:

- **Backend:** `npm ci`, lint, typecheck and tests.
- **Frontend:** `npm ci`, lint, tests and build.

## Branches and workflow

| Branch | Purpose |
|--------|---------|
| `main` | Production |
| `stagging` | Pre-production |
| `develop` | Integration of the sprint's work |
| `E<epic>-HU<story>-T<task>` | Task branches (e.g. `E1-HU01-T10`) |

Work is organised with Scrum and GitHub Projects. Each task is done in its own branch and merged into `develop` through a pull request.

## RBAC Permissions Matrix

Roles as defined in `database/seeders/…-seed-role.js`: `ADMIN` (Administrador), `COORDINATOR` (Directivo), `TEACHER` (Tutor) and `STUDENT` (Alumno). The Alumno Colaborador role only takes part in HU-08/HU-09, which are out of scope.

### Épica 3 (Juan Pablo)

HU-05: Employment history.

| Permission | ADMIN | COORDINATOR | TEACHER | STUDENT |
|------------|:-----:|:-----------:|:-------:|:-------:|
| `employment-record:read` | ✅ | ✅¹ | ✅² | ❌ |
| `employment-record:create` | ✅ | ❌ | ✅² | ❌ |
| `employment-record:update` | ✅ | ❌ | ✅² | ❌ |
| `employment-record:delete` | ✅ | ❌ | ❌ | ❌ |

¹ Not stated in HU-05; deduced because the Directivo needs this data for the KPIs in HU-12.

² Only for students in the teacher's assigned programmes (HU-04: the student record includes the "Historial laboral" tab).

### Épica 4 (Juan Pablo)

HU-06: GDPR consent management. HU-07: Consent request by email.

| Permission | ADMIN | COORDINATOR | TEACHER | STUDENT |
|------------|:-----:|:-----------:|:-------:|:-------:|
| `consent:read` | ✅ | ❌ | ✅¹ | ✅² |
| `consent:create` | ❌³ | ❌ | ❌ | ✅² |
| `consent:update` | ❌³ | ❌ | ❌ | ✅² |
| `consent:delete` | ❌⁴ | ❌ | ❌ | ❌ |
| `consent-request:read` | ✅ | ❌ | ✅¹ | ❌ |
| `consent-request:create` | ✅ | ❌ | ❌ | ❌ |
| `consent-request:update` | ✅ | ❌ | ❌ | ❌ |
| `consent-request:delete` | ✅ | ❌ | ❌ | ❌ |

¹ Only for students in the teacher's assigned programmes (HU-04: the student record includes the "Consentimiento" tab).

² Only their own consent (grant = create, revoke = update).

³ Consent must be given or revoked by the student; nobody can do it on their behalf.

⁴ Consent changes are an immutable log (HU-06), so they are never deleted.

### Épica 6 (Juan Pablo)

HU-10: Internship companies and hiring.

| Permission | ADMIN | COORDINATOR | TEACHER | STUDENT |
|------------|:-----:|:-----------:|:-------:|:-------:|
| `company:read` | ✅ | ✅ | ✅ | ❌ |
| `company:create` | ✅ | ✅³ | ✅ | ❌ |
| `company:update` | ✅ | ✅³ | ✅ | ❌ |
| `company:delete` | ✅ | ✅³ | ❌ | ❌ |
| `internship:read` | ✅ | ✅¹ | ✅² | ❌ |
| `internship:create` | ✅ | ❌ | ✅² | ❌ |
| `internship:update` | ✅ | ❌ | ✅² | ❌ |
| `internship:delete` | ✅ | ❌ | ❌ | ❌ |

¹ Not stated in HU-10; deduced because the Directivo needs the "% hired by their internship company" KPI.

² Only for students in the teacher's assigned programmes.

³ Not stated in HU-10; taken from the current role seeder (`company:write` for COORDINATOR).

### Épica 7 (Juan Pablo)

HU-11: Graduate survey.

| Permission | ADMIN | COORDINATOR | TEACHER | STUDENT |
|------------|:-----:|:-----------:|:-------:|:-------:|
| `survey:read` | ✅ | ✅ | ❌ | ✅¹ |
| `survey:create` | ✅ | ✅ | ❌ | ❌ |
| `survey:update` | ✅ | ✅ | ❌ | ❌ |
| `survey:delete` | ✅ | ✅ | ❌ | ❌ |
| `survey-question:read` | ✅ | ✅ | ❌ | ✅¹ |
| `survey-question:create` | ✅ | ✅ | ❌ | ❌ |
| `survey-question:update` | ✅ | ✅ | ❌ | ❌ |
| `survey-question:delete` | ✅ | ✅ | ❌ | ❌ |
| `survey-invitation:read` | ✅ | ✅ | ❌ | ❌ |
| `survey-invitation:create` | ✅ | ✅ | ❌ | ❌ |
| `survey-invitation:update` | ✅ | ✅ | ❌ | ❌ |
| `survey-invitation:delete` | ✅ | ✅ | ❌ | ❌ |
| `survey-answer:read` | ✅ | ✅ | ❌ | ✅² |
| `survey-answer:create` | ❌³ | ❌³ | ❌ | ✅² |
| `survey-answer:update` | ❌³ | ❌³ | ❌ | ❌ |
| `survey-answer:delete` | ✅ | ❌ | ❌ | ❌ |

¹ Only the survey they were invited to, through their unique link.

² Only their own answers.

³ Answers must come from the graduate; staff cannot create or change them.

## Current status

Done:

- API structure with the 26 CRUD modules and their routes.
- Model associations (partial), initial migration and seeders.
- Bruno collection with every request.
- Frontend with the student list page.
- CI with lint, types, tests and build.

Pending or known issues:

- The migration creates 22 of the 26 tables; `educational_centers`, `professional_families`, `training_programs` and `tutor_assignments` are missing, and they have no associations in `associations.ts` either.
- `database/.sequelizerc` is empty, and in `database/.config.js` the `module.exports` sits inside the function, so `sequelize-cli` cannot find the configuration.
- `server.ts` uses `sync({ force: true })` and its log message still says "MySQL".
- Leftovers from the template project remain: `config/config.json`, `models/`, the name `api-products` in `package.json` and the `mysql2` dependency.
- Not implemented yet: JWT authentication, role-based permissions, DNI/NIF validation, email delivery, Docker and deployment.
