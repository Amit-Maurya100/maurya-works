# Maurya Textile Machinery Website

Next.js marketing website with PostgreSQL for a textile machinery manufacturing and repair business. Includes a public site and admin dashboard for content management.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **PostgreSQL** + **Prisma ORM**
- **NextAuth.js** (admin authentication)
- **Tailwind CSS** + shadcn-style UI components

## Getting Started

### Prerequisites

- Node.js 20+
- Docker (for local PostgreSQL)

### Setup

```bash
# Start PostgreSQL
docker compose up -d

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Run migrations and seed data
npm run db:migrate
npm run db:seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site.

### Admin Access

- URL: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Email: `admin@mauryatextile.com`
- Password: `admin123`

Change the admin password in production.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Generate Prisma client and build |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed sample data |
| `npm run db:studio` | Open Prisma Studio |

## Deployment

Set these environment variables on your host:

- `DATABASE_URL` — PostgreSQL connection string (Neon, Supabase, or self-hosted)
- `AUTH_SECRET` — Random secret (`openssl rand -base64 32`)
- `NEXTAUTH_URL` — Production URL (e.g. `https://yourdomain.com`)

## Project Structure

```
app/
  (public)/          # Marketing pages
  admin/             # Admin dashboard + login
  actions/           # Server actions
  api/auth/          # NextAuth handlers
components/          # UI and layout components
lib/                 # Prisma, auth, validations
prisma/              # Schema, migrations, seed
```

## Public Pages

- Home, About, Products, Industries, Projects, Quality, Blog, Contact

## Admin Features

- Products & categories CRUD
- Projects, blog posts, certifications, industries management
- Inquiry inbox with status tracking
- Site settings editor:
  - **Business & Contact** — company name, phone, email, WhatsApp, address
  - **Factory Location** — latitude, longitude, map zoom, optional custom embed URL
  - **Site Content** — hero text, about page copy, quality descriptions

All contact details and the contact-page map are read from the database and update across the site when saved in **Admin → Settings**.
