// import Vue from "vue";
import { ActionContext } from "vuex";
import { User, ChartState } from "@src/constants";
import { RootState } from "../index";

/*************************************************
 * STATE
 */
const state: ChartState = {
  isLoading: false,

  chartData: [] as Array<User>,
};

/*************************************************
 * GETTERS
 */
const getters = {};

/*************************************************
 * GETTERS
 */
const actions = {
  loadUserListOrigin({
    commit,
    rootState,
  }: ActionContext<ChartState, RootState>) {
    commit("initChartData", rootState.user.userListOrigin);
  },
};

/*************************************************
 * MUTATIONS
 */
const mutations = {
  initChartData(state: ChartState, data: Array<User>) {
    state.chartData = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
