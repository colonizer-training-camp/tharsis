# Tharsis

A web application for creating, managing, and printing whisky bottle labels.

## Tech Stack

- **React 19** with **TypeScript**
- **Vite** for development and builds
- **TanStack Router** for file-based routing
- **Emotion** for CSS-in-JS styling
- **@react-pdf/renderer** for PDF label generation

## Getting Started

```bash
yarn install
yarn dev
```

## Scripts

| Script          | Description                           |
| --------------- | ------------------------------------- |
| `yarn dev`      | Start development server              |
| `yarn build`    | TypeScript check and production build |
| `yarn lint`     | Run ESLint                            |
| `yarn lint:fix` | Auto-fix ESLint issues                |
| `yarn preview`  | Preview production build              |

## Features

### Print Labels

- **New Bottle** (`/print/bottle/new`) -- Create a custom label by entering bottle details manually or by importing from a Whiskybase URL.
- **Existing Bottle** (`/print/bottle/existing`) -- Select a bottle from the catalog, search/filter, and print its label.

### Scan Bottles

`/scan/bottle` -- Scan a bottle ID to look it up in the catalog, view its label preview, and print. Maintains a scan history within the session.

### Bottle of the Day

`/bottle-of-the-day` -- Randomly selects a bottle from the catalog with an animated carousel.

### Drink Responsibly

`/drink-responsibly` -- Track alcohol consumption by adding drinks with ABV and volume. Calculates total alcohol content.

## Label Format

Labels are sized at **80mm x 56mm** for thermal label printers. Each label includes:

- Header banner
- Brand and bottle name
- Description
- Labelled date
- ABV (% vol)
- Meta information (age, PPM, etc.)

The PDF is generated in portrait orientation with `orientation="landscape"` to match printer defaults.

## Data

Bottle data is stored in `public/bottles.json`. Each bottle has a unique `id` derived from brand and name (lowercase, underscored). The `BottleData` type is defined in `src/routes/print/bottle/-types.ts`.
