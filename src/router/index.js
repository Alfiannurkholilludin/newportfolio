import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import ProjectDetailView from "@/views/ProjectDetailView.vue";
import WorksView from '@/views/WorksView.vue'

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/projects/:slug",
    name: "project-detail",
    component: ProjectDetailView,
  },
  {
  path: '/works',
  name: 'works',
  component: WorksView
},
];

const router = createRouter({
   history: createWebHistory(),
  routes,

  scrollBehavior() {
    return {
      top: 0
    }
  }
});

export default router;
