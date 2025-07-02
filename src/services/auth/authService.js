import { httpClient, API_ENDPOINTS, STORAGE_KEYS } from "../core/index.js";

class AuthService {
  async login(email, password) {
    return httpClient.post(API_ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    });
  }

  async refreshToken(refreshToken) {
    return httpClient.post(API_ENDPOINTS.AUTH.REFRESH, {
      refresh: refreshToken,
    });
  }

  async verifyToken(token) {
    return httpClient.post(API_ENDPOINTS.AUTH.VERIFY, {
      token,
    });
  }

  logout() {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  isAuthenticated() {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    return !!token;
  }

  getToken() {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  saveTokens(accessToken, refreshToken) {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    if (refreshToken) {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    }
  }
}

export default new AuthService();
