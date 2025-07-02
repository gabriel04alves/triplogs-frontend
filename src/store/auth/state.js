/**
 * Estado inicial do módulo de autenticação
 */
export const authState = () => ({
  user: null,
  accessToken: localStorage.getItem("access_token"),
  refreshToken: localStorage.getItem("refresh_token"),
  isAuthenticated: false,
  loading: false,
  error: null,
});
