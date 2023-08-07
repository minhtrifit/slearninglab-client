import axios from "axios";

export const axiosInterReq = axios.interceptors.request.use(
  async (config: any) => {
    if (config.url.includes("/auth/verify")) {
      const accessToken = sessionStorage
        .getItem("accessToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");

      if (accessToken) {
        const newHeaders = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        };
        config.headers = newHeaders;
      }

      //   console.log("Bearer " + accessToken === config.headers.Authorization);
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const axiosInterRes = axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (originalRequest.url.includes("/auth/refresh")) {
      console.log("Login time out");
      sessionStorage.clear();
    }

    if (originalRequest.url.includes("/auth/verify")) {
      const refreshToken = sessionStorage
        .getItem("refreshToken")
        ?.toString()
        .replace(/^"(.*)"$/, "$1");
      const rs = await axios.post(
        `http://localhost:5500/auth/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      error.response.config.headers.Authorization = `Bearer ${rs.data.tokens?.accessToken}`;

      sessionStorage.setItem(
        "accessToken",
        JSON.stringify(rs.data.tokens?.accessToken)
      );

      sessionStorage.setItem(
        "refreshToken",
        JSON.stringify(rs.data.tokens?.refreshToken)
      );

      return axios(error.response.config);
    }
    return Promise.reject(error);
  }
);
