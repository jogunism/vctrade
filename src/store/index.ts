import Vue from "vue";
import Vuex from "vuex";
import persistedState from "vuex-persistedstate"; // use localstorage

import user from "./modules/user.module";
import chart from "./modules/chart.module";

import { UserState, ChartState } from "@src/constants";

Vue.use(Vuex);

export interface RootState {
  user: UserState;
  chart: ChartState;
}

export default new Vuex.Store({
  modules: {
    user,
    chart,
  },
  plugins: [
    persistedState({
      key: "vcTrade",
      storage: window.localStorage,
      paths: ["user.userList", "user.userListOrigin", "user.filter"],
    }),
  ],
});
