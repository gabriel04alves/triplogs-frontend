<template>
    <div class="bg-custom d-flex align-center h-100">
        <v-card class="mx-auto pa-16 w-100" color="grey-darken-4" elevation="6" max-width="448" rounded="lg">
            <div class="d-flex w-fill justify-center mb-5">
                <v-btn icon to="/" variant="plain" class="no-decoration">
                    <v-icon class="" color="white" size="50">mdi-compass</v-icon>
                </v-btn>
            </div>

            <div class="text-subtitle-1">Conta</div>

            <v-text-field density="compact" placeholder="Email address" prepend-inner-icon="mdi-email-outline"
                variant="outlined"></v-text-field>

            <div class="text-subtitle-1 d-flex align-center justify-space-between">
                Senha

                <!-- <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer"
                    target="_blank">
                    Forgot login password?</a> -->
            </div>

            <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                density="compact" placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline"
                variant="outlined" @click:append-inner="visible = !visible"></v-text-field>

            <!-- <v-card class="mb-12" color="surface-variant" variant="tonal">
                <v-card-text class="text-caption">
                    Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three
                    hours. If you must login now, you can also click "Forgot login password?" below to reset the login
                    password.
                </v-card-text>
            </v-card> -->

            <v-btn class="mb-8" color="lime-accent-3" size="large" variant="tonal" block>
                Log In
            </v-btn>

            <v-card-text class="text-center">
                <router-link class="text-lime-accent-3 text-decoration-none" to="/signup" rel="noopener noreferrer"
                    target="_blank">
                    Criar uma conta <v-icon icon="mdi-chevron-right"></v-icon>
                </router-link>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>

<style scoped>
.bg-custom {
    background-color: var(--color-bg-light);
}
</style>