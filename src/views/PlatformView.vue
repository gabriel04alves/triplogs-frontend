<template>
    <div class="bg-custom h-100">
        <!-- Header -->
        <PlatformHeader />

        <!-- Title and Add Button -->
        <PlatformTitle @add-trip="handleOpenAddDialog" />

        <!-- Search Field -->
        <SearchField v-if="showSearchField" v-model:search="searchQuery" :total-count="trips.length"
            :filtered-count="filteredTrips.length" @update:search="searchQuery = $event" />

        <!-- Notification Messages -->
        <NotificationBars :error-message="errorMessage" :success-message="successMessage"
            :show-error-message="showErrorMessage" :show-success-message="showSuccessMessage"
            @update:show-error-message="showErrorMessage = $event"
            @update:show-success-message="showSuccessMessage = $event" />

        <!-- Loading state -->
        <div v-if="showLoading" class="d-flex justify-center mt-16">
            <v-progress-circular indeterminate color="lime" size="64"></v-progress-circular>
        </div>

        <!-- Trip List -->
        <TripList v-else-if="showTripList" :trips="filteredTrips" :expanded-cards="expandedCards"
            @view-details="viewTripDetails" @toggle-expansion="toggleCardExpansion" @edit-trip="handleEditTrip"
            @delete-trip="handleDeleteTrip" />

        <!-- Empty state -->
        <EmptyState v-else-if="showEmptyState" v-bind="getEmptyStateConfig(false)" @action="handleOpenAddDialog" />

        <!-- No search results -->
        <EmptyState v-else-if="showNoResults" v-bind="getEmptyStateConfig(true)" @action="clearSearch" />

        <!-- Trip Form Dialog -->
        <TripFormDialog v-model="showTripDialog" :trip-data="currentTripData" :loading="loading" :is-edit="isEditMode"
            @submit="handleSubmitTrip" @cancel="handleCancelForm" />

        <!-- Delete Confirmation Dialog -->
        <DeleteTripDialog v-model="showDeleteDialog" :trip-title="tripToDelete?.title || ''" :loading="loading"
            @confirm="handleConfirmDelete" @cancel="handleCancelDelete" />
    </div>
</template>

<script setup>
// Components
import PlatformHeader from '../components/platform/PlatformHeader.vue'
import PlatformTitle from '../components/platform/PlatformTitle.vue'
import SearchField from '../components/platform/SearchField.vue'
import TripList from '../components/trip/TripList.vue'
import TripFormDialog from '../components/trip/TripFormDialog.vue'
import DeleteTripDialog from '../components/trip/DeleteTripDialog.vue'
import EmptyState from '../components/common/EmptyState.vue'
import NotificationBars from '../components/common/NotificationBars.vue'

// Composables
import { usePlatform } from '../composables/usePlatform'

// Usar o composable principal que centraliza toda a lógica
const {
    // Estado das viagens
    trips,
    loading,
    searchQuery,
    filteredTrips,
    clearSearch,

    // Estado das notificações
    errorMessage,
    successMessage,
    showErrorMessage,
    showSuccessMessage,

    // Estado dos diálogos
    showTripDialog,
    currentTripData,
    isEditMode,
    showDeleteDialog,
    tripToDelete,

    // Estado dos cards
    expandedCards,
    toggleCardExpansion,
    viewTripDetails,

    // Layout states
    showLoading,
    showTripList,
    showEmptyState,
    showNoResults,
    showSearchField,
    getEmptyStateConfig,

    // Handlers
    handleOpenAddDialog,
    handleEditTrip,
    handleDeleteTrip,
    handleSubmitTrip,
    handleCancelForm,
    handleConfirmDelete,
    handleCancelDelete
} = usePlatform()
</script>

<style scoped>
.bg-custom {
    background-color: var(--color-bg-light);
}

/* Animação suave para o loading */
.v-progress-circular {
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}
</style>