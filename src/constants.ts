/*************************************************
 * User Types
 */
export interface UserState {
  isLoading: boolean;
  userListOrigin: Array<User>;
  userList: Array<User>;
  filter: UserListFilter;

  currentUser: User;
}

export interface UserListFetchParameters {
  results: number;
}

export interface UserListFilterParameter {
  id: string;
  value: string;
}

export interface UserListFilter {
  favorite?: boolean;
  gender?: string;
  name?: string;
}

export interface UserListFetchResults {
  results: Array<User>;
}

/**
 * Randomuser API types
 */
export interface UserNameDetail {
  title: string;
  first: string;
  last: string;
}

export interface UserStreet {
  number: number;
  name: string;
}

export interface UserCoordinates {
  latitude: string;
  longitude: string;
}

export interface UserTimezone {
  offset: string;
  description: string;
}

export interface UserLocationDetail {
  street: UserStreet;
  city: string;
  state: string;
  postcode: number;
  coordinates: UserCoordinates;
  timezone: UserTimezone;
}

export interface UserLoginDetail {
  uuid: string;
  userName: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

export interface UserBobDetail {
  date: string;
  age: number;
}

export interface UserRegisterdDetail {
  date: string;
  age: number;
}

export interface UserIdDetail {
  name: string;
  value: string;
}

export interface UserPictureDetail {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface User {
  gender: string;
  name: UserNameDetail;
  location: UserLocationDetail;
  email: string;
  login: UserLoginDetail;
  dob: UserBobDetail;
  registered: UserRegisterdDetail;
  phone: string;
  cell: string;
  id: UserIdDetail;
  picture: UserPictureDetail;
  nat: string;

  userId: string;
  userName: string;
  isFavorite: boolean;
  tags: Array<string>;
}

/*************************************************
 * Chart Types
 */
export interface ChartDataset {
  backgroundColor: Array<string>;
  data: Array<number>;
}

export interface ChartData {
  labels: Array<string>;
  datasets: Array<ChartDataset>;
}

export interface ChartState {
  userListOrigin: Array<User>;
  chartData: ChartData;
}
