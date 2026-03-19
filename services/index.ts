import axios, { AxiosInstance } from "axios";
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
      baseURL: "https://echo-notes-kappa.vercel.app/api/",
    });
    this.ai = new AIApi(this.axiosClient);
    this.user = new UserApi(this.axiosClient);
    this.notes = new NotesApi(this.axiosClient);
  }
}

export const api = new Api();
