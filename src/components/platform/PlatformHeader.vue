<template>
    <div class="d-flex justify-space-between py-6 px-15">
        <v-btn icon to="/" variant="plain" class="no-decoration">
            <v-icon class="" color="white" size="50">mdi-compass</v-icon>
        </v-btn>

        <v-menu>
            <template v-slot:activator="{ props }">
                <v-btn class="no-decoration text-none text-h6" size="large" color="white" variant="plain"
                    ripple="false" v-bind="props">
                    {{ authStore.user?.name || authStore.user?.email || 'Usuário' }}
                    <v-icon end>mdi-chevron-down</v-icon>
                </v-btn>
            </template>

            <v-list class="d-flex flex-column ga-1 mt-5 py-1 px-1 rounded-xl" bg-color="grey-darken-4"
                elevation="6">
                <v-list-item class="text-red" prepend-icon="mdi-logout" title="Sair"
                    @click="handleLogout"></v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../store/authStore'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
    authStore.logout()
    router.push('/')
}
</script>
