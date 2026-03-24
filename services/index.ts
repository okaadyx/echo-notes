import axios, { AxiosInstance } from "axios";
import * as SecureStore from "expo-secure-store";
import AIApi from "./ai";
import { NotesApi } from "./notes";
import { UserApi } from "./user";

class Api {
  axiosClient: AxiosInstance;
  ai: AIApi;
  user: UserApi;
  notes: NotesApi;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: process.env.EXPO_PUBLIC_API_URL,
    });

    // Add request interceptor for authentication
    this.axiosClient.interceptors.request.use(
      async (config) => {
        const token = await SecureStore.getItemAsync("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.ai = new AIApi(this.axiosClient);
    this.user = new UserApi(this.axiosClient);
    this.notes = new NotesApi(this.axiosClient);
  }
}

export const api = new Api();
