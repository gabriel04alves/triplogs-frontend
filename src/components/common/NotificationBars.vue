<template>
    <div>
        <!-- Success Messages -->
        <v-snackbar v-model="showSuccessMessage" 
            color="success" 
            :timeout="successTimeout">
            {{ successMessage }}
        </v-snackbar>

        <!-- Error Messages -->
        <v-snackbar v-model="showErrorMessage" 
            color="error" 
            :timeout="errorTimeout">
            {{ errorMessage }}
        </v-snackbar>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    errorMessage: {
        type: String,
        default: ''
    },
    successMessage: {
        type: String,
        default: ''
    },
    showErrorMessage: {
        type: Boolean,
        default: false
    },
    showSuccessMessage: {
        type: Boolean,
        default: false
    },
    successTimeout: {
        type: Number,
        default: 3000
    },
    errorTimeout: {
        type: Number,
        default: 5000
    }
})

const emit = defineEmits(['update:showErrorMessage', 'update:showSuccessMessage'])

const showSuccessMessage = computed({
    get: () => props.showSuccessMessage,
    set: (value) => emit('update:showSuccessMessage', value)
})

const showErrorMessage = computed({
    get: () => props.showErrorMessage,
    set: (value) => emit('update:showErrorMessage', value)
})
</script>
