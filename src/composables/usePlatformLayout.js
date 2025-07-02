import { computed } from 'vue'

/**
 * Composable para gerenciar o layout e estados de exibição da plataforma
 * Centraliza a lógica de quando mostrar diferentes componentes da UI
 */
export function usePlatformLayout(trips, filteredTrips, loading, searchQuery) {
    
    // Estados computados para determinar o que mostrar
    const showLoading = computed(() => loading.value)
    
    const showTripList = computed(() => 
        !loading.value && filteredTrips.value.length > 0
    )
    
    const showEmptyState = computed(() => 
        !loading.value && trips.value.length === 0
    )
    
    const showNoResults = computed(() => 
        !loading.value && 
        trips.value.length > 0 && 
        filteredTrips.value.length === 0 && 
        searchQuery.value
    )
    
    const showSearchField = computed(() => 
        trips.value.length > 0
    )
    
    const showResultCount = computed(() => {
        return searchQuery.value && filteredTrips.value.length !== trips.value.length
    })

    // Configurações para diferentes estados
    const emptyStateConfig = {
        default: {
            icon: 'mdi-airplane-off',
            title: 'Nenhuma viagem encontrada',
            description: 'Comece adicionando sua primeira história de viagem!',
            buttonText: 'Adicionar primeira história',
            buttonColor: 'lime',
            buttonVariant: 'outlined',
            buttonIcon: 'mdi-map-marker-plus-outline'
        },
        noResults: {
            icon: 'mdi-magnify-close',
            title: 'Nenhuma viagem encontrada',
            description: 'Tente ajustar os termos de busca',
            buttonText: 'Limpar busca',
            buttonColor: 'lime',
            buttonVariant: 'text',
            buttonIcon: 'mdi-refresh'
        }
    }

    const getEmptyStateConfig = (isNoResults = false) => {
        return isNoResults ? emptyStateConfig.noResults : emptyStateConfig.default
    }

    return {
        // Estados de exibição
        showLoading,
        showTripList,
        showEmptyState,
        showNoResults,
        showSearchField,
        showResultCount,
        
        // Configurações
        getEmptyStateConfig,
        emptyStateConfig
    }
}
