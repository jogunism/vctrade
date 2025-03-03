// User Service

import axios, { AxiosResponse } from "@lib/http";
import { UserListFetchParameters, UserListFetchResults } from "@src/constants";

export default {
  async fetchUserList(args: UserListFetchParameters) {
    try {
      const response: AxiosResponse<UserListFetchResults> =
        await axios.get<UserListFetchResults>("/", {
          params: { ...args },
        });
      return response.data.results;
    } catch (e) {
      console.error("Error fetching user list:", e);
      throw e;
    }
  },
};
