import { ApiResponse, User } from "@/types";
import { AxiosInstance } from "axios";
import * as SecureStore from "expo-secure-store";

export class UserApi {
  client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }

  private async getAuthHeader(): Promise<Record<string, string>> {
    const token = await SecureStore.getItemAsync("token");
    if (!token) return {};
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async getUser(): Promise<User> {
    const headers = await this.getAuthHeader();
    const response = await this.client.get<ApiResponse<User>>("user/", {
      headers,
    });
    return response.data.data;
  }

  async signup(data: any): Promise<any> {
    try {
      const response = await this.client.post("user/signup", data);
      const token = response?.data?.token || response?.data?.data?.token;
      if (token) {
        await SecureStore.setItemAsync("token", token);
      }
      return response.data;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  }

  async login(data: any): Promise<any> {
    try {
      const response = await this.client.post("user/login", data);
      const token = response?.data?.token || response?.data?.data?.token;
      if (token) {
        await SecureStore.setItemAsync("token", token);
      }
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  async update(data: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const headers = await this.getAuthHeader();
      const response = await this.client.put<ApiResponse<User>>("user/update", data, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error("Update error:", error);
      throw error;
    }
  }
}
