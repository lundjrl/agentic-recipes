import { createRouter, createWebHistory } from 'vue-router'
import SearchView from '../pages/SearchView.vue'
import FavoritesView from '../pages/FavoritesView.vue'
import RecipeDetail from '../pages/RecipeDetail.vue'

const routes = [
  { path: '/', name: 'search', component: SearchView },
  { path: '/favorites', name: 'favorites', component: FavoritesView },
  { path: '/recipes/:id', name: 'recipe-detail', component: RecipeDetail, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
