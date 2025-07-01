import ApiService from "../../services/api.js";

export const tokenActions = {
  async refreshAccessToken() {
    if (!this.refreshToken) {
      this.clearAuth();
      return false;
    }

    try {
      const response = await ApiService.refreshToken(this.refreshToken);
      this.accessToken = response.access;
      localStorage.setItem("access_token", response.access);
      return true;
    } catch (error) {
      this.clearAuth();
      return false;
    }
  },

  async checkAuth() {
    const token = localStorage.getItem("access_token");

    if (!token) {
      this.clearAuth();
      return false;
    }

    try {
      await this.fetchUser();
      this.accessToken = token;
      this.refreshToken = localStorage.getItem("refresh_token");
      this.isAuthenticated = true;
      return true;
    } catch (error) {
      this.clearAuth();
      return false;
    }
  },
};
