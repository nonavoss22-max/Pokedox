# About Page

## What it is

A static informational page at `/about` describing the Pokémon world and the app's data source.

## How it works

Fully static (no data fetching). Shows a short intro paragraph and a grid of four info cards:

| Card | Content |
|------|---------|
| 18 Types | Explains the type system and its role in battles |
| 9 Generations | Brief history from Gen I (1996) to today's 1025+ Pokémon |
| 6 Base Stats | Lists HP, Attack, Defense, Sp. Atk, Sp. Def, Speed |
| PokéAPI | Credits the data source powering the app |

A "Explore the Pokédex" CTA button links back to `/pokedex`.

## Implementation

File: `src/pages/about.astro`

Fully static — prerendered to HTML at build time. No `export const prerender = false` needed. Uses the same white/orange card style as the rest of the app.
