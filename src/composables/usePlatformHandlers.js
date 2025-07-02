/**
 * Composable para gerenciar handlers de interface de usuário
 * Separa a lógica de manipulação de eventos da lógica de negócio
 */
export function usePlatformHandlers(tripsComposable, tripFormComposable, tripCardComposable, notificationsComposable) {
    
    // Handlers para ações de viagem
    const handleOpenAddDialog = () => {
        tripFormComposable.openAddDialog()
    }

    const handleEditTrip = (trip) => {
        tripFormComposable.openEditDialog(trip)
    }

    const handleDeleteTrip = (trip) => {
        tripCardComposable.openDeleteDialog(trip)
    }

    const handleSubmitTrip = async (tripData, isEditMode, editingTrip) => {
        try {
            const formattedData = formatTripDataForSubmit(tripData)
            
            let result
            if (isEditMode) {
                result = await tripsComposable.updateTrip(editingTrip.id, formattedData)
            } else {
                result = await tripsComposable.createTrip(formattedData)
            }

            if (result.success) {
                tripFormComposable.closeDialog()
                return result
            }
        } catch (error) {
            console.error('Erro ao salvar viagem:', error)
            notificationsComposable.showError('Erro ao salvar viagem')
            throw error
        }
    }

    const handleCancelForm = () => {
        tripFormComposable.closeDialog()
    }

    const handleConfirmDelete = async () => {
        if (!tripCardComposable.tripToDelete.value) return

        try {
            const result = await tripsComposable.deleteTrip(tripCardComposable.tripToDelete.value.id)
            if (result.success) {
                tripCardComposable.closeDeleteDialog()
            }
            return result
        } catch (error) {
            console.error('Erro ao deletar viagem:', error)
            notificationsComposable.showError('Erro ao deletar viagem')
            throw error
        }
    }

    const handleCancelDelete = () => {
        tripCardComposable.closeDeleteDialog()
    }

    // Função utilitária para formatar dados da viagem
    const formatTripDataForSubmit = (tripData) => ({
        title: tripData.title?.trim() || '',
        location: tripData.location?.trim() || '',
        trip_date: tripData.trip_date || '',
        description: tripData.description?.trim() || '',
        photo: tripData.photo?.trim() || ''
    })

    // Handler para busca
    const handleUpdateSearch = (searchValue) => {
        tripsComposable.searchQuery.value = searchValue
    }

    const handleClearSearch = () => {
        tripsComposable.clearSearch()
    }

    return {
        handleOpenAddDialog,
        handleEditTrip,
        handleDeleteTrip,
        handleSubmitTrip,
        handleCancelForm,
        handleConfirmDelete,
        handleCancelDelete,
        handleUpdateSearch,
        handleClearSearch,
        formatTripDataForSubmit
    }
}
