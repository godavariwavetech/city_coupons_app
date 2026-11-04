import axios from "axios";
import { Platform } from "react-native";
import { baseURL } from "../config/config";
import { store } from "../redux/store";
import { getInstalledVersion, emitForceUpdateRequired } from "../services/appVersion";

const api = axios.create({
  baseURL,
  timeout: 15000,
});

const appVersion = getInstalledVersion();

api.interceptors.request.use(
  (config) => {
    try {
      const state = store.getState();
      const token = state.Auth?.token;

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error retrieving auth token from Redux:", error);
    }
    // Lets the backend reject builds older than the minimum version (HTTP 426)
    config.headers["X-Platform"] = Platform.OS;
    if (appVersion) config.headers["X-App-Version"] = appVersion;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 426) {
      const data = error.response.data || {};
      emitForceUpdateRequired({
        latestVersion: data.latestVersion,
        storeUrl: data.storeUrl,
        message: data.message,
      });
    }
    return Promise.reject(error);
  }
);

export default api;
