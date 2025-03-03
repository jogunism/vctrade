// UserState
import Vue from "vue";
import { services } from "@store/api";
import {
  User, //
  UserState,
  UserListFetchParameters,
  UserListFilterParameter,
  UserListFilter,
} from "@src/constants";
import { capitalizeFirstLetter } from "@utils/string.utils";

const state: UserState = {
  isLoading: false,
  userListOrigin: [],
  userList: [],
  filter: {},
};

const getters = {
  isLoading: (state: UserState) => state.isLoading,
  userList: (state: UserState) => state.userList,
  filter: (state: UserState) => state.filter,
};

const actions = {
  async fetchUserList(
    { commit }: { commit: Function },
    args: UserListFetchParameters
  ) {
    commit("changeLoadingStatus", true);
    try {
      const userList = await services.user.fetchUserList(args);
      commit("fetchUserList", userList);
    } catch (e) {
      console.error("Error fetching user list in action:", e);
    }
    commit("changeLoadingStatus", false);
  },

  resetUserList(
    { commit, dispatch }: { commit: Function; dispatch: Function },
    args: UserListFetchParameters
  ) {
    commit("emptyUserList");

    dispatch("fetchUserList", args);
  },

  toggleFavorite({ commit }: { commit: Function }, userId: string) {
    commit("toggleFavorite", userId);
  },

  filterUserList(
    { commit, state }: { commit: Function; state: UserState },
    filter: UserListFilterParameter
  ) {
    const _filter = { ...state.filter };
    switch (filter.id) {
      case "favorite":
        _filter.favorite = filter.value !== "all";
        break;
      case "gender":
        _filter.gender = filter.value !== "all" ? filter.value : "";
        break;
      case "name":
        _filter.name = filter.value !== "all" ? filter.value : "";
        break;
    }
    // console.log(_filter);
    commit("filterUserList", _filter);
  },
};

const mutations = {
  changeLoadingStatus(state: UserState, status: boolean) {
    state.isLoading = status;
  },

  fetchUserList(state: UserState, list: Array<User>) {
    list.map((user: User) => {
      Vue.set(user, "userId", user.email.split("@")[0]);
      Vue.set(
        user,
        "userName",
        capitalizeFirstLetter(user.name.first) +
          " " +
          capitalizeFirstLetter(user.name.last)
      );
      Vue.set(user, "isFavorite", false);
      Vue.set(user, "tags", []);
      return user;
    });
    // console.log(list);
    state.userListOrigin = state.userList.concat(list);
    state.userList = state.userListOrigin;
  },

  emptyUserList(state: UserState) {
    localStorage.removeItem("vcTrade");
    state.userList = [];
    state.userListOrigin = [];
    state.filter = {};
  },

  toggleFavorite(state: UserState, userId: string) {
    state.userList.forEach((user: User) => {
      if (user.userId === userId) {
        user.isFavorite = !user.isFavorite;
      }
    });
  },

  filterUserList(state: UserState, filter: UserListFilter) {
    const _origin = [...state.userListOrigin];
    const _filtered = _origin.filter((user: User) => {
      // console.log(user.userName);
      // console.log(
      //   !state.filter.favorite || (state.filter.favorite && user.isFavorite)
      // );
      return (
        (!filter.favorite || (filter.favorite && user.isFavorite)) &&
        (!filter.gender || (filter.gender && user.gender === filter.gender))
      );
    });

    state.filter = filter;
    state.userList = _filtered;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
