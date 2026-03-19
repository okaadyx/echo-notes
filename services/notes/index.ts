import { AxiosInstance } from "axios";
import * as SecureStore from "expo-secure-store";

export class NotesApi {
  client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }
  async getAuthHeader() {
    const token = await SecureStore.getItemAsync("token");
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  async getNotes() {
    const headers = await this.getAuthHeader();
    const response = await this.client.get("notes/", { headers });
    return response.data;
  }
  async createNotes(data: any) {
    try {
      const headers = await this.getAuthHeader();
      const response = await this.client.post("notes/", data, { headers });
      const notes = response.data;
      return notes || [];
    } catch (error) {
      console.error("creating notes error:", error);
      throw error;
    }
  }
  async getNote(id: any) {
    try {
      const headers = await this.getAuthHeader();
      const response = await this.client.get(`notes/${id}`, { headers });
      const notes = response.data;
      return notes;
    } catch (error) {
      console.error("fetching notes error:", error);
      throw error;
    }
  }

  async pinToggle(noteId: string) {
    try {
      const headers = await this.getAuthHeader();
      const response = await this.client.patch(`notes/${noteId}/favorite`, {
        headers,
      });

      return response.data;
    } catch (error) {
      console.error("Update error:", error);
      throw error;
    }
  }

  async deleteNote(noteId: string) {
    try {
      const headers = await this.getAuthHeader();
      const response = await this.client.delete(`notes/${noteId}`, { headers });
      return response.data;
    } catch (error) {
      console.error("Delete error:", error);
      throw error;
    }
  }
}
