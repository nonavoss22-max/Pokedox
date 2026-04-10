# Home Page

## What it is

The landing page at `/` — a simple hero screen that introduces the app and directs users to the Pokédex.

## How it works

Fully static (no data fetching). Renders a centered hero section with:

- A large heading: "Explore the Pokémon World"
- A short description blurb
- An "Open Pokédex" button linking to `/pokedex`

## Implementation

File: `src/pages/index.astro`

No server-side logic. Pure HTML + scoped CSS using the shared white/orange theme (Nunito font, `#f97316` orange accent).
