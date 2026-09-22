# Mama Paola Daycare

A public portfolio snapshot of a full-stack daycare website: a marketing site with an enrollment/contact pipeline, and an admin portal for staff to review submissions — frontend, backend, database, auth, i18n, and automated testing.

**All business content here is placeholder** (business name, staff bios, pricing, etc.). This repo is a standalone demo; a private sibling repo, with the same history up to this point, powers the actual in-development client site.

## Tech Stack

**Frontend** — `src/`
- React 19 + TypeScript, built with Vite
- MUI (Material UI) for components and theming
- React Router v7
- react-i18next for English/Spanish bilingual support, with a persistent language toggle
- Vitest + React Testing Library for tests

**Backend** — `server/MamaPaola.Api/`
- ASP.NET Core minimal API on .NET 10
- Entity Framework Core + Npgsql (PostgreSQL)
- JWT authentication for the staff admin area
- Built-in ASP.NET Core rate limiting and DataAnnotations validation
- xUnit for tests (`server/MamaPaola.Api.Tests/`), including integration tests run against an in-memory SQLite database via `WebApplicationFactory`

## Features

- Public pages: Home, About, Programs, Gallery, Staff, Tuition, Enrollment, Contact, Privacy Policy — all fully translated (EN/ES)
- Enrollment inquiry form supporting multiple children per family, with client- and server-side validation
- Contact form
- Staff-only admin portal (JWT-protected): view contact submissions and enrollment inquiries, create staff accounts
- Rate-limited public endpoints and hashed staff passwords

## Project Structure

```
├─ src/                     # React frontend
│  ├─ components/           # Forms, tables, shared UI
│  ├─ pages/                # Route-level pages (public + admin)
│  ├─ layout/                # Header, footer, nav, admin shell
│  ├─ auth/                  # Admin auth context/provider
│  ├─ services/              # API client + typed service calls
│  └─ i18n/                  # Translation resources (en.json / es.json)
├─ server/
│  ├─ MamaPaola.Api/          # ASP.NET Core minimal API
│  └─ MamaPaola.Api.Tests/    # xUnit test project
```

## Getting Started

### Prerequisites
- Node.js 20+
- .NET 10 SDK
- PostgreSQL

### Backend
```
cd server/MamaPaola.Api
dotnet user-secrets set "ConnectionStrings:AppDb" "Host=localhost;Database=...;Username=...;Password=..."
dotnet user-secrets set "Jwt:SigningKey" "<a long random string>"
dotnet user-secrets set "Jwt:Issuer" "MamaPaolaDaycareApi"
dotnet user-secrets set "Jwt:Audience" "MamaPaolaDaycareAdmin"
dotnet user-secrets set "Bootstrap:StaffUsername" "admin"
dotnet user-secrets set "Bootstrap:StaffPassword" "<a password, 8+ characters>"
dotnet ef database update
dotnet run
```
The API listens on `http://localhost:5078`. On first run it seeds one staff account from the `Bootstrap:*` secrets above.

### Frontend
```
npm install
echo "VITE_API_BASE_URL=http://localhost:5078" > .env
npm run dev
```
The site runs on `http://localhost:5173`.

## Testing
```
npm test                                           # frontend (Vitest)
dotnet test server/MamaPaola.Api.Tests             # backend (xUnit)
```

## How This Was Built

This project was built collaboratively with Claude Code (Anthropic's AI coding agent). I directed the work throughout — scoping features, making architecture calls (e.g. choosing `react-i18next` over a hand-rolled translation layer, deciding what data the enrollment form should and shouldn't collect), reviewing implementation plans before code was written, and requesting changes when something didn't fit. The code, tests, and this README were AI-assisted, not AI-authored in the sense of being unreviewed output — every feature here I can walk through and explain.
