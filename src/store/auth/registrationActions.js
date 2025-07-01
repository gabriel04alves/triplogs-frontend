import ApiService from "../../services/api.js";

export const registrationActions = {
  async register(userData) {
    this.loading = true;
    this.error = null;

    try {
      if (!userData.name || userData.name.trim().length < 2) {
        throw new Error("Nome deve ter pelo menos 2 caracteres");
      }

      if (!userData.email || !/.+@.+\..+/.test(userData.email)) {
        throw new Error("Email deve ser válido");
      }

      if (!userData.password || userData.password.length < 6) {
        throw new Error("Senha deve ter pelo menos 6 caracteres");
      }

      const response = await ApiService.register(userData);

      return {
        success: true,
        user: response,
      };
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      this.error = error.message;
      return { success: false, error: error.message };
    } finally {
      this.loading = false;
    }
  },
};
