import { createSSRApp } from "vue";
import { createMemoryHistory } from "vue-router";
import createRouter from "./router";
import App from "./App.vue";

export default function () {
  const app = createSSRApp(App);
  const router = createRouter(createMemoryHistory("/mobile/"));

  app.use(router);

  return {
    app,
    router,
  };
}
