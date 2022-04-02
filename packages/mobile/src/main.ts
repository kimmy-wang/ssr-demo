import { createApp } from "vue";
import { createWebHistory } from "vue-router";
import "./registerServiceWorker";
import App from "./App.vue";
import createRouter from "./router";

const app = createApp(App);
const router = createRouter(createWebHistory("/mobile/"));

app.use(router);

router.isReady().then(() => {
  app.mount("#app");
});
