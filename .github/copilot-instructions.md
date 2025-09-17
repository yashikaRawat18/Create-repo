# Copilot Instructions for AI Agents

## Project Overview
- This is a Next.js 14+ app using the `/app` directory structure, TypeScript, and Tailwind CSS.
- Main features: user authentication, profile pages, post creation, and social features (stories, suggestions, etc).
- Data is managed via Prisma ORM with a `schema.prisma` file and migrations in `/migrations`.

## Key Architecture & Patterns
- **Pages & Routing:**
  - All main routes are in `src/app/` (e.g., `login/`, `register/`, `profile/[username]/`).
  - API routes are in `src/app/api/` (e.g., `auth/login/route.ts`).
- **Components:**
  - UI components are in `/components` (e.g., `Header.tsx`, `Post.tsx`, `ProfilePost.tsx`).
  - Prefer composition and small, focused components.
- **Authentication:**
  - Auth logic is in `lib/auth.ts` and API routes under `src/app/api/auth/`.
  - Use JWT or session tokens (see `login.ts`, `register.ts`).
- **Database:**
  - Prisma schema: `schema.prisma`.
  - DB access via `lib/prisma.ts`.
  - Migrations in `/migrations`.

## Developer Workflows
- **Start dev server:** `npm run dev`
- **Apply DB migrations:** `npx prisma migrate dev`
- **Prisma Studio (DB UI):** `npx prisma studio`
- **Add packages:** Use `npm install <pkg>` and update imports as needed.

## Conventions & Best Practices
- Use TypeScript for all code.
- Place shared types in `src/app/types.ts`.
- Use Tailwind CSS for styling (`globals.css`, `tailwind.config.js`).
- Keep business logic out of UI components; use API routes and `lib/` for logic.
- Prefer async/await for all async code.
- Use descriptive, consistent naming for files and variables.

## Integration Points
- **Prisma:** All DB access via `lib/prisma.ts`.
- **Auth:** All auth flows via `lib/auth.ts` and API routes.
- **External assets:** Place in `/public`.

## Examples
- See `components/Post.tsx` for post rendering pattern.
- See `src/app/api/auth/login/route.ts` for login API structure.
- See `src/app/profile/[username]/page.tsx` for dynamic routing.

---

For questions about project-specific patterns, check the referenced files or ask for clarification.
