import axios from "axios";
import { API_CONFIG, STORAGE_KEYS } from "./config.js";

class HttpClient {
  constructor() {
    this.api = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: API_CONFIG.HEADERS,
    });

    this.setupInterceptors();
  }

  setupInterceptors() {
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        const errorMessage = this.extractErrorMessage(error);
        return Promise.reject(new Error(errorMessage));
      }
    );
  }

  extractErrorMessage(error) {
    console.error("Erro na API:", error);

    let errorMessage = "Erro desconhecido";

    if (error.response?.data) {
      console.log("Dados do erro:", error.response.data);

      if (typeof error.response.data === "string") {
        errorMessage = error.response.data;
      } else if (error.response.data.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.response.data.non_field_errors) {
        errorMessage = error.response.data.non_field_errors.join(", ");
      } else {
        const fieldErrors = [];
        Object.keys(error.response.data).forEach((field) => {
          const fieldError = error.response.data[field];
          if (Array.isArray(fieldError)) {
            fieldErrors.push(`${field}: ${fieldError.join(", ")}`);
          } else {
            fieldErrors.push(`${field}: ${fieldError}`);
          }
        });

        if (fieldErrors.length > 0) {
          errorMessage = fieldErrors.join("; ");
        }
      }
    } else if (error.message) {
      errorMessage = error.message;
    }

    return errorMessage;
  }

  async get(url, config = {}) {
    return this.api.get(url, config);
  }

  async post(url, data = {}, config = {}) {
    return this.api.post(url, data, config);
  }

  async put(url, data = {}, config = {}) {
    return this.api.put(url, data, config);
  }

  async patch(url, data = {}, config = {}) {
    return this.api.patch(url, data, config);
  }

  async delete(url, config = {}) {
    return this.api.delete(url, config);
  }
}

export default new HttpClient();
