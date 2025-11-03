const KEY = 'agentic:favorites'

export function loadFavorites(): any[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch (e) {
    return []
  }
}

export function saveFavorite(recipe: any) {
  const list = loadFavorites()
  if (!list.find((r) => r.id === recipe.id)) {
    list.push(recipe)
    localStorage.setItem(KEY, JSON.stringify(list))
  }
}

export function removeFavorite(id: number) {
  const list = loadFavorites().filter((r) => r.id !== id)
  localStorage.setItem(KEY, JSON.stringify(list))
}

export function isFavorite(id: number) {
  return loadFavorites().some((r) => r.id === id)
}
