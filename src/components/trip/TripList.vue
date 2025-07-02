<template>
    <div class="d-flex flex-wrap justify-center ga-6 px-4 px-md-8 px-lg-15 mt-8">
        <TripCard v-for="trip in trips" :key="trip.id" :trip="trip" :is-expanded="expandedCards[trip.id]"
            @view-details="handleViewDetails" @toggle-expansion="$emit('toggle-expansion', $event)"
            @edit-trip="$emit('edit-trip', $event)" @delete-trip="$emit('delete-trip', $event)" />
    </div>

    <!-- Dialog de detalhes da viagem -->
    <TripDetailsDialog v-model="showDetailsDialog" :trip="selectedTrip" @edit-trip="handleEditFromDetails"
        @delete-trip="handleDeleteFromDetails" />
</template>

<script setup>
import { ref } from 'vue'
import TripCard from './TripCard.vue'
import TripDetailsDialog from './TripDetailsDialog.vue'

defineProps({
    trips: {
        type: Array,
        required: true
    },
    expandedCards: {
        type: Object,
        default: () => ({})
    }
})

const emit = defineEmits(['view-details', 'toggle-expansion', 'edit-trip', 'delete-trip'])

// Estado do dialog de detalhes
const showDetailsDialog = ref(false)
const selectedTrip = ref(null)

// Handlers para o dialog de detalhes
const handleViewDetails = (trip) => {
    selectedTrip.value = trip
    showDetailsDialog.value = true
    emit('view-details', trip)
}

const handleEditFromDetails = (trip) => {
    showDetailsDialog.value = false
    emit('edit-trip', trip)
}

const handleDeleteFromDetails = (trip) => {
    showDetailsDialog.value = false
    emit('delete-trip', trip)
}
</script>
