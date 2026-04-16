# Genetec Frontend Assignment

A React + TypeScript monorepo implementing a reusable component library and a demo application that consumes it, with a focus on clean separation of concerns, realistic data flow, and maintainable architecture.

## Stack

- **Nx + pnpm workspaces** — monorepo tooling for task orchestration, caching, and project boundaries
- **React + TypeScript** — typed UI layer across both the component library and the demo app
- **Vite** — fast dev server and build tool for the demo app and Storybook
- **Ant Design** — component primitives used for tables, forms, layout, and accessible UI patterns
- **TanStack Query** — declarative data fetching, caching, and mutation management in the demo app
- **MSW** — browser mock server for realistic async API simulation without a real backend
- **i18next + react-i18next** — localization with translation ownership split between the library and the app
- **Day.js** — lightweight date manipulation shared across the monorepo
- **Storybook** — isolated component development and visual documentation for the UI package
- **Prettier + ESLint** — consistent formatting and linting across the codebase
- **GitHub Actions CI** — automated pipeline for formatting, linting, type checks, and production builds

## Project structure

```text
packages/
  ui-components/          # reusable component library
    src/
      lib/
        data-grid/        # DataGrid component
        timeline/         # Timeline component
        event-form/       # EventForm component
      i18n/               # library-owned translation resources
        locales/          # en.json, da.json

demo-app/
  src/
    app/                  # application shell, providers, query client
    features/
      event-showcase/     # event showcase feature module
        api/              # fetch functions and in-memory store
        components/       # feature-level composition wrappers
        hooks/            # React Query hooks
        pages/            # page entry point
        utils/            # pure helper functions
        types.ts          # feature types
    i18n/                 # app-owned translation resources
      locales/            # en.json, da.json
    mocks/                # MSW browser worker and request handlers

.github/workflows/        # CI pipeline
```

The monorepo structure mirrors the assignment: the UI package is the reusable library, the demo app is the real consumer. Feature code is co-located so that related API, hooks, UI wrappers, and page logic stay together and are easy to navigate.

## Getting started

### Install dependencies

```bash
pnpm install
```

### Run the demo app

```bash
pnpm run dev
```

The app starts at `http://localhost:4200` with MSW intercepting API requests.

### Run Storybook

```bash
pnpm run storybook
```

Storybook starts at `http://localhost:6006` for isolated component development and visual documentation.

### Build

```bash
pnpm run build
```

### Build Storybook

```bash
pnpm run build-storybook
```

## Mock setup and usage

This project uses MSW to simulate a backend without needing a real API server.

- `demo-app/src/mocks/handlers.ts` — defines request handlers for `GET /api/events` and `POST /api/events`
- `demo-app/src/mocks/browser.ts` — configures the MSW browser worker
- `demo-app/src/features/event-showcase/api/eventsStore.ts` — in-memory store with localStorage persistence so created events survive page refresh
- `demo-app/public/mockServiceWorker.js` — the service worker script used by MSW

MSW is started unconditionally in the demo app's `main.tsx`, keeping development behavior consistent and eliminating environment switching.

## CI pipeline

The GitHub Actions workflow in `.github/workflows/ci.yml` runs on `push` to `master` and on all pull requests.

Pipeline steps:

1. Check out repository
2. Set up pnpm (version resolved from `packageManager` in `package.json`)
3. Set up Node.js 20 with pnpm cache
4. Install dependencies with `pnpm install --frozen-lockfile`
5. Run `pnpm run format:check`
6. Run `pnpm run lint`
7. Run `pnpm run typecheck`
8. Build the demo app with `pnpm run build`
9. Build Storybook with `pnpm run build-storybook`

## Branching strategy

All changes go through pull requests — direct pushes to `master` are not allowed.

- **`master`** — protected branch, always reflects production-ready state
- **`feat/<name>`** — new features or components
- **`fix/<name>`** — bug fixes
- **`chore/<name>`** — maintenance, dependency updates, config changes

### Workflow

1. Branch off `master` using the naming conventions above
2. Open a pull request when the work is ready
3. CI must pass (format, lint, typecheck, build) before the PR can be merged
4. Merge into `master` once CI is green
5. The feature branch is deleted automatically after merge

### Branch protection rules (master)

| Rule | Setting |
|---|---|
| Require pull request before merging | enabled |
| Require status checks to pass (`quality`) | enabled |
| Require branch to be up to date before merging | enabled |
| Block force pushes | enabled |
| Automatically delete head branches | enabled |

> **Note:** enforced status checks require a paid GitHub plan (Pro, Team, or Enterprise). On free accounts, the rules exist but cannot block a merge — contributors should manually verify CI passes before merging.

## Architecture notes

### Monorepo with clear separation of concerns

The repository is split into two explicit layers:

- `packages/ui-components` — the reusable library. Components here have no knowledge of the demo app.
- `demo-app` — the consumer. It imports from the library as any real client app would.

This boundary is enforced structurally. The demo app does not recreate library components; it only adds feature-level wrappers and orchestration.

### Component-library-first approach

`DataGrid`, `Timeline`, and `EventForm` were built in isolation inside the UI package, then integrated into the demo app. Storybook provides the development environment for building components before the app consumes them. This keeps the reusable layer clean and proves real usage in a separate context.

### Feature-based structure in the demo app

The `event-showcase` feature is organized by responsibility, not by technical type:

- `api/` — fetch functions and in-memory mock store
- `hooks/` — React Query hooks that wrap the API layer
- `components/` — feature-level composition wrappers (`EventGridSection`, `EventTimelineSection`, `EventFormModal`)
- `pages/` — the page entry point, kept mostly compositional
- `utils/` — pure helpers for mock generation, grouping, and mapping
- `types.ts` — feature types

