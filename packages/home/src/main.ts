import { createApp } from "vue";
import "./registerServiceWorker";
import App from "./App.vue";

const app = createApp(App);
app.mount("#app");
