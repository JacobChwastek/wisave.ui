# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WiSaveUI is a personal finance management application built with Angular 21. It uses zoneless change detection for performance, NgRx Signal Store for state management, PrimeNG for UI components, and Tailwind CSS for styling.

## Architecture Reference

Based on [Scalable Angular App Architecture](https://georgebyte.com/scalable-angular-app-architecture/) by George Byte, modernized for Angular 21 with signals and standalone components.

### Component Types

**Presentational Components** (`components/`):
- Handle only UI rendering and user interaction
- Receive data via signal inputs, emit events via outputs
- No business logic, no state mutations, no API calls
- Highly reusable

**Smart/Container Components** (`containers/`, `views/`):
- Connect stores with presentational components
- Know app state structure and store methods
- `views/` are routable containers that sync route params with store state

### One-Way Data Flow

```
Store → Container → Presentational → UI
         ↑                            |
         └──── events ────────────────┘
```

## Common Commands

```bash
# Development server (http://localhost:4200)
npm start

# Production build
npm run build

# Run all tests
npm test

# Format code with Prettier
npm run format

# Check formatting without changes
npm run format:check
```

## Architecture

### State Management (NgRx Signal Store)

The app uses NgRx Signal Store (not traditional NgRx) with `@angular-architects/ngrx-toolkit`:

```typescript
signalStore({ providedIn: 'root' },
  withDevtools('StoreName'),
  withGlitchTracking(),
  withState(initialState)
)
```

Stores are located in `features/<feature>/store/`. Access store in components using `inject()`:
```typescript
#store = inject(IncomesStore);
incomes = this.#store.incomes();
```

### Component Patterns

All components are standalone (no NgModules). Key patterns:
- Signal-based inputs: `data = input.required<IIncome[]>()`
- Inject function: `#service = inject(ServiceName)`
- Private fields with `#` prefix for injected dependencies

### Feature Module Structure

```
features/<feature>/
├── components/     # Presentational components
├── containers/     # Smart components (state-connected)
├── store/          # NgRx Signal Store
├── types/          # Interfaces and types
├── views/          # Route-level components
├── services/       # Feature-specific services
├── helpers/        # Utility functions
└── <feature>.routes.ts
```

### Path Aliases

```typescript
@core/*      → src/app/core/*
@features/*  → src/app/features/*
@layout/*    → src/app/layout/*
@shared/*    → src/app/shared/*
@services/*  → src/app/core/services/*
@types/*     → src/app/core/types/*
```

### Routing

Features are lazy-loaded via router:
```typescript
{
  path: 'incomes',
  loadChildren: () => import('./incomes/incomes.routes').then((m) => m.routes),
}
```

## Styling

- **Tailwind CSS** for utility classes
- **PrimeNG** components with `tailwindcss-primeui` plugin
- **Custom theme** in `src/theme.ts` extending Aura preset
- **Design tokens** in `src/styles/colors.css` (HSL-based)
- **Dark mode** via `.dark` class and CSS custom properties

Theme toggle managed by `ThemeService` with localStorage persistence.

## Testing

Uses Vitest (not Karma/Jasmine). Tests follow `*.spec.ts` pattern.

## Key Types

```typescript
interface IMoney {
  amount: number;
  currency: Currency; // PLN, EUR, USD, GBP, CHF
}

interface IIncome {
  id: string;
  date: Date;
  description: string;
  category: string[];
  amount: IMoney;
  recurring?: boolean;
}
```

## Angular 21 Features in Use

- Zoneless change detection (`provideExperimentalZonelessChangeDetection`)
- Signal-based inputs (`input()`, `input.required()`)
- Standalone components (no NgModules)
- `inject()` function for DI