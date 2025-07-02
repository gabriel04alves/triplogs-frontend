<template>
    <div class="d-flex justify-space-between px-15 mt-10">
        <div class="d-flex align-center ga-4">
            <div class="d-flex ga-3">
                <h1 class="text-h4 text-white font-weight-regular">
                    {{ title }}
                </h1>
            </div>
        </div>
        <div>
            <v-btn class="icon text-none text-h6 font-weight-medium" 
                append-icon="mdi-map-marker-plus-outline"
                color="lime" 
                text="Adicionar história" 
                variant="plain" 
                size="large" 
                ripple="false"
                @click="$emit('add-trip')">
            </v-btn>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        default: 'Meus Destinos'
    }
})

defineEmits(['add-trip'])
</script>
