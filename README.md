# Backend (NestJS) - MVP Investor

## Overview
Minimal NestJS + TypeORM scaffold (no external CLI). Provides:
- JWT auth (register/login)
- Users with roles (investor, creator)
- Projects with draft/published states
- Investments endpoint (simple percentage allocation)
- Stub for Hedera purchase (commented)

## Setup
1. Install node and yarn/npm.
2. `cd backend`
3. `npm install`
4. Configure `.env` (example in .env.example)
5. Run with `npm run start:dev`

## Notes
- Uses TypeORM with MySQL (see ormconfig in src).
- This is a scaffold for an MVP. Adjust and secure before production.
