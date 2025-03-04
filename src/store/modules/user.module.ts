import Vue from "vue";
import { services } from "@store/api";
// Utils
import { capitalizeFirstLetter } from "@utils/string.utils";
// Constants
import {
  User,
  UserState,
  UserListFetchParameters,
  UserListFilterParameter,
  UserListFilter,
} from "@src/constants";

/*************************************************
 * STATE
 */
const state: UserState = {
  isLoading: false,
  userListOrigin: [],
  userList: [] as Array<User>,
  filter: {} as UserListFilter,

  currentUser: {} as User,
};

/*************************************************
 * GETTERS
 */
const getters = {
  isLoading: (state: UserState) => state.isLoading,
  userList: (state: UserState) => state.userList,
  filter: (state: UserState) => state.filter,

  currentUser: (state: UserState) => state.currentUser,
};

/*************************************************
 * ACTIONS
 */
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
        _filter.favorite = filter.value === "true";
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

  getUserDetail({ commit }: { commit: Function }, userId: string) {
    commit("getUserDetail", userId);
  },

  addUserTag({ commit }: { commit: Function }, tag: string) {
    commit("addUserTag", tag);
  },
  deleteUserTag({ commit }: { commit: Function }, index: number) {
    commit("deleteUserTag", index);
  },
};

/*************************************************
 * MUTATIONS
 */
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
        capitalizeFirstLetter(user.name?.first ?? "") +
          " " +
          capitalizeFirstLetter(user.name?.last ?? "")
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
      return (
        (!filter.favorite || (filter.favorite && user.isFavorite)) &&
        (!filter.gender || (filter.gender && user.gender === filter.gender)) &&
        (!filter.name ||
          (filter.name &&
            user.userName?.toLocaleLowerCase().includes(filter.name)))
      );
    });

    state.filter = filter;
    state.userList = _filtered;
  },

  getUserDetail(state: UserState, userId: string) {
    const _list = [...state.userList];

    const _userList = _list.filter((user: User) => {
      return user.userId === userId;
    });

    state.currentUser = _userList[0] ?? ({} as User);
  },

  addUserTag(state: UserState, tag: string) {
    state.currentUser.tags?.push(tag);
  },
  deleteUserTag(state: UserState, index: number) {
    state.currentUser.tags?.splice(index, 1);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
