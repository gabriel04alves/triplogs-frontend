<template>
    <v-card class="mx-auto rounded-xl trip-card" color="grey-darken-4" width="100%" max-width="350" hover elevation="4">
        <v-img height="200px" :src="trip.photo" cover @error="handleImageError">
        </v-img>

        <v-card-title class="mt-2">
            <v-icon>mdi-airplane</v-icon>
            {{ trip.title }}
        </v-card-title>

        <v-card-subtitle>
            <v-icon>mdi-map</v-icon>
            {{ trip.location }}
        </v-card-subtitle>

        <v-card-actions>
            <v-btn color="lime" text="Explorar" @click="$emit('view-details', trip)">
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn :icon="isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="$emit('toggle-expansion', trip.id)">
            </v-btn>
        </v-card-actions>

        <v-expand-transition>
            <div v-show="isExpanded">
                <v-divider></v-divider>

                <div class="d-flex flex-column ga-3 pa-5" color="grey-darken-4">
                    <div class="d-flex align-center ga-2">
                        <v-icon color="lime">mdi-calendar-range</v-icon>
                        <span class="text-caption">{{ formatDate(trip.trip_date) }}</span>
                    </div>
                    <div class="d-flex align-start ga-2">
                        <v-icon color="lime" style="margin-top: 2px;">mdi-text</v-icon>
                        <span class="text-body-2">{{ trip.description }}</span>
                    </div>
                    <div class="d-flex justify-end mt-2">
                        <v-btn size="large" color="lime" variant="plain" icon="mdi-pencil"
                            @click="$emit('edit-trip', trip)">

                        </v-btn>
                        <v-btn size="large" color="red" variant="plain" icon="mdi-delete"
                            @click="$emit('delete-trip', trip)">

                        </v-btn>
                    </div>
                </div>
            </div>
        </v-expand-transition>
    </v-card>
</template>

<script setup>
const props = defineProps({
    trip: {
        type: Object,
        required: true
    },
    isExpanded: {
        type: Boolean,
        default: false
    }
})

defineEmits(['view-details', 'toggle-expansion', 'edit-trip', 'delete-trip'])

const handleImageError = (event) => {
    event.target.src = 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
}

const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
}
</script>

<style scoped>
.trip-card {
    transition: all 0.3s ease;
}

.trip-card:hover {
    transform: translateY(-4px);
}

.trip-card .v-img {
    transition: all 0.3s ease;
}

.trip-card:hover .v-img {
    transform: scale(1.05);
}
</style>
