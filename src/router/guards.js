import { useAuthStore } from "../store/authStore";

export const authGuard = async (to, from, next) => {
  const authStore = useAuthStore();

  const isAuthenticated = await authStore.checkAuth();

  if (isAuthenticated) {
    next();
  } else {
    next("/login");
  }
};

export const guestGuard = async (to, from, next) => {
  const authStore = useAuthStore();

  const isAuthenticated = await authStore.checkAuth();

  if (!isAuthenticated) {
    next();
  } else {
    next("/platform");
  }
};
