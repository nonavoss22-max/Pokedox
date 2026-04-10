# Search Feature

## What was added

A live search bar and type filter were added to the Pokédex gallery (`/pokedex`).

## How it works

**UI:** A text input and type dropdown sit above the Pokémon grid. They match the existing white/orange theme.

**Name search:** As the user types, results filter instantly. Matches any Pokémon whose name contains the search term (e.g. "char" matches Charmander, Charmeleon, Charizard, Charcadet, etc.).

**Type filter:** A dropdown with all 18 types (Fire, Water, Grass, etc.). When selected, fetches that type's Pokémon list from PokéAPI and filters the results. Type data is cached so repeat selections don't re-fetch.

**Combined:** Name and type filters work together — results must satisfy both.

**Restoring pagination:** When both fields are cleared, the original server-rendered paginated grid and navigation reappear.

## Implementation

Only one file was modified: `src/pages/pokedex.astro`

- Added CSS for `.search-bar`, `.search-input`, `.type-select`, `.search-count`
- Added HTML for the search bar and a hidden `#search-results` grid container
- Added a client-side `<script>` block that:
  - Fetches all ~1302 Pokémon names + IDs from PokéAPI on page load (`/pokemon?limit=1302`) — a single lightweight request
  - Derives sprite URLs from the Pokémon ID using the public PokeAPI sprites repo, avoiding per-Pokémon API calls during search
  - Fetches type membership lists from `/type/{name}` on demand and caches them
  - Renders up to 20 matching results using the same `.card` styles as the paginated view
