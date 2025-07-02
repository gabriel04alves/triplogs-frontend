import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/authStore'
import { useTrips } from './useTrips'
import { useNotifications } from './useNotifications'
import { useTripForm } from './useTripForm'
import { useTripCard } from './useTripCard'
import { usePlatformHandlers } from './usePlatformHandlers'
import { usePlatformLayout } from './usePlatformLayout'

/**
 * Composable principal para a plataforma de gerenciamento de viagens
 * Centraliza toda a lógica da PlatformView
 */
export function usePlatform() {
    const router = useRouter()
    const authStore = useAuthStore()

    // Composables
    const tripsComposable = useTrips()
    const notificationsComposable = useNotifications()
    const tripFormComposable = useTripForm()
    const tripCardComposable = useTripCard()

    // Layout
    const layoutComposable = usePlatformLayout(
        tripsComposable.trips,
        tripsComposable.filteredTrips,
        tripsComposable.loading,
        tripsComposable.searchQuery
    )

    // Handlers
    const handlers = usePlatformHandlers(
        tripsComposable, 
        tripFormComposable, 
        tripCardComposable, 
        notificationsComposable
    )

    // Computed properties para gerenciamento de diálogos
    const showTripDialog = computed({
        get: () => tripFormComposable.showAddTripDialog.value || tripFormComposable.showEditDialog.value,
        set: (value) => {
            if (!value) {
                tripFormComposable.closeDialog()
            }
        }
    })

    const currentTripData = computed(() => {
        return tripFormComposable.editingTrip.value || tripFormComposable.newTrip.value
    })

    const isEditMode = computed(() => {
        return tripFormComposable.showEditDialog.value && !!tripFormComposable.editingTrip.value
    })

    // Inicialização da plataforma
    const initializePlatform = async () => {
        const isAuthenticated = await authStore.checkAuth()
        if (!isAuthenticated) {
            router.push('/login')
            return false
        }
        
        await tripsComposable.loadTrips()
        return true
    }

    // Wrapper para o handleSubmitTrip que passa os parâmetros necessários
    const handleSubmitTrip = async (tripData) => {
        return await handlers.handleSubmitTrip(
            tripData, 
            isEditMode.value, 
            tripFormComposable.editingTrip.value
        )
    }

    // Lifecycle
    onMounted(initializePlatform)

    return {
        // Estado dos composables
        ...tripsComposable,
        ...notificationsComposable,
        ...tripFormComposable,
        ...tripCardComposable,
        ...layoutComposable,

        // Computed properties
        showTripDialog,
        currentTripData,
        isEditMode,

        // Handlers
        handleOpenAddDialog: handlers.handleOpenAddDialog,
        handleEditTrip: handlers.handleEditTrip,
        handleDeleteTrip: handlers.handleDeleteTrip,
        handleSubmitTrip,
        handleCancelForm: handlers.handleCancelForm,
        handleConfirmDelete: handlers.handleConfirmDelete,
        handleCancelDelete: handlers.handleCancelDelete,

        // Utilities
        initializePlatform
    }
}
