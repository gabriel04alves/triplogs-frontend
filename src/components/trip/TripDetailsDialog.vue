<template>
    <v-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" max-width="600">
        <v-card class="rounded-xl" color="grey-darken-4">
            <div class="position-relative">
                <v-img height="300" :src="trip?.photo" cover @error="handleImageError">
                </v-img>
                <div class="position-absolute top-0 right-0 pa-4">
                    <v-btn icon="mdi-close" color="white" variant="text" @click="$emit('update:modelValue', false)">
                    </v-btn>
                </div>
            </div>

            <v-card-title class="d-flex align-center ga-2 pt-6 pb-2">
                <v-icon color="lime">mdi-airplane</v-icon>
                <span class="text-h5">{{ trip?.title }}</span>
            </v-card-title>

            <v-card-text class="pb-6">
                <div class="d-flex align-center ga-2 mb-4">
                    <v-icon color="lime">mdi-map</v-icon>
                    <span class="text-h6">{{ trip?.location }}</span>
                </div>

                <div class="d-flex align-center ga-2 mb-4">
                    <v-icon color="lime">mdi-calendar-range</v-icon>
                    <span class="text-body-1">{{ formatDate(trip?.trip_date) }}</span>
                </div>

                <div class="d-flex align-start ga-2">
                    <v-icon color="lime" style="margin-top: 2px;">mdi-text</v-icon>
                    <div class="flex-grow-1">
                        <span class="text-body-1 d-block text-pre-wrap">{{ trip?.description }}</span>
                    </div>
                </div>
            </v-card-text>

            <v-card-actions class="px-6 pb-6">
                <v-spacer></v-spacer>
                <v-btn class="text-none" color="lime" variant="plain" @click="$emit('edit-trip', trip)">
                    <v-icon start>mdi-pencil</v-icon>
                    Editar
                </v-btn>
                <v-btn class="text-none" color="red" variant="plain" @click="$emit('delete-trip', trip)">
                    <v-icon start>mdi-delete</v-icon>
                    Excluir
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    trip: {
        type: Object,
        default: null
    }
})

defineEmits(['update:modelValue', 'edit-trip', 'delete-trip'])

const handleImageError = (event) => {
    event.target.src = 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
}

const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}
</script>

<style scoped>
.position-relative {
    position: relative;
}

.position-absolute {
    position: absolute;
}

.top-0 {
    top: 0;
}

.right-0 {
    right: 0;
}

.text-pre-wrap {
    white-space: pre-wrap;
}
</style>
