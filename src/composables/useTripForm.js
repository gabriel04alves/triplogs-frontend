import { ref } from 'vue'
import { tripValidationRules } from '../validators/trip/validationsTrip'

export function useTripForm() {
    const formRef = ref(null)
    const showAddTripDialog = ref(false)
    const showEditDialog = ref(false)
    const editingTrip = ref(null)

    // Form data for new trip
    const newTrip = ref({
        title: '',
        location: '',
        description: '',
        trip_date: '',
        photo: ''
    })

    const formRules = tripValidationRules

    const validateForm = async () => {
        if (!formRef.value) return false

        const { valid } = await formRef.value.validate()
        if (!valid) return false

        // Validação adicional dos campos obrigatórios
        if (!newTrip.value.title.trim()) {
            throw new Error('Título é obrigatório')
        }
        if (!newTrip.value.location.trim()) {
            throw new Error('Localização é obrigatória')
        }
        if (!newTrip.value.description.trim()) {
            throw new Error('Descrição é obrigatória')
        }
        if (!newTrip.value.trip_date) {
            throw new Error('Data da viagem é obrigatória')
        }

        return true
    }

    const formatTripData = () => {
        return {
            title: newTrip.value.title.trim(),
            location: newTrip.value.location.trim(),
            trip_date: newTrip.value.trip_date,
            description: newTrip.value.description.trim(),
            photo: newTrip.value.photo ? newTrip.value.photo.trim() : ''
        }
    }

    const resetForm = () => {
        newTrip.value = {
            title: '',
            location: '',
            description: '',
            trip_date: '',
            photo: ''
        }
        if (formRef.value) {
            formRef.value.resetValidation()
        }
    }

    const closeDialog = () => {
        showAddTripDialog.value = false
        showEditDialog.value = false
        editingTrip.value = null
        resetForm()
    }

    const openAddDialog = () => {
        resetForm()
        showAddTripDialog.value = true
    }

    const openEditDialog = (trip) => {
        editingTrip.value = { ...trip }
        newTrip.value = {
            title: trip.title,
            location: trip.location,
            description: trip.description,
            trip_date: trip.trip_date,
            photo: trip.photo || ''
        }
        showEditDialog.value = true
    }

    return {
        // Estado
        formRef,
        showAddTripDialog,
        showEditDialog,
        editingTrip,
        newTrip,
        formRules,

        // Métodos
        validateForm,
        formatTripData,
        resetForm,
        closeDialog,
        openAddDialog,
        openEditDialog
    }
}
