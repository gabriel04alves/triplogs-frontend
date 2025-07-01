// Configurações da API
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  TIMEOUT: 10000,
  HEADERS: {
    "Content-Type": "application/json",
  },
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/token/",
    REFRESH: "/token/refresh/",
    VERIFY: "/token/verify/",
  },
  USERS: {
    BASE: "/usuarios/",
    ME: "/usuarios/me/",
    REGISTER: "/usuarios/",
  },
  TRIPS: {
    BASE: "/trips/",
    USER_TRIPS: "/trips/me/",
  },
};

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
};
