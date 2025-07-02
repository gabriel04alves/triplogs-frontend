import { httpClient, API_ENDPOINTS } from "../core/index.js";

class UserService {
  async register(userData) {
    const payload = {
      email: userData.email,
      password: userData.password,
      name: userData.name,
      is_active: true,
    };

    console.log("Payload enviado para registro:", payload);

    try {
      const response = await httpClient.post(
        API_ENDPOINTS.USERS.REGISTER,
        payload
      );
      console.log("Resposta do registro:", response);
      return response;
    } catch (error) {
      console.error("Erro no registro:", error);
      throw error;
    }
  }

  async getCurrentUser() {
    return httpClient.get(API_ENDPOINTS.USERS.ME);
  }

  async getUsers() {
    return httpClient.get(API_ENDPOINTS.USERS.BASE);
  }

  async updateUser(userId, userData) {
    return httpClient.patch(`/usuarios/${userId}/`, userData);
  }

  async deleteUser(userId) {
    return httpClient.delete(`/usuarios/${userId}/`);
  }
}

export default new UserService();
