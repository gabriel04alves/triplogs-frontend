import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify"; // Certifique-se de que o Vuetify está importado corretamente

import "./assets/css/variables.css";
import "./assets/css/main.css";

import { useThemeStore } from "./store/themeStore";
import { useAuthStore } from "./store/authStore";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(vuetify);

app.mount("#app");

// Inicializar stores
const themeStore = useThemeStore();
const authStore = useAuthStore();

themeStore.applyTheme();

// Verificar autenticação ao inicializar a aplicação
authStore.checkAuth();
