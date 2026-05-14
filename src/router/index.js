import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import ProjectDetailView from "@/views/ProjectDetailView.vue";

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
