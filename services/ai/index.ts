import { AxiosInstance } from "axios";
import * as FileSystem from "expo-file-system/legacy";
import * as SecureStore from "expo-secure-store";

export default class AIApi {
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

  async generateNotes(uri: string) {
    try {
      const headers = await this.getAuthHeader();
      const baseURL = this.client.defaults.baseURL || "";
      const url = baseURL.endsWith("/")
        ? `${baseURL}ai/generate-notes`
        : `${baseURL}/ai/generate-notes`;

      console.log(`[AIApi] Uploading audio file to: ${url}`);

      const response = await FileSystem.uploadAsync(url, uri, {
        httpMethod: "POST",
        uploadType: 1 as any, // FileSystemUploadType.MULTIPART
        fieldName: "audio",
        mimeType: "audio/mp4",
        headers,
      });

      if (response.status !== 200) {
        throw new Error(
          `Server Error => Status: ${response.status}, message: ${response.body}`,
        );
      }

      return JSON.parse(response.body);
    } catch (error: any) {
      console.error("API Error [generateNotes]:", error.message || error);
      throw error;
    }
  }
}
