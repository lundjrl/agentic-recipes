<template>
  <div class="flex gap-2">
    <input
      v-model="q"
      @keyup.enter="submit"
      placeholder="Search recipes..."
      class="flex-1 px-3 py-2 border rounded-md"
    />
    <button @click="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md">
      Search
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const emit = defineEmits(['search'])
const q = ref('')
function submit() {
  emit('search', q.value)
}
</script>

<style scoped></style>
