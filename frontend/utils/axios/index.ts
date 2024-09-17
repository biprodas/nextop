import Axios from "axios";
import { getSession } from "next-auth/react";
import { authSession } from "~/auth";
import { siteConfig } from "~/config/site";
import { publicEndpoints } from "~/constants";
import { ApiError } from "~/utils/api-utils";

const api = Axios.create({
  baseURL: siteConfig.apiBaseUrl,
});

api.interceptors.request.use(
  async (config) => {
    if (
      config.url &&
      !publicEndpoints.find((endpoint) => config.url?.includes(endpoint))
    ) {
      const session = await (typeof getSession === "function"
        ? getSession
        : authSession)();
      if (session && session?.user.tokens.accessToken) {
        config.headers.Authorization = `Bearer ${session?.user.tokens.accessToken}`;
      }
    }
    return config;
  },
  (error) => error
);

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const { data, status } = error.response || {};
    const message = data?.message || error.message || "Something went wrong";
    const code = data?.status_code || status || error.code || 500;
    return Promise.reject(new ApiError(message, code));
  }
);

export default api;