### App-level infrastructure stays outside the feature

Global concerns — i18n initialization, the React Query client, and the app shell — live in `demo-app/src/app/`, not inside the feature. This keeps `event-showcase` portable and focused on its own domain.

### One shared event dataset powers multiple views

The grid and the timeline share the same event source via a single React Query key. Creating an event invalidates that key, so both views update consistently without additional coordination. This was a deliberate product decision: the demo should behave like a small coherent application, not a collection of isolated examples.

### MSW as the mock backend

MSW was chosen over hardcoded arrays to give the demo realistic async behavior. Loading and error states are meaningful, API boundaries stay clean, and the app behaves more like a real product. The in-memory store in `eventsStore.ts` is backed by localStorage so created events survive page refresh.

### TanStack Query for server-state handling

React Query manages all data fetching in the demo app. Raw fetch functions live in `api/eventsApi.ts`; React Query hooks live in `hooks/`. That separation keeps API functions framework-light and testable, while hooks handle React-specific orchestration. Page components stay thin as a result.

### Translation ownership split between library and app

Library translations (`dataGrid.*`, `eventForm.*`, `timeline.*`) live in the UI package. App and page-level translations (`eventShowcase.*`) live in the demo app. The app owns i18n initialization and merges both sets of resources using a deep merge strategy to prevent app keys from overwriting package keys in shared namespaces. Storybook initializes its own i18n runtime independently, preserving clean package design without reintroducing side effects into the library.

### Reusable component APIs remain configurable

Library components expose props for behavior the demo app controls contextually. For example, DataGrid scroll behavior is opt-in rather than hardcoded. This keeps the library flexible and prevents app-specific presentation concerns from leaking into the component layer.

### Grid and timeline have different UX strategies

The two views of the same event data are intentionally different:

- **DataGrid** — full dataset, pagination, sorting and filtering, suited for exploration and management
- **Timeline** — a limited subset with internal scroll, optimized for chronological readability

Rendering all events in the timeline produced an unusable page. Limiting the timeline subset was a UX-driven architectural decision, not a styling choice.

## Trade-offs and handoff notes

### What I chose and why

- Kept the app small and focused: no global state library, only TanStack Query and local component state.
- Used MSW for mock behavior so API boundaries stay clean and async states are realistic.
- Used localStorage persistence for mock data so the demo remains useful across refreshes without a real backend.
- Leaned on Ant Design for UI consistency and faster delivery of polished component primitives.
- Split translation ownership by layer rather than merging everything into one file.

### Pros

- fast feedback loop with Vite and Nx task caching
- consistent API caching and mutation handling via TanStack Query
- clear separation between reusable library code and demo-app orchestration
- mock data survives refresh without any backend dependency
- Storybook provides isolated visual documentation for all library components

### Cons / compromises

- mock data is in-memory with localStorage; it does not simulate multi-user persistence or real backend conflicts
- no unit or E2E test suite; correctness is currently validated manually and through TypeScript
- accessibility and edge-case error states have minimal coverage; a dedicated audit pass would improve robustness

### What to consider for the next iteration

- add unit tests for hooks, utils, and component behavior using Vitest and Testing Library
- add E2E tests with Playwright covering the main user journey and form submission flow
- introduce page object models in E2E tests to decouple test logic from DOM structure
- add API contract or schema validation tests between frontend fetch expectations and backend response shapes
- strengthen accessibility checks and keyboard navigation validation across the component library
- add error boundary coverage and retry behavior for failed API requests
- introduce a feature scaffold generator to automate boilerplate for new features (api, hooks, page, types)
- expand mock scenarios to cover failure states, retries, and partial success flows
- version the `@org/ui-components` package using semantic versioning and publish it via `nx release`, so the demo app (and any future consumer) can pin and upgrade specific versions explicitly rather than relying on `workspace:*`

### Handoff guidance

Start with these entry points:

- `demo-app/src/features/event-showcase/` — the main feature: API, hooks, UI wrappers, page, and utils
- `demo-app/src/mocks/` — mock request handlers and browser worker setup
- `packages/ui-components/src/lib/` — DataGrid, Timeline, and EventForm components
- `demo-app/src/app/` — global providers, query client, and i18n initialization
- `.github/workflows/ci.yml` — the CI pipeline

The app is intentionally scoped. Start with the event-showcase feature to understand the data flow, then trace inward to the UI package components or outward to the mock layer.

## Use of AI tooling

Claude Code was used strategically during development to accelerate specific tasks while maintaining full control over core logic and architectural decisions.

### AI-assisted areas

- **Boilerplate scaffolding** — initial file structure, component templates, and type definitions were generated and then refined
- **MSW handler patterns** — basic request interceptor patterns were scaffolded; error handling, store logic, and persistence were hand-crafted
- **Documentation** — README structure and section drafts were assisted; all content was verified against the actual implementation

### Manual work

- All architectural decisions and the reasoning behind them
- React Query hooks, mutation logic, and cache invalidation strategy
- i18n split-ownership design and deep merge solution for overlapping namespaces
- MSW in-memory store with localStorage persistence
- Monorepo structure, package boundaries, and Nx project configuration
- DataGrid, Timeline, and EventForm component APIs
- Feature-based folder structure and the boundary between library and app concerns
- This README and the architecture rationale throughout

**Takeaway:** AI tooling reduced boilerplate and accelerated scaffolding. Core architecture, domain logic, and integration decisions were hand-crafted and deliberately considered.
