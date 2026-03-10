# Application

# Project Name

A full-stack project using Docker, PostgreSQL, Prisma, and Node.js backend.

---

## Prerequisites

- [Docker](https://www.docker.com/get-started) (for Postgres container)
- [Node.js](https://nodejs.org/) (v18+)
- npm (comes with Node.js)

---

## Project Structure

- **backend** → Node.js backend + Prisma
- **frontend** → React (or other frontend framework)
- **docker-compose.yml** → runs Postgres container

---

## Manual Setup for New Developer

1. Clone the repository:

```bash
git clone <repo-url>
cd <project-folder>
```

2.  Copy `.env.example` to `.env` and edit if needed:

```bash
cd backend
copy .env.example .env # Windows
cp .env.example .env # macOS/Linux
```

3.  Start the Postgres container:

```bash
docker compose up -d
```

4.  Install backend dependencies:

```bash
cd backend
npm install
```

5.  Generate Prisma client:

```bash
npx prisma generate
```

7.  Apply migrations to the database:

```bash
npx prisma migrate deploy
```

7.  Seed the database (if you have a seed script):

```bash
npx prisma db seed
```

---

## Running the Project

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm  start
```

### Prisma Studio (inspect DB)

```bash
cd backend
npx prisma studio
```

- Opens browser UI at `http://localhost:5555`
- Explore tables, data, and relations

---

## Notes

- **Do not commit generated Prisma client** (`node_modules/.prisma`)
- Database URL is defined in `.env`:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/event_app_db?schema=public"
```

- For Docker, Postgres credentials are:

| User     | Password | DB Name | Port |
| -------- | -------- | ------- | ---- |
| postgres | password | db_name | 0000 |

- New dev only needs **Docker + Node.js**, everything else is manual setup.

---

## Recommended Workflow for Development

```bash
docker compose up -d

npx prisma migrate deploy

npx prisma db seed

npm run dev

npm  start

npx prisma studio
```

---

## Troubleshooting

- **Prisma Studio fails:** ensure database exists and `DATABASE_URL` is correct
- **Seed fails with tsx:** run `npm install tsx --save-dev` or use Node compiled JS
- **pgAdmin connection fails:** use `Maintenance DB = postgres`, then browse to `event_app_db`

---

## License

MIT
