import Vue from "vue";
import Router from "vue-router";

import UserList from "../components/UserList.vue";
import UserChart from "../components/UserChart.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "list",
      component: UserList,
    },
    {
      path: "/chart",
      name: "chart",
      component: UserChart,
    },
  ],
});
