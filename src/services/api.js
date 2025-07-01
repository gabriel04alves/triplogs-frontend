import { authService } from "./auth/index.js";
import { userService } from "./user/index.js";
// import { tripService } from "./trip/index.js";

class ApiService {
  async login(email, password) {
    return authService.login(email, password);
  }

  async refreshToken(refreshToken) {
    return authService.refreshToken(refreshToken);
  }

  async verifyToken(token) {
    return authService.verifyToken(token);
  }

  async register(userData) {
    return userService.register(userData);
  }

  async getCurrentUser() {
    return userService.getCurrentUser();
  }

  async getUsers() {
    return userService.getUsers();
  }

  // async getTrips() {
  //   return tripService.getTrips();
  // }
}

export default new ApiService();
