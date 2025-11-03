# Agentic Recipes

Scaffolded Vue 3 + TypeScript + Vite project with TailwindCSS. This app uses the DummyJSON Recipes API (https://dummyjson.com/docs/recipes) to search and favorite recipes.

Getting started

1. Install dependencies:

```bash
# using npm
npm install

# or using pnpm
pnpm install
```

2. Run the dev server:

```bash
npm run dev
```

3. Open http://localhost:5173

Notes
- Favorites are stored in localStorage under key `agentic:favorites`.
- The API service uses axios and points to https://dummyjson.com. No API key required.

Next steps (suggestions)
- Implement recipe detail route (/recipes/:id)
- Add unit tests for services and components
- Improve filters (ingredients, servings, etc.) based on actual API fields
