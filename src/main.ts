import Vue, { VNode } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  render: (h): VNode => h(App),
  store,
  router,
}).$mount("#app");
