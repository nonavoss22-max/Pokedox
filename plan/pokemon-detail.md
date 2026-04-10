# Pokémon Detail Page

## What it is

A dynamic page at `/pokemon/{name}` showing full details for a single Pokémon.

## How it works

**Routing:** Dynamic route using `[name].astro`. The name comes from the URL segment (e.g. `/pokemon/charizard`).

**Data fetching:** Server-side (SSR) — fetches `/pokemon/{name}` from PokéAPI on every request. Returns full Pokémon data including sprites, types, and base stats.

**What's displayed:**
- Official artwork sprite (falls back to front sprite if unavailable)
- National Pokédex number (zero-padded)
- Name
- Type badges (orange pills, one per type)
- Base stats bar chart — HP, Attack, Defense, Sp. Atk, Sp. Def, Speed — with fill width calculated as `value / 255 * 100%`
- "← Back to Pokédex" link

## Implementation

File: `src/pages/pokemon/[name].astro`

- `export const prerender = false` enables SSR for dynamic name param
- Types extracted from `pokemon.types[].type.name`
- Stats extracted from `pokemon.stats[].stat.name` and `pokemon.stats[].base_stat`
- Stat bar capped at 100% width (`Math.min(value / 255 * 100, 100)`)
