<template>
  <div>
    <div v-if="error" class="mb-4 p-3 bg-red-100 text-red-800 rounded">
      {{ error }}
    </div>

    <div class="flex items-start gap-4">
      <div class="flex-1">
        <h2 class="text-2xl font-bold">{{ recipe.title }}</h2>
        <p class="mt-2 text-gray-700">{{ recipe.description }}</p>

        <div class="mt-4">
          <h3 class="font-semibold">Ingredients</h3>
          <ul class="list-disc pl-5 text-gray-700">
            <li v-for="ing in recipe.ingredients || []" :key="ing">
              {{ ing }}
            </li>
          </ul>
        </div>

        <div class="mt-4">
          <h3 class="font-semibold">Steps</h3>
          <ol class="list-decimal pl-5 text-gray-700">
            <li v-for="(s, idx) in recipe.steps || []" :key="idx">{{ s }}</li>
          </ol>
        </div>
      </div>

      <div class="w-48">
        <div class="bg-white p-4 rounded shadow-sm">
          <div class="text-sm text-gray-600">Time</div>
          <div class="font-semibold">{{ recipe.time ?? 'N/A' }} mins</div>

          <div class="mt-4">
            <button
              @click="toggleFavorite"
              :class="['px-3 py-1 rounded-md mt-2 w-full', isFavorite ? 'bg-yellow-400' : 'bg-gray-200']"
            >
              {{ isFavorite ? 'Unfavorite' : 'Favorite' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading" class="mt-4 text-gray-500">Loading...</div>
    <div v-if="!loading && !recipe.id && !error" class="mt-4 text-gray-500">
      Recipe not found.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getRecipeById } from '../services/api'
import { saveFavorite, removeFavorite, isFavorite as favCheck } from '../services/favorites'

const route = useRoute()
const recipe = ref<any>({})
const loading = ref(false)
const isFavorite = ref(false)
const error = ref<string | null>(null)

async function load() {
  loading.value = true
  error.value = null
  try {
    const id = Number(route.params.id)
    const data = await getRecipeById(id)
    recipe.value = data
    isFavorite.value = favCheck(id)
  } catch (err: any) {
    console.error('getRecipeById error', err)
    error.value = err?.message ?? 'An unknown error occurred while loading recipe.'
  } finally {
    loading.value = false
  }
}

function toggleFavorite() {
  const id = Number(route.params.id)
  if (isFavorite.value) {
    removeFavorite(id)
    isFavorite.value = false
  } else {
    saveFavorite(recipe.value)
    isFavorite.value = true
  }
}

onMounted(load)
</script>

<style scoped></style>
