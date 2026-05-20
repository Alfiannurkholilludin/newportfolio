import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
    },

    {
      path: '/works',
      name: 'works',
      component: () => import('@/views/WorksView.vue'),
    },

    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },

    {
      path: '/projects/:slug',
      name: 'project-detail',
      component: () => import('@/views/ProjectDetailView.vue'),
    },
  ],
})

export default router