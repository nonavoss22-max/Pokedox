# Pokédex Gallery

## What it is

The main browsing page at `/pokedex` — a paginated grid of all Pokémon cards.

## How it works

**Pagination:** URL-based using a `?page=` query parameter (defaults to page 1). Each page shows 20 Pokémon. Prev/Next buttons update the URL and reload the page.

**Data fetching:** Server-side (SSR) on every page load:
1. Fetches a paginated list from PokéAPI: `/pokemon?limit=20&offset={offset}`
2. Fetches full details for each of the 20 Pokémon in parallel using `Promise.all`
3. Calculates total pages from the API's `count` field (`Math.ceil(count / 20)`)

**Cards:** Each card shows the Pokémon's sprite, national Pokédex number (zero-padded, e.g. `#004`), and name. Clicking a card goes to `/pokemon/{name}`.

## Implementation

File: `src/pages/pokedex.astro`

- `export const prerender = false` enables SSR so the page can read `?page=` at request time
- Cards use a responsive CSS grid (`auto-fill, minmax(160px, 1fr)`)
- Disabled state on Prev/Next buttons via `.disabled` class (`pointer-events: none`)
