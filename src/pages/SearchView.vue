<template>
  <div>
    <div v-if="error" class="mb-4 p-3 bg-red-100 text-red-800 rounded">
      {{ error }}
    </div>

    <SearchBar @search="onSearch" />

    <div class="mt-4 flex gap-4 items-center">
      <Filters
        :tags="availableTags"
        v-model:tag="selectedTag"
        v-model:maxTime="maxTime"
      />
    </div>

    <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <RecipeCard
        v-for="r in displayed"
        :key="r.id"
        :recipe="r"
        @toggleFavorite="onToggleFavorite"
      />
    </div>

    <div v-if="loading" class="mt-6 text-center text-gray-500">Loading...</div>
    <div
      v-if="!loading && displayed.length === 0"
      class="mt-6 text-center text-gray-500"
    >
      No recipes found.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SearchBar from '../components/SearchBar.vue'
import Filters from '../components/Filters.vue'
import RecipeCard from '../components/RecipeCard.vue'
import { searchRecipes } from '../services/api'

const recipes = ref<any[]>([])
const loading = ref(false)
const availableTags = ref<string[]>([])
const selectedTag = ref<string | null>(null)
const maxTime = ref<number | null>(null)
const error = ref<string | null>(null)

async function onSearch(query: string) {
  loading.value = true
  error.value = null
  try {
    const data = await searchRecipes(query, 40)
    // DummyJSON returns { total, skip, limit, recipes }
    recipes.value = data?.recipes ?? []
    // Extract unique tags
    const tags = new Set<string>()
    recipes.value.forEach((r: any) => {
      if (Array.isArray(r.tags)) r.tags.forEach((t: string) => tags.add(t))
    })
    availableTags.value = Array.from(tags)
  } catch (err: any) {
    console.error('searchRecipes error', err)
    error.value = err?.message ?? 'An unknown error occurred while searching.'
  } finally {
    loading.value = false
  }
}

function onToggleFavorite(recipeId: number) {
  // placeholder — RecipeCard manages localStorage; this can be used to sync UI as needed
}

// computed filtered list
const displayed = computed(() => {
  return recipes.value.filter((r: any) => {
    if (selectedTag.value && !(r.tags || []).includes(selectedTag.value)) return false
    if (maxTime.value && r.time && r.time > maxTime.value) return false
    return true
  })
})
</script>

<style scoped></style>
