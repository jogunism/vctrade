// http.ts
import axios from "axios";

// Axios 기본 설정
axios.defaults.baseURL = "https://randomuser.me/api/";

// export default axios;

export default axios;

// AxiosResponse는 named export
export type { AxiosResponse } from "axios";
