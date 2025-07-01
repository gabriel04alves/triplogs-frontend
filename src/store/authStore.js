import { defineStore } from "pinia";
import { authState, authGetters, allAuthActions } from "./auth/index.js";

export const useAuthStore = defineStore("auth", {
  state: authState,
  getters: authGetters,
  actions: allAuthActions,
});

export * from "./auth/index.js";
