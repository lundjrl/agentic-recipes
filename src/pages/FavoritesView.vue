<template>
  <div>
    <h2 class="text-lg font-semibold">Favorites</h2>

    <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <RecipeCard v-for="r in favorites" :key="r.id" :recipe="r" />
    </div>

    <div v-if="favorites.length === 0" class="mt-6 text-gray-500">You have no favorite recipes yet.</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import RecipeCard from '../components/RecipeCard.vue'
import { loadFavorites } from '../services/favorites'

const favorites = ref<any[]>([])

onMounted(() => {
  favorites.value = loadFavorites()
})
</script>

<style scoped></style>
