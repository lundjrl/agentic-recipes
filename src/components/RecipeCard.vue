<template>
  <div class="bg-white p-4 rounded shadow-sm flex flex-col h-full">
    <div class="flex-1">
      <h3 class="font-semibold">{{ recipe.title }}</h3>
      <p class="text-sm text-gray-600 mt-1">{{ recipe.description }}</p>
      <div class="mt-2 text-xs text-gray-500">
        Time: {{ recipe.time ?? 'N/A' }} mins
      </div>
      <div class="mt-2 flex flex-wrap gap-2">
        <span
          v-for="t in recipe.tags || []"
          :key="t"
          class="text-xs bg-gray-100 px-2 py-0.5 rounded"
          >{{ t }}</span
        >
      </div>
    </div>

    <div class="mt-4 flex items-center justify-between">
      <button
        @click="toggleFavorite"
        :class="['px-3 py-1 rounded-md', isFavorite ? 'bg-yellow-400' : 'bg-gray-200']"
      >
        {{ isFavorite ? 'Unfavorite' : 'Favorite' }}
      </button>
      <router-link :to="`/recipes/${recipe.id}`" class="text-sm text-blue-600"
        >Details</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { saveFavorite, removeFavorite, isFavorite as favCheck } from '../services/favorites'
const props = defineProps<{ recipe: any }>()
const emit = defineEmits(['toggleFavorite'])

const isFavorite = ref(false)

onMounted(() => {
  isFavorite.value = favCheck(props.recipe.id)
})

function toggleFavorite() {
  if (isFavorite.value) {
    removeFavorite(props.recipe.id)
    isFavorite.value = false
  } else {
    saveFavorite(props.recipe)
    isFavorite.value = true
  }
  emit('toggleFavorite', props.recipe.id)
}
</script>

<style scoped></style>
