import Vue from "vue";
import Vuex from "vuex";
import persistedState from "vuex-persistedstate"; // use localstorage

import user from "./modules/user.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
  },
  plugins: [
    persistedState({
      key: "vcTrade",
      storage: window.localStorage,
      paths: ["user.userList", "user.userListOrigin", "user.filter"],
    }),
  ],
});
