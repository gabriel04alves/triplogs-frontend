// Configurações da API
export const API_CONFIG = {
  API_BASE_URL:
    window.ENV?.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:3000/api/",
  TIMEOUT: 10000,
  HEADERS: {
    "Content-Type": "application/json",
  },
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "api/token/",
    REFRESH: "api/token/refresh/",
    VERIFY: "api/token/verify/",
  },
  USERS: {
    BASE: "api/usuarios/",
    ME: "api/usuarios/me/",
    REGISTER: "/usuarios/",
  },
  TRIPS: {
    BASE: "api/trips/",
    USER_TRIPS: "api/trips/",
  },
};

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
};
