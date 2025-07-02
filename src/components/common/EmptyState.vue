<template>
    <div class="d-flex flex-column align-center mt-16">
        <v-icon size="100" color="grey" class="mb-4">{{ icon }}</v-icon>
        <h3 class="text-h5 text-grey mb-2">{{ title }}</h3>
        <p class="text-body-1 text-grey">{{ description }}</p>
        <v-btn v-if="showButton"
            :color="buttonColor" 
            :variant="buttonVariant" 
            :prepend-icon="buttonIcon" 
            @click="$emit('action')"
            class="mt-4">
            {{ buttonText }}
        </v-btn>
    </div>
</template>

<script setup>
defineProps({
    icon: {
        type: String,
        default: 'mdi-airplane-off'
    },
    title: {
        type: String,
        default: 'Nenhuma viagem encontrada'
    },
    description: {
        type: String,
        default: 'Comece adicionando sua primeira história de viagem!'
    },
    showButton: {
        type: Boolean,
        default: true
    },
    buttonText: {
        type: String,
        default: 'Adicionar primeira história'
    },
    buttonColor: {
        type: String,
        default: 'lime'
    },
    buttonVariant: {
        type: String,
        default: 'outlined'
    },
    buttonIcon: {
        type: String,
        default: 'mdi-plus'
    }
})

defineEmits(['action'])
</script>
