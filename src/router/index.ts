import Vue from "vue";
import Router from "vue-router";

import UserList from "../components/UserList.vue";
import HelloWorld from "../components/HelloWorld.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "userlist",
      component: UserList,
    },
    {
      path: "/hello",
      name: "hello",
      component: HelloWorld,
    },
  ],
});
