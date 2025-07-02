import { httpClient, API_ENDPOINTS } from "../core/index.js";

class TripService {
  // Obter todas as trips (viagens)
  async getTrips() {
    return httpClient.get(API_ENDPOINTS.TRIPS.BASE);
  }

  // Obter uma trip específica
  async getTrip(tripId) {
    return httpClient.get(`${API_ENDPOINTS.TRIPS.BASE}${tripId}/`);
  }

  // Criar nova trip
  async createTrip(tripData) {
    return httpClient.post(API_ENDPOINTS.TRIPS.BASE, tripData);
  }

  // Atualizar trip
  async updateTrip(tripId, tripData) {
    return httpClient.patch(`${API_ENDPOINTS.TRIPS.BASE}${tripId}/`, tripData);
  }

  // Deletar trip
  async deleteTrip(tripId) {
    return httpClient.delete(`${API_ENDPOINTS.TRIPS.BASE}${tripId}/`);
  }

  // Obter trips do usuário atual
  async getUserTrips() {
    return httpClient.get(API_ENDPOINTS.TRIPS.USER_TRIPS);
  }
}

export default new TripService();
