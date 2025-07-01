<template>
  <v-btn @click="switchTheme" variant="text" :ripple="false" color="var(--color-accent-light)"
    :icon="themeStore.currentTheme === 'dark' ? 'mdi-weather-night' : 'mdi-white-balance-sunny'">
  </v-btn>

</template>

<script>
import { useThemeStore } from "../store/themeStore";
import { RouterLink } from "vue-router";

export default {
  setup() {
    const themeStore = useThemeStore();
    return {
      themeStore,
      switchTheme: themeStore.switchTheme,
    };
  },
  components: { RouterLink },
};
</script>

<style scoped>
div {
  background-color: var(--color-bg-light);
}
</style>