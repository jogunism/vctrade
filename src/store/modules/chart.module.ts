// import Vue from "vue";
import { ActionContext } from "vuex";
import { RootState } from "../index";
import {
  User,
  ChartData,
  ChartState,
  ChartDataset,
  DatasetType,
} from "@src/constants";

import {
  colors,
  getNationality,
  getGender,
  getAgeGroup,
  getTags,
} from "./chartDataParser";

/*************************************************
 * STATE
 */
const state: ChartState = {
  userListOrigin: [] as Array<User>,
  chartData: {
    labels: [] as Array<string>,
    datasets: [] as Array<ChartDataset>,
  } as ChartData,
};

/*************************************************
 * GETTERS
 */
const getters = {
  chartData: (state: ChartState) => state.chartData,
};

/*************************************************
 * GETTERS
 */
const actions = {
  loadUserListOrigin({
    commit,
    rootState,
  }: ActionContext<ChartState, RootState>) {
    commit("initUserData", rootState.user.userList);
  },

  drawChart({ commit }: { commit: Function }, type: string) {
    commit("makeDataset", type);
  },
};

/*************************************************
 * MUTATIONS
 */

const mutations = {
  initUserData(state: ChartState, data: Array<User>) {
    state.userListOrigin = data;
    // console.log(data);
  },

  makeDataset(state: ChartState, type: string) {
    let labels = [] as Array<string>;
    const backgroundColor = [] as Array<string>;
    const datasets = [] as Array<DatasetType>;
    const borderColor = ["#202937"];
    const borderWidth = 1;

    let _data = [] as Array<number>;

    switch (type) {
      case "country":
        const nationality = getNationality(state.userListOrigin);
        labels = nationality.natList;
        for (let i = 0; i <= labels.length; i++) {
          backgroundColor.push(colors[i]);
        }
        _data = nationality.natPercentages;
        break;

      case "gender":
        const gender = getGender(state.userListOrigin);
        labels = gender.genderList;

        for (let i = 0; i <= labels.length; i++) {
          backgroundColor.push(colors[i]);
        }
        _data = gender.genderPercentages;
        break;

      case "age":
        const age = getAgeGroup(state.userListOrigin);
        labels = age.ageGroups;
        for (let i = 0; i <= labels.length; i++) {
          backgroundColor.push(colors[i]);
        }
        _data = age.agePercentages;
        break;

      case "tags":
        const tags = getTags(state.userListOrigin);
        labels = tags.tags;
        for (let i = 0; i <= labels.length; i++) {
          backgroundColor.push(colors[i]);
        }
        _data = tags.tagPercentages;
        break;
    }

    datasets.push({
      data: _data,
      backgroundColor,
      borderColor,
      borderWidth,
    });

    state.chartData = {
      labels,
      datasets,
    };
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
