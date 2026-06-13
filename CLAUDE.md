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

All non-route source lives under `src/`. Routes stay in `app/`. The `@/*`
alias resolves to `./src/*` first, then `./*` (so `@/components/...`,
`@/hooks/...`, `@/config/...` hit `src/`, while `@/app/...` hits the root).

```
app/                    — App Router routes ONLY (pages + layouts + route handlers)
  layout.tsx            — Root: ClerkProvider > Providers > NavbarWrapper > Footer (dark default)
  providers.tsx         — NextUI + TanStack Query + next-themes(dark) + Sonner
  page.tsx              — Home: Hero, PromoBanner, MediaCard, NewsletterBanner
  _actions.ts           — Server actions: sendEmail(), sendContactEmail() via Resend
  api/recommendations/mood/route.ts — mood-based suggestion endpoint
  movies/               — /movies and /movies/[id]
  series/               — /series, /series/[id], /series/[id]/season/[seasonId]
  search/               — /search
  surprise-me/          — /surprise-me (mood-based suggestions)
  watchlist/            — /watchlist (auth-gated, localStorage per user)
  about/  contact-us/  sign-in/  sign-up/

src/
  components/
    layout/   — Nav, NavDesktop, NavMobile, NavbarWrapper, Footer, ThemeSwitch, BingeLogo
    home/     — Hero, PromoBanner, MediaCard, NewsletterBanner
    movies/   — MovieShowcase, MovieDetailCard, SortedMovies, RecommendedMovies,
                TopBillingCast, ImageShowcase, TrendingMoviesBanner
    series/   — SeriesShowcase, SeriesDetailsCard, SeasonDetailCard, SeriesSeason,
                SortedSeries, TopBillingSeriesCast, TrendingSeriesBanner, VideosShowCase
    surprise/ — MoodSuggestion
    search/   — SearchInput, SearchResults
    about/    — DiscoverAboutUs, DiscoverBestMovie, UncoverWorldSeries
    contact/  — ContactForm, FAQ, GetInTouch
    common/   — Cross-cutting: ContentGrid, EmailForm, GlobalButton, LogInBtn,
                SignUpBtn, LogoutBtn, UserAvatar, LoadingCard, LoadingPage,
                LoadingWrapper, SkeletonGrid, CinemaBackground
    ui/       — Low-level primitives: slideshow, text-rotate, image-stack,
                parallax-floating, CircularProgress
  store/      — userStore, useWatchlistStore, useCrewStore, useSeriesCrewStore, useSeriesSeason
  hooks/      — TanStack Query hooks wrapping lib/api.ts (TMDB)
  lib/        — api.ts (TMDB Bearer fetchers), utils.ts (cn helper)
  config/     — site.ts (nav + metadata), fonts.ts (Poppins + Inter),
                data.ts, dateFormat.ts, timeConvert.ts, truncate.ts
  types/      — index.ts (interfaces), schema.ts (Zod), css.d.ts
  emails/     — React Email templates for Resend

styles/globals.css      — Design tokens (CSS vars) + component primitives (@layer)
tailwind.config.js      — Maps tokens to utilities; content globs ./app + ./src
middleware.ts           — Clerk middleware (protects routes, handles session)
```

> Naming was normalized in the v2 restructure: `suprise-me`→`surprise-me`,
> `RecommandedMovies`→`RecommendedMovies`, `turncate`→`truncate`,
> `ImageShowCase`→`ImageShowcase`. The dead Kinde route and unused
> `ui/{demo,gallery,button,arc-gallery-hero-component}` were deleted.

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

## Design System v2 — "Cinema Noir"

Dark-first cinematic identity. All colors/shadows/radii are CSS variables in
`styles/globals.css` (`:root`/`.dark` = dark, `.light` = light) and surfaced as
Tailwind utilities in `tailwind.config.js`. **Use tokens, never hardcoded hex.**

| Token (Tailwind) | Meaning |
|---|---|
| `bg`, `bg-2` | page canvas (near-black ink) |
| `surface`, `surface-2`, `surface-3` | cards, inputs, active fills |
| `border` | hairline borders |
| `text`, `text-2`, `text-3`, `text-4` | headings, body, captions, faint |
| `accent` (#7C5CFF), `accent-2` (#22D3EE) | brand violet → cyan |
| `gold` | ratings only |
| `danger` / `success` / `warning` | semantic |

Component primitives (in `@layer components`): `.btn-primary` / `.btn-ghost` /
`.btn-outline`, `.card`, `.glass` / `.glass-nav`, `.poster-card`, `.pill` /
`.pill-accent`, `.rating`, `.kicker`, `.section-title`, `.input`,
`.container-site`, `.text-gradient`. Fonts: Poppins (display) + Inter (UI).

---

## TODO / Known Issues

- After upgrading packages, run `npm install` and verify the build (`npm run build`) for any breaking changes from Next.js 15 / React 19.
- NextUI v2 (`@nextui-org/react`) has been rebranded as **HeroUI** (`@heroui/react`). Consider migrating in a future sprint for continued active maintenance.
- `react-query` v3 package was removed (was duplicated alongside `@tanstack/react-query` v5). If any file still imports from `react-query` (not `@tanstack/react-query`), update those imports.
- Watchlist is stored in **localStorage only** — not synced to a backend. If a database is added later, migrate `useWatchlistStore` to an API-backed store.
