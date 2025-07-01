<template>
    <div class="bg-custom h-100">
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
                    <!-- <v-list-item prepend-icon="mdi-account" title="Perfil" @click="showProfile = true"></v-list-item> -->
                    <v-list-item class="text-red" prepend-icon="mdi-logout" title="Sair"
                        @click="handleLogout"></v-list-item>
                </v-list>
            </v-menu>

        </div>
        <div class="d-flex justify-space-between px-15 mt-16">
            <h1 class="text-h4 text-white font-weight-regular">Meus Destinos</h1>
            <div>
                <v-btn class="icon text-none text-h6 font-weight-medium" append-icon="mdi-map-marker-plus-outline"
                    color="lime" text="Adicionar história" variant="plain" size="large" ripple="false">
                </v-btn>
            </div>
        </div>
        <div class="d-flex flex-wrap justify-center ga-16">
            <v-card class="mx-auto rounded-xl" color="grey-darken-4" width="300">
                <v-img height="200px" src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-img>

                <v-card-title>
                    <v-icon>mdi-airplane</v-icon>
                    title
                </v-card-title>

                <v-card-subtitle>
                    <v-icon>mdi-map</v-icon>
                    location
                </v-card-subtitle>

                <v-card-actions>
                    <v-btn color="lime" text="Explore"></v-btn>

                    <v-spacer></v-spacer>

                    <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
                </v-card-actions>

                <v-expand-transition>
                    <div v-show="show">
                        <v-divider></v-divider>


                        <div class="d-flex flex-column ga-3 pa-5" color="grey-darken-4">
                            <div>
                                <v-icon>mdi-calendar-range</v-icon> date
                            </div>
                            <div class="">
                                ~ description
                            </div>
                        </div>
                    </div>
                </v-expand-transition>
            </v-card>
        </div>
    </div>


</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/authStore'

const router = useRouter()
const authStore = useAuthStore()
const show = ref(false)

onMounted(async () => {
    const isAuthenticated = await authStore.checkAuth()
    if (!isAuthenticated) {
        router.push('/login')
    }
})

const handleLogout = () => {
    authStore.logout()
    router.push('/')
}

</script>

<style scoped>
.bg-custom {
    background-color: var(--color-bg-light);
}
</style>