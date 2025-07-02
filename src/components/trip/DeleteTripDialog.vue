<template>
    <v-dialog v-model="dialogVisible" max-width="400px">
        <v-card class="rounded-xl bg-grey-darken-4">
            <v-card-text class="pa-6">
                <div class="d-flex align-center ga-3 mb-4">
                    <v-icon color="red" size="32">mdi-alert-circle</v-icon>
                    <h3 class="text-h6">Confirmar Exclusão</h3>
                </div>
                
                <p>Tem certeza que deseja excluir a viagem <strong>"{{ tripTitle }}"</strong>?</p>
                <p class="text-caption text-grey mt-2">Esta ação não pode ser desfeita.</p>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn color="grey" 
                    variant="plain" 
                    @click="handleCancel" 
                    :disabled="loading">
                    Cancelar
                </v-btn>
                <v-btn color="red" 
                    variant="plain" 
                    @click="handleConfirm" 
                    :loading="loading"
                    prepend-icon="mdi-delete">
                    Excluir
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    tripTitle: {
        type: String,
        default: ''
    },
    loading: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const dialogVisible = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

const handleConfirm = () => {
    emit('confirm')
}

const handleCancel = () => {
    emit('cancel')
}
</script>
