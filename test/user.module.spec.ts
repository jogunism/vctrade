import module from "../src/store/modules/user.module";
import { User } from "../src/constants";

describe("User Store State Initialization", () => {
  it("should initialize with the correct default values", () => {
    expect(module.state.isLoading).toBe(false);
    expect(module.state.userListOrigin).toEqual([]);
    expect(module.state.userList).toEqual([]);
    expect(module.state.filter).toEqual({});
    expect(module.state.currentUser).toEqual({});
  });
});

describe("User Store Getters", () => {
  let userList: Array<User>;

  beforeEach(() => {
    userList = [
      {
        userId: "ryan.kumar",
        email: "ryan.kumar@example.com",
        isFavorite: true,
        gender: "male",
      },
      {
        userId: "rose.woods",
        email: "rose.woods@example.com",
        isFavorite: false,
        gender: "female",
      },
    ];
  });
  it("should return the correct userList", () => {
    module.state.userList = userList;
    expect(module.getters.userList(module.state)).toEqual(userList);
  });

  it("should return the correct loading status", () => {
    module.state.isLoading = true;
    expect(module.getters.isLoading(module.state)).toBe(true);
  });

  it("should return the correct filter", () => {
    module.state.filter = { gender: "male" };
    expect(module.getters.filter(module.state)).toEqual({
      gender: "male",
    });
  });
});

describe("User Store Mutations", () => {
  it("should change loading status correctly", () => {
    module.mutations.changeLoadingStatus(module.state, true);
    expect(module.state.isLoading).toBe(true);

    module.mutations.changeLoadingStatus(module.state, false);
    expect(module.state.isLoading).toBe(false);
  });

  it("should fetch and add user list correctly", () => {
    const moreUserList = [
      {
        userId: "filipe.kappert",
        email: "filipe.kappert@example.com",
        isFavorite: false,
        gender: "male",
      },
    ];
    module.mutations.fetchUserList(module.state, moreUserList);

    expect(module.state.userList.length).toBe(3);
    expect(module.state.userList[1].email).toBe("rose.woods@example.com");
  });

  it("should toggle favorite status for a user correctly", () => {
    module.mutations.toggleFavorite(module.state, "ryan.kumar");
    expect(module.state.userList[0].isFavorite).toBe(false);

    module.mutations.toggleFavorite(module.state, "ryan.kumar");
    expect(module.state.userList[0].isFavorite).toBe(true);
  });

  it("should filter the user list correctly", () => {
    module.mutations.filterUserList(module.state, { gender: "male" });
    expect(module.state.userList.length).toBe(2);
    expect(module.state.userList[0].userId).toBe("ryan.kumar");
  });
});
