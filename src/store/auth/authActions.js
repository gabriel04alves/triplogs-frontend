import ApiService from "../../services/api.js";

export const authActions = {
  async login(email, password) {
    this.loading = true;
    this.error = null;

    try {
      const response = await ApiService.login(email, password);

      this.accessToken = response.access;
      this.refreshToken = response.refresh;
      this.isAuthenticated = true;

      localStorage.setItem("access_token", response.access);
      localStorage.setItem("refresh_token", response.refresh);

      await this.fetchUser();

      return { success: true };
    } catch (error) {
      this.error = error.message;
      this.clearAuth();
      return { success: false, error: error.message };
    } finally {
      this.loading = false;
    }
  },

  logout() {
    this.clearAuth();
  },

  clearAuth() {
    this.user = null;
    this.accessToken = null;
    this.refreshToken = null;
    this.isAuthenticated = false;
    this.error = null;

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },

  clearError() {
    this.error = null;
  },
};
