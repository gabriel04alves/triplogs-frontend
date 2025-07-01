<template>
    <div class="bg-custom d-flex align-center h-100">
        <v-card class="mx-auto pa-16 w-100" color="grey-darken-4" elevation="6" max-width="448" rounded="lg">
            <div class="d-flex w-fill justify-center mb-5">
                <v-btn icon to="/" variant="plain" class="no-decoration">
                    <v-icon class="" color="white" size="50">mdi-compass</v-icon>
                </v-btn>
            </div>
            <v-container>
                <v-text-field v-model="first" density="compact" color="lime" label="Nome"
                    prepend-inner-icon="mdi-account" variant="outlined" class="mb-4"></v-text-field>

                <v-text-field v-model="email" density="compact" color="lime" label="Email"
                    prepend-inner-icon="mdi-email-outline" variant="outlined" class="mb-4"></v-text-field>

                <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'" density="compact" color="lime" label="Senha"
                    placeholder="Digite a sua senha" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                    class="mb-4" @click:append-inner="visible = !visible"></v-text-field>

                <v-checkbox v-model="terms" color="lime" label="Concordo com os termos e condições do site"
                    class=""></v-checkbox>
            </v-container>

            <v-divider class="my-4"></v-divider>

            <v-card-actions>
                <v-btn color="lime-accent-3" size="large" variant="tonal" block>
                    Finalizar
                    <v-icon icon="mdi-chevron-right" end></v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router';

const first = ref(null)
const last = ref(null)
const email = ref(null)
const password = ref(null)
const terms = ref(false)
const visible = ref(false)
</script>

<style scoped>
.bg-custom {
    background-color: var(--color-bg-light);
}
</style>