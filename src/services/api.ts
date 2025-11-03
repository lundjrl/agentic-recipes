import axios from 'axios'

const client = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 5000
})

function extractAxiosError(err: any) {
  if (axios.isAxiosError(err)) {
    if (err.response) return `Request failed: ${err.response.status} ${err.response.statusText}`
    if (err.request) return 'No response received from server.'
    return err.message
  }
  return String(err)
}

export async function searchRecipes(q: string, limit = 20, skip = 0) {
  try {
    const params: Record<string, any> = { q, limit, skip }
    const res = await client.get('/recipes/search', { params })
    return res.data
  } catch (err) {
    const msg = extractAxiosError(err)
    throw new Error(`searchRecipes: ${msg}`)
  }
}

export async function getRecipeById(id: number) {
  try {
    const res = await client.get(`/recipes/${id}`)
    return res.data
  } catch (err) {
    const msg = extractAxiosError(err)
    throw new Error(`getRecipeById: ${msg}`)
  }
}
