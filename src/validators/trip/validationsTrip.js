export const tripValidationRules = {
    title: [
        v => !!v || 'Título é obrigatório',
        v => v.length >= 3 || 'Título deve ter pelo menos 3 caracteres',
        v => v.length <= 100 || 'Título deve ter no máximo 100 caracteres'
    ],
    location: [
        v => !!v || 'Localização é obrigatória',
        v => v.length >= 2 || 'Localização deve ter pelo menos 2 caracteres',
        v => v.length <= 150 || 'Localização deve ter no máximo 150 caracteres'
    ],
    description: [
        v => !!v || 'Descrição é obrigatória',
        v => v.length >= 10 || 'Descrição deve ter pelo menos 10 caracteres',
        v => v.length <= 1000 || 'Descrição deve ter no máximo 1000 caracteres'
    ],
    trip_date: [
        v => !!v || 'Data da viagem é obrigatória',
        v => {
            const date = new Date(v)
            const today = new Date()
            return date <= today || 'Data da viagem não pode ser no futuro'
        }
    ],
    photo: [
        v => !v || isValidUrl(v) || 'URL da foto deve ser válida'
    ]
}

const isValidUrl = (string) => {
    try {
        new URL(string)
        return true
    } catch (_) {
        return false
    }
}

export const validateTripData = (tripData) => {
    const errors = {}

    // Validar título
    if (!tripData.title || !tripData.title.trim()) {
        errors.title = 'Título é obrigatório'
    } else if (tripData.title.trim().length < 3) {
        errors.title = 'Título deve ter pelo menos 3 caracteres'
    } else if (tripData.title.trim().length > 100) {
        errors.title = 'Título deve ter no máximo 100 caracteres'
    }

    // Validar localização
    if (!tripData.location || !tripData.location.trim()) {
        errors.location = 'Localização é obrigatória'
    } else if (tripData.location.trim().length < 2) {
        errors.location = 'Localização deve ter pelo menos 2 caracteres'
    } else if (tripData.location.trim().length > 150) {
        errors.location = 'Localização deve ter no máximo 150 caracteres'
    }

    // Validar descrição
    if (!tripData.description || !tripData.description.trim()) {
        errors.description = 'Descrição é obrigatória'
    } else if (tripData.description.trim().length < 10) {
        errors.description = 'Descrição deve ter pelo menos 10 caracteres'
    } else if (tripData.description.trim().length > 1000) {
        errors.description = 'Descrição deve ter no máximo 1000 caracteres'
    }

    // Validar data
    if (!tripData.trip_date) {
        errors.trip_date = 'Data da viagem é obrigatória'
    } else {
        const date = new Date(tripData.trip_date)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        if (date > today) {
            errors.trip_date = 'Data da viagem não pode ser no futuro'
        }
    }

    // Validar foto (opcional)
    if (tripData.photo && !isValidUrl(tripData.photo)) {
        errors.photo = 'URL da foto deve ser válida'
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}

export const sanitizeTripData = (tripData) => {
    return {
        title: tripData.title?.trim() || '',
        location: tripData.location?.trim() || '',
        description: tripData.description?.trim() || '',
        trip_date: tripData.trip_date || '',
        photo: tripData.photo?.trim() || ''
    }
}
