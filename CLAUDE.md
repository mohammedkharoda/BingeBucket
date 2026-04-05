# BingeBucket — Claude Reference

A Next.js 15 movie & series discovery app powered by TMDB. Users can browse trending content, search, get mood-based suggestions, and maintain a personal watchlist.

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| Language | TypeScript |
| UI | NextUI v2 (`@nextui-org/react`) + Tailwind CSS v3 |
| Auth | **Clerk** (`@clerk/nextjs` v6) |
| State | Zustand v5 |
| Data fetching | TanStack Query v5 (`@tanstack/react-query`) |
| Animations | Framer Motion v12 |
| Forms | React Hook Form + Zod |
| Email | Resend |
| Notifications | Sonner |
| Themes | next-themes |
| Icons | react-icons |

---

## Project Structure

```
app/
  layout.tsx          — Root layout: ClerkProvider > Providers > NavbarWrapper > Footer
  providers.tsx       — NextUI + TanStack Query + next-themes + Sonner
  page.tsx            — Home: Hero, promo banner, trending cards, email subscription
  _actions.ts         — Server actions: sendEmail(), sendContactEmail() via Resend
  api/auth/[kindeAuth]/route.ts — DEPRECATED stub (Kinde removed). Delete this directory.
  movies/             — /movies and /movies/[id]
  series/             — /series, /series/[id], /series/[id]/season/[seasonId]
  search/             — /search
  suprise-me/         — /suprise-me (mood-based suggestions)
  watchlist/          — /watchlist (auth-gated, localStorage per user)
  about/              — /about
  contact-us/         — /contact-us

components/
  Nav.tsx             — Client navbar; uses useAuth() + useUser() from Clerk
  Footer.tsx
  SearchInput.tsx / SearchResults.tsx
  movieComponents/    — Movie-specific UI components
  seriesComponents/   — Series-specific UI components
  supriseMeComponent/ — Mood picker UI
  about-us/ contact/  — Page-specific components

shared/               — Reusable cross-page components
  NavbarWrapper.tsx   — Thin wrapper that renders <Navbar />
  LogInBtn.tsx        — <SignInButton> from Clerk
  SignUpBtn.tsx       — <SignUpButton> from Clerk  (use client)
  LogoutBtn.tsx       — useClerk().signOut()       (use client)
  UserAvatar.tsx      — useUser() from Clerk        (use client)
  EmailForm.tsx / GlobalButton.tsx / ContentGrid.tsx
  Loading.tsx / LoadingCard.tsx / SkeletonGrid.tsx

store/
  userStore.ts        — Zustand: { id, username, picture, given_name } | null
                        Populated in Nav.tsx useEffect from Clerk's useUser()
  useWatchlistStore.ts — Zustand + persist: localStorage key = watchlist-{userId}
  useCrewStore.ts / useSeriesCrewStore.ts / useSeriesSeason.ts

hooks/                — 18 TanStack Query hooks wrapping lib/api.ts TMDB calls
lib/
  api.ts              — All TMDB API functions (Bearer token auth)
config/
  site.ts             — Nav items + site metadata
  fonts.ts            — Roboto font config
  data.ts / dateFormat.ts / timeConvert.ts / turncate.ts
types/
  index.ts            — All TypeScript interfaces (MovieDetails, SeriesDetails, Cast…)
  schema.ts           — Zod schemas: ContactFormSchema, NewsLetterFormSchema
emails/               — React Email templates for Resend
icons/
  BingeLogo.tsx
middleware.ts         — Clerk middleware (protects routes, handles session)
```

---

## Authentication — Clerk

Kinde was removed. All auth is now Clerk (`@clerk/nextjs` v6).

### Setup checklist
1. Create a Clerk app at https://dashboard.clerk.com
2. Copy keys into `.env`:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
   CLERK_SECRET_KEY=sk_live_...
   ```
3. Run `npm install` to install `@clerk/nextjs`

### How auth flows
```
ClerkProvider (layout.tsx)
  └─ middleware.ts         — clerkMiddleware() intercepts every request
       └─ NavbarWrapper    — renders <Navbar /> (no longer async/server)
            └─ Nav.tsx     — useAuth() for isSignedIn, useUser() for user data
                 ├─ UserAvatar.tsx  — useUser() for avatar + name display
                 └─ LogoutBtn.tsx   — useClerk().signOut({ redirectUrl: '/' })
```

### Clerk components used
| Component / Hook | File | Purpose |
|---|---|---|
| `<ClerkProvider>` | app/layout.tsx | Session context for entire app |
| `clerkMiddleware()` | middleware.ts | Auth on every request |
| `<SignInButton>` | shared/LogInBtn.tsx | Opens Clerk's hosted sign-in modal |
| `<SignUpButton>` | shared/SignUpBtn.tsx | Opens Clerk's hosted sign-up modal |
| `useClerk().signOut()` | shared/LogoutBtn.tsx | Signs out with redirect |
| `useAuth()` | components/Nav.tsx | `isSignedIn`, `userId` |
| `useUser()` | components/Nav.tsx + shared/UserAvatar.tsx | Full user object |

### User shape (Clerk → userStore mapping, done in Nav.tsx)
```ts
setUser({
  id: userId,              // Clerk userId string
  username: user.username,
  picture: user.imageUrl,  // img.clerk.com (allowed in next.config.js)
  given_name: user.firstName,
})
```
`userStore.user.id` is what `useWatchlistStore` uses to key localStorage.

---

## Environment Variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key (required) |
| `CLERK_SECRET_KEY` | Clerk secret key (required) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | `/` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | `/` |
| `NEXT_PUBLIC_TMDB_API_KEY` | TMDB Bearer token |
| `TMDB_API_KEY` | TMDB v3 API key |
| `NEXT_PUBLIC_RESEND_API_KEY` | Resend email API key |

---

## Data Flow

```
TMDB API
  └─ lib/api.ts           — fetch functions (Bearer token)
       └─ hooks/*.ts      — TanStack Query hooks (useMovies, useSeries, etc.)
            └─ Components — consume hooks, render UI

Watchlist (client-only, no backend):
  localStorage[watchlist-{userId}]
    └─ useWatchlistStore  — Zustand persist; loads on login, saves on add/remove
```

---

## Key Commands

```bash
npm install          # install dependencies (required after package.json update)
npm run dev          # start dev server with Turbopack
npm run build        # production build
npm run lint         # ESLint with auto-fix
```

---

## TODO / Known Issues

- **Delete** `app/api/auth/[kindeAuth]/` — this directory is a leftover from Kinde and is no longer used. The route currently returns 404.
- After upgrading packages, run `npm install` and verify the build (`npm run build`) for any breaking changes from Next.js 15 / React 19.
- NextUI v2 (`@nextui-org/react`) has been rebranded as **HeroUI** (`@heroui/react`). Consider migrating in a future sprint for continued active maintenance.
- `react-query` v3 package was removed (was duplicated alongside `@tanstack/react-query` v5). If any file still imports from `react-query` (not `@tanstack/react-query`), update those imports.
- Watchlist is stored in **localStorage only** — not synced to a backend. If a database is added later, migrate `useWatchlistStore` to an API-backed store.
