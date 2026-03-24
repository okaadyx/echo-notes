import { AxiosInstance } from "axios";
import { Note, Folder, ApiResponse } from "@/types";

export class NotesApi {
  client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async getNotes(params?: { folder_id?: number | string; limit?: number; page?: number }): Promise<Note[]> {
    try {
      const response = await this.client.get<ApiResponse<Note[]>>("notes/", { 
        params
      });
      return response.data.data;
    } catch (error) {
      console.error("fetching notes error:", error);
      throw error;
    }
  }

  async searchNotes(query: string): Promise<Note[]> {
    try {
      const response = await this.client.get<ApiResponse<Note[]>>("notes/search", {
        params: { q: query },
      });
      return response.data.data;
    } catch (error) {
      console.error("search notes error:", error);
      throw error;
    }
  }

  async createNotes(data: Partial<Note>): Promise<Note> {
    try {
      const response = await this.client.post<ApiResponse<Note>>("notes/", data);
      return response.data.data;
    } catch (error) {
      console.error("creating notes error:", error);
      throw error;
    }
  }

  async getNote(id: number): Promise<Note> {
    try {
      const response = await this.client.get<ApiResponse<Note>>(`notes/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("fetching note error:", error);
      throw error;
    }
  }

  async pinToggle(noteId: number): Promise<ApiResponse<Note>> {
    try {
      const response = await this.client.patch<ApiResponse<Note>>(
        `notes/${noteId}/favorite`,
        {},
      );
      return response.data;
    } catch (error) {
      console.error("Error toggling favorite:", error);
      throw error;
    }
  }

  async updateNote(id: number, data: Partial<Note>): Promise<Note> {
    try {
      const response = await this.client.put<ApiResponse<Note>>(`notes/${id}`, data);
      return response.data.data;
    } catch (error) {
      console.error("update note error:", error);
      throw error;
    }
  }

  async getFolders(): Promise<Folder[]> {
    try {
      const response = await this.client.get<ApiResponse<Folder[]>>("folders/");
      return response.data.data;
    } catch (error) {
      console.error("get folders error:", error);
      throw error;
    }
  }

  async createFolder(name: string): Promise<Folder> {
    try {
      const response = await this.client.post<ApiResponse<Folder>>("folders/", { name });
      return response.data.data;
    } catch (error) {
      console.error("create folder error:", error);
      throw error;
    }
  }

  async deleteFolder(id: number): Promise<void> {
    try {
      await this.client.delete(`folders/${id}`);
    } catch (error) {
      console.error("delete folder error:", error);
      throw error;
    }
  }

  async updateFolder(id: number, name: string): Promise<Folder> {
    try {
      const response = await this.client.put<ApiResponse<Folder>>(`folders/${id}`, { name });
      return response.data.data;
    } catch (error) {
      console.error("update folder error:", error);
      throw error;
    }
  }

  async chatWithAi(prompt: string, context?: any): Promise<any> {
    try {
      const response = await this.client.post<ApiResponse<any>>("ai/chat", { prompt, context });
      return response.data.data;
    } catch (error) {
      console.error("chat with AI error:", error);
      throw error;
    }
  }

  async generateStructuredNote(prompt: string): Promise<any> {
    try {
      const response = await this.client.post<ApiResponse<any>>("ai/generate-structured-note", { prompt });
      return response.data.data;
    } catch (error) {
      console.error("generate structured note error:", error);
      throw error;
    }
  }

  async deleteNote(id: number): Promise<void> {
    try {
      await this.client.delete(`notes/${id}`);
    } catch (error) {
      console.error("delete note error:", error);
      throw error;
    }
  }
}
