<template>
  <div class="flex items-center gap-3">
    <select v-model="tagLocal" class="px-2 py-1 border rounded-md">
      <option value="">All tags</option>
      <option v-for="t in tags" :key="t" :value="t">{{ t }}</option>
    </select>

    <input
      type="number"
      v-model.number="maxTimeLocal"
      placeholder="Max time (mins)"
      class="w-32 px-2 py-1 border rounded-md"
    />
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
const props = defineProps<{ tags: string[] }>()
const emit = defineEmits<{
  (e: 'update:tag', value: string | null): void
  (e: 'update:maxTime', value: number | null): void
}>()

const tagLocal = ref<string | null>(null)
const maxTimeLocal = ref<number | null>(null)

watch(tagLocal, (v) => emit('update:tag', v))
watch(maxTimeLocal, (v) => emit('update:maxTime', v))
</script>

<style scoped></style>
