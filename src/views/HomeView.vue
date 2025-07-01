<template>
    <v-parallax height="100vh" src="../../public/img0001.jpg" gradient="rgba(0,0,0,0.69)" cover>
        <v-icon class="px-16 pt-10" color="white" size="50">mdi-compass</v-icon>
        <!-- <HeaderComponent /> -->
        <div class="d-flex fill-height">
            <div class="d-flex justify-space-between align-end w-100 pa-16 mb-16">
                <div>
                    <h1 class="text-white text-h2 font-weight-medium">Registre suas novas aventuras</h1>
                    <h2 class="text-grey-lighten-1 text-h4 font-weight-light">Planeje viagens, explore destinos e salve
                        experiências
                        inesquecíveis.</h2>
                </div>
                <v-btn class="rounded-xl text-none text-h5 font-weight-medium" color="var(--color-accent-light)"
                    size="large">Começar</v-btn>
            </div>
        </div>
    </v-parallax>

</template>

<script setup>
import HeaderComponent from '../components/HeaderComponent.vue';

</script>

<style>
::-webkit-scrollbar {
    display: none;
}
</style>