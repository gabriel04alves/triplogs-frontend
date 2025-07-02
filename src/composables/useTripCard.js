import { ref } from 'vue'

export function useTripCard() {
    const expandedCards = ref({})
    const showDeleteDialog = ref(false)
    const tripToDelete = ref(null)

    const toggleCardExpansion = (tripId) => {
        expandedCards.value[tripId] = !expandedCards.value[tripId]
    }

    const handleImageError = (event) => {
        event.target.src = 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
    }

    const formatDate = (dateString) => {
        if (!dateString) return ''
        const date = new Date(dateString)
        return date.toLocaleDateString('pt-BR')
    }

    const openDeleteDialog = (trip) => {
        tripToDelete.value = trip
        showDeleteDialog.value = true
    }

    const closeDeleteDialog = () => {
        showDeleteDialog.value = false
        tripToDelete.value = null
    }

    const viewTripDetails = (trip) => {
        // Implementar navegação para detalhes da trip ou modal
        console.log('Visualizar detalhes da trip:', trip)
    }

    return {
        // Estado
        expandedCards,
        showDeleteDialog,
        tripToDelete,

        // Métodos
        toggleCardExpansion,
        handleImageError,
        formatDate,
        openDeleteDialog,
        closeDeleteDialog,
        viewTripDetails
    }
}
