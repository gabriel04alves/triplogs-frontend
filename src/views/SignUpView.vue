<template>
    <div class="bg-custom d-flex align-center h-100">
        <Loading :loading="redirecting" />

        <v-card class="mx-auto pa-16 w-100" color="grey-darken-4" elevation="6" max-width="448" rounded="lg">
            <div class="d-flex w-fill justify-center mb-5">
                <v-btn icon to="/" variant="plain" class="no-decoration">
                    <v-icon class="" color="white" size="50">mdi-compass</v-icon>
                </v-btn>
            </div>
            <v-container>
                <v-form @submit.prevent="handleSignUp" ref="form">
                    <v-text-field v-model="name" :rules="nameRules" density="compact" color="lime" label="Nome"
                        prepend-inner-icon="mdi-account" variant="outlined" class="mb-4" required>
                    </v-text-field>

                    <v-text-field v-model="email" :rules="emailRules" density="compact" color="lime" label="Email"
                        prepend-inner-icon="mdi-email-outline" variant="outlined" class="mb-4" required>
                    </v-text-field>

                    <v-text-field v-model="password" :rules="passwordRules"
                        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                        density="compact" color="lime" label="Senha" placeholder="Digite a sua senha"
                        prepend-inner-icon="mdi-lock-outline" variant="outlined" class="mb-4" required
                        @click:append-inner="visible = !visible">
                    </v-text-field>

                    <v-checkbox v-model="terms" :rules="termsRules" color="lime"
                        label="Concordo com os termos e condições do site" required>
                    </v-checkbox>

                    <v-alert v-if="authStore.error" type="error" variant="tonal" class="mb-4" closable
                        @click:close="authStore.clearError()">
                        {{ authStore.error }}
                    </v-alert>

                    <v-alert v-if="successMessage" type="success" variant="tonal" class="mb-4">
                        {{ successMessage }}
                    </v-alert>
                </v-form>
            </v-container>

            <v-divider class="my-4"></v-divider>

            <v-card-actions>
                <v-btn @click="handleSignUp" color="lime-accent-3" size="large" variant="tonal" block
                    :loading="authStore.loading" :disabled="!isFormValid">
                    Finalizar
                    <v-icon icon="mdi-chevron-right" end></v-icon>
                </v-btn>
            </v-card-actions>

            <v-card-text class="text-center">
                <router-link class="text-lime-accent-3 text-decoration-none" to="/login">
                    Já tem uma conta? Faça login <v-icon icon="mdi-chevron-right"></v-icon>
                </router-link>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/authStore'
import Loading from '../components/Loading.vue'
import {
    nameRules,
    emailRules,
    passwordRules,
    termsRules,
    isSignUpFormValid,
    sanitizeUserData
} from '../validators/auth/validationsSignUp'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const terms = ref(false)
const visible = ref(false)
const form = ref(null)
const successMessage = ref('')
const redirecting = ref(false)

const isFormValid = computed(() => {
    return isSignUpFormValid(name.value, email.value, password.value, terms.value)
})

const handleSignUp = async () => {
    if (!isFormValid.value) {
        return
    }

    const userData = sanitizeUserData({
        name: name.value,
        email: email.value,
        password: password.value
    })

    const result = await authStore.register(userData)

    if (result.success) {
        successMessage.value = result.message || 'Conta criada com sucesso! Redirecionando para o login...'

        name.value = ''
        email.value = ''
        password.value = ''
        terms.value = false

        redirecting.value = true

        setTimeout(() => {
            router.push('/login')
        }, 1000)
    }
}
</script>

<style scoped>
.bg-custom {
    background-color: var(--color-bg-light);
}
</style>