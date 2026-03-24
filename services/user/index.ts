import { AxiosInstance } from "axios";
import { User, ApiResponse } from "@/types";

export class UserApi {
  client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async getUser(): Promise<User> {
    const response = await this.client.get<ApiResponse<User>>("user/");
    return response.data.data;
  }

  async signup(data: any): Promise<any> {
    try {
      const response = await this.client.post("user/signup", data);
      return response.data;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  }

  async login(data: any): Promise<any> {
    try {
      const response = await this.client.post("user/login", data);
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  async update(data: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const response = await this.client.put<ApiResponse<User>>("user/update", data);
      return response.data;
    } catch (error) {
      console.error("Update error:", error);
      throw error;
    }
  }
}
