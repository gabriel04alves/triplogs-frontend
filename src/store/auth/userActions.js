import ApiService from "../../services/api.js";

export const userActions = {
  async fetchUser() {
    try {
      const user = await ApiService.getCurrentUser();
      this.user = user;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      // Se falhar ao obter o usuário, limpar autenticação
      this.clearAuth();
    }
  },

  updateUser(userData) {
    this.user = { ...this.user, ...userData };
  },

  clearUser() {
    this.user = null;
  },
};
