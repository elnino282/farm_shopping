# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server at http://localhost:3000
npm run build        # Production build (outputs to dist/)
npm run preview      # Preview production build
npm run lint         # TypeScript type checking (tsc --noEmit)
npm run clean        # Remove dist/
```

No test runner is configured.

## Environment

Copy `.env.example` to `.env` and set:
- `GEMINI_API_KEY` — Google Gemini AI key (optional for most features)
- `APP_URL` — Provided automatically by AI Studio runtime

## Architecture

**FarmTrace** is a Vietnamese-language farm-to-consumer e-commerce MVP. All data is mocked (no backend); auth state is not persisted across page refreshes.

### Role-Based Access

Three user roles control routing and UI visibility:
- **Buyer** — browse, cart, checkout, order history
- **Seller** — dashboard at `/seller`, product CRUD, order management
- **Admin** — dashboard at `/admin`, product moderation, user management

Routes are protected via a `ProtectedRoute` component that checks `isAuthenticated` and `allowedRoles` from the auth store.

### State Management (Zustand)

Three stores in `src/store/`:
- `authStore.ts` — current user, login/logout, address management; seeded from `src/data/mock.ts`
- `cartStore.ts` — cart items, quantity, totals; client-side only
- `productStore.ts` — product list with CRUD; seeded from mock data

### Layouts

- `PublicLayout` — shared header/footer for public + buyer pages
- `DashboardLayout` — sidebar layout for `/seller` and `/admin` routes

### Path Alias

`@/` resolves to the project root (configured in both `vite.config.ts` and `tsconfig.json`).

### Key Domain Model

```
Farm → Season → Lot → Product (traceability chain)
User (buyer | seller | admin)
Order → OrderItem[]
```

Types are defined in `src/types/index.ts`. Mock data (users, farms, products, orders) lives in `src/data/mock.ts`.

### UI Conventions

- Tailwind CSS 4 with the Vite plugin; primary brand color is `emerald-600`
- Reusable primitives (`Button`, `Card`, `Badge`, `Input`) are in `src/components/ui/`
- `cn()` utility in `src/utils/helpers.ts` merges Tailwind classes (clsx + tailwind-merge)
- `Motion` library used for animations
- All user-facing text is in Vietnamese
