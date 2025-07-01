<template>
    <div class="bg-custom d-flex align-center h-100">
        <v-card class="mx-auto pa-16 w-100" color="grey-darken-4" elevation="6" max-width="448" rounded="lg">
            <div class="d-flex w-fill justify-center mb-5">
                <v-btn icon to="/" variant="plain" class="no-decoration">
                    <v-icon class="" color="white" size="50">mdi-compass</v-icon>
                </v-btn>
            </div>

            <div class="text-subtitle-1">Conta</div>

            <v-form @submit.prevent="handleLogin" ref="form">
                <v-text-field v-model="email" :rules="emailRules" density="compact" placeholder="Email address"
                    prepend-inner-icon="mdi-email-outline" variant="outlined" required :error-messages="emailError">
                </v-text-field>

                <div class="text-subtitle-1 d-flex align-center justify-space-between">
                    Senha
                </div>

                <v-text-field v-model="password" :rules="passwordRules"
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                    density="compact" placeholder="Digite a sua senha" prepend-inner-icon="mdi-lock-outline"
                    variant="outlined" required :error-messages="passwordError"
                    @click:append-inner="visible = !visible">
                </v-text-field>

                <v-alert v-if="authStore.error" type="error" variant="tonal" class="mb-4" closable
                    @click:close="authStore.clearError()">
                    {{ authStore.error }}
                </v-alert>

                <v-btn type="submit" class="mb-8" color="lime-accent-3" size="large" variant="tonal" block
                    :loading="authStore.loading" :disabled="!isFormValid">
                    Log In
                </v-btn>
            </v-form>

            <v-card-text class="text-center">
                <router-link class="text-lime-accent-3 text-decoration-none" to="/signup">
                    Criar uma conta <v-icon icon="mdi-chevron-right"></v-icon>
                </router-link>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/authStore'
import { emailRules, passwordRules, validateField } from '../validators/auth/validationsLogin'

const router = useRouter()
const authStore = useAuthStore()

const visible = ref(false)
const email = ref('')
const password = ref('')
const form = ref(null)

const emailError = computed(() => validateField(email.value, emailRules))

const passwordError = computed(() => validateField(password.value, passwordRules))

const isFormValid = computed(() => {
    return email.value &&
        password.value &&
        emailError.value.length === 0 &&
        passwordError.value.length === 0
})

const handleLogin = async () => {
    if (!isFormValid.value) return

    const result = await authStore.login(email.value, password.value)

    if (result.success) {
        router.push('/platform')
    }
}
</script>

<style scoped>
.bg-custom {
    background-color: var(--color-bg-light);
}
</style>