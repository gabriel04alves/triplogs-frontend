<template>
    <v-dialog v-model="dialogVisible" max-width="600px" persistent>
        <v-card class="rounded-xl" color="grey-darken-4">
            <v-card-title class="d-flex text-h5 font-weight-light pt-8 px-5">
                <v-icon class="mr-2" color="lime">
                    {{ isEdit ? 'mdi-map-outline' : 'mdi-map-marker-plus' }}
                </v-icon>
                {{ isEdit ? 'Editar História' : 'Nova História de Viagem' }}
            </v-card-title>

            <v-card-text class="px-6">
                <v-form ref="formRef" @submit.prevent="handleSubmit">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field color="lime" v-model="formData.title" label="Título da viagem *"
                                :rules="validationRules.title" prepend-inner-icon="mdi-airplane" variant="outlined"
                                required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-text-field color="lime" v-model="formData.location" label="Roteiro *"
                                :rules="validationRules.location" prepend-inner-icon="mdi-map" variant="outlined"
                                required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-text-field color="lime" v-model="formData.trip_date" label="Data da viagem *"
                                :rules="validationRules.trip_date" type="date" prepend-inner-icon="mdi-calendar-start"
                                variant="outlined" required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-text-field color="lime" clearable label="URL da Foto" variant="outlined"
                                v-model="formData.photo" prepend-icon="mdi-camera"
                                placeholder="https://exemplo.com/sua-imagem.jpg" :rules="validationRules.photo" />
                        </v-col>

                        <v-col cols="12">
                            <v-textarea color="lime" v-model="formData.description" label="Descrição *"
                                :rules="validationRules.description" prepend-inner-icon="mdi-text" variant="outlined"
                                rows="3" required hint="Conte sua história de viagem">
                            </v-textarea>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>

            <v-card-actions class="pb-5 px-5">
                <v-spacer></v-spacer>
                <v-btn class="text-none" color="red" variant="plain" @click="handleCancel" :disabled="loading">
                    Cancelar
                </v-btn>
                <v-btn class="text-none" color="lime" variant="plain" @click="handleSubmit" :loading="loading">
                    {{ isEdit ? 'Salvar Alterações' : 'Salvar História' }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { tripValidationRules } from '../../validators/trip/validationsTrip'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    tripData: {
        type: Object,
        default: () => ({
            title: '',
            location: '',
            description: '',
            trip_date: '',
            photo: ''
        })
    },
    loading: {
        type: Boolean,
        default: false
    },
    isEdit: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue', 'submit', 'cancel'])

const formRef = ref(null)
const validationRules = tripValidationRules

const formData = ref({ ...props.tripData })

const dialogVisible = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
})

// Watch for changes in tripData prop to update form
watch(() => props.tripData, (newData) => {
    formData.value = { ...newData }
}, { deep: true })

const handleSubmit = async () => {
    if (!formRef.value) return

    const { valid } = await formRef.value.validate()
    if (!valid) return

    emit('submit', { ...formData.value })
}

const handleCancel = () => {
    emit('cancel')
}
</script>
