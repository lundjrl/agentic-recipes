<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <header class="bg-white shadow-sm">
      <div
        class="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between"
      >
        <h1 class="text-xl font-semibold">Agentic Recipes</h1>
        <nav class="space-x-4">
          <router-link to="/" class="text-sm text-gray-600 hover:text-gray-900"
            >Search</router-link
          >
          <router-link
            to="/favorites"
            class="text-sm text-gray-600 hover:text-gray-900"
            >Favorites</router-link
          >
        </nav>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-4 py-6">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
// App-level logic can go here later
</script>

<style></style>
