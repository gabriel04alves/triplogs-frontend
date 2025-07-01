import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify"; // Certifique-se de que o Vuetify está importado corretamente

import "./assets/css/variables.css";
import "./assets/css/main.css";

import { useThemeStore } from "./store/themeStore";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(vuetify);

app.mount("#app");

const themeStore = useThemeStore();
themeStore.applyTheme();
