import { ref, computed } from 'vue'
import { tripService } from '../services/trip'
import { useNotifications } from './useNotifications'

export function useTrips() {
    const { showSuccess, showError } = useNotifications()
    
    // Estado reativo
    const trips = ref([])
    const loading = ref(false)
    const searchQuery = ref('')

    // Computed properties
    const filteredTrips = computed(() => {
        if (!searchQuery.value) {
            return trips.value
        }

        const query = searchQuery.value.toLowerCase()
        return trips.value.filter(trip =>
            trip.title.toLowerCase().includes(query) ||
            trip.location.toLowerCase().includes(query) ||
            trip.description.toLowerCase().includes(query)
        )
    })

    // Métodos
    const loadTrips = async () => {
        try {
            loading.value = true

            // Debug: verificar se o token está presente
            const token = localStorage.getItem('access_token')
            console.log('Token presente:', !!token)
            if (token) {
                console.log('Token:', token.substring(0, 20) + '...')
            }

            const response = await tripService.getUserTrips()
            trips.value = response.results || response || []
            console.log('Trips carregadas:', trips.value)
        } catch (error) {
            console.error('Erro ao carregar viagens:', error)
            showError('Erro ao carregar suas viagens. Tente novamente.')
        } finally {
            loading.value = false
        }
    }

    const createTrip = async (tripData) => {
        try {
            loading.value = true

            console.log('Enviando dados da viagem:', tripData)
            const response = await tripService.createTrip(tripData)
            console.log('Resposta da API:', response)

            showSuccess('História de viagem criada com sucesso!')
            await loadTrips()
            return { success: true }
        } catch (error) {
            console.error('Erro ao criar viagem:', error)

            let errorMsg = 'Erro ao criar viagem. Tente novamente.'

            if (error.message) {
                if (error.message.includes('trip_date')) {
                    errorMsg = 'Erro ao criar viagem: Este campo é obrigatório.'
                } else if (error.message.includes('400')) {
                    errorMsg = 'Dados inválidos. Verifique os campos e tente novamente.'
                } else {
                    errorMsg = error.message
                }
            }

            showError(errorMsg)
            return { success: false, error: errorMsg }
        } finally {
            loading.value = false
        }
    }

    const updateTrip = async (tripId, tripData) => {
        try {
            loading.value = true
            await tripService.updateTrip(tripId, tripData)
            showSuccess('Viagem atualizada com sucesso!')
            await loadTrips()
            return { success: true }
        } catch (error) {
            console.error('Erro ao atualizar viagem:', error)
            showError('Erro ao atualizar viagem. Tente novamente.')
            return { success: false, error: error.message }
        } finally {
            loading.value = false
        }
    }

    const deleteTrip = async (tripId) => {
        try {
            loading.value = true
            await tripService.deleteTrip(tripId)
            showSuccess('Viagem excluída com sucesso!')
            await loadTrips()
            return { success: true }
        } catch (error) {
            console.error('Erro ao excluir viagem:', error)
            showError('Erro ao excluir viagem. Tente novamente.')
            return { success: false, error: error.message }
        } finally {
            loading.value = false
        }
    }

    const clearSearch = () => {
        searchQuery.value = ''
    }

    return {
        // Estado
        trips,
        loading,
        searchQuery,
        filteredTrips,
        
        // Métodos
        loadTrips,
        createTrip,
        updateTrip,
        deleteTrip,
        clearSearch
    }
}
