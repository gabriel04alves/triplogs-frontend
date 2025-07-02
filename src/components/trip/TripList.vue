<template>
    <div class="d-flex flex-wrap justify-center ga-6 px-4 px-md-8 px-lg-15 mt-8">
        <TripCard v-for="trip in trips" :key="trip.id" :trip="trip" :is-expanded="expandedCards[trip.id]"
            @view-details="$emit('view-details', $event)" @toggle-expansion="$emit('toggle-expansion', $event)"
            @edit-trip="$emit('edit-trip', $event)" @delete-trip="$emit('delete-trip', $event)" />
    </div>
</template>

<script setup>
import TripCard from './TripCard.vue'

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

defineEmits(['view-details', 'toggle-expansion', 'edit-trip', 'delete-trip'])
</script>
