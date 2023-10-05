import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "news",
      component: () => import("../views/NewsView.vue"),
    },
    {
      path: "/single-news",
      name: "single-news",
      component: () => import("../views/SingleNewsView.vue"),
      props: true,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // If savedPosition is available, use it for scrolling
      return savedPosition;
    } else {
      // Scroll to the top of the page when navigating to a new route
      return { top: 0 };
    }
  },
});

export default router;
