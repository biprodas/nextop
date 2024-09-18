import Axios from "axios";
import { getSession } from "next-auth/react";
import { authSession } from "~/auth";
import { siteConfig } from "~/config/site";
import { publicEndpoints } from "~/constants";
import { ApiError } from "~/utils/api-utils";

// Create an Axios instance
const apiClient = Axios.create({
  baseURL: siteConfig.apiBaseUrl,
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    if (
      config.url &&
      !publicEndpoints.find((endpoint) => config.url?.includes(endpoint))
    ) {
      const session = await (typeof getSession === "function"
        ? getSession
        : authSession)();
      if (session?.user.tokens.accessToken) {
        config.headers.Authorization = `Bearer ${session.user.tokens.accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    // Handle errors globally
    const { data, status } = error.response || {};
    const message = data?.message || error.message || "Something went wrong";
    const code = data?.status_code || status || error.code || 500;
    if (status === 401) {
      window.location.href = "/login";
    }
    // we can setup refreshToken here
    return Promise.reject(new ApiError(message, code));
  }
);

export default apiClient;
