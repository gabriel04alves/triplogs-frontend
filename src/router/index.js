import { createRouter, createWebHistory } from "vue-router";
import LandingPageView from "../views/LandingPageView.vue";
import LoginView from "../views/LoginView.vue";
import SignUpView from "../views/SignUpView.vue";
import PlatformView from "../views/PlatformView.vue";
import { authGuard, guestGuard } from "./guards.js";

const routes = [
  {
    path: "/",
    name: "landing-page",
    component: LandingPageView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    beforeEnter: guestGuard,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpView,
    beforeEnter: guestGuard,
  },
  {
    path: "/platform",
    name: "platform",
    component: PlatformView,
    beforeEnter: authGuard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    }
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
