export interface Tag {
  id: number | string;
  name: string;
}

export interface Folder {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  summary: string;
  folder_id: number | null;
  folder?: {
    id: number;
    name: string;
  };
  is_favorite: boolean;
  tags: Tag[] | string[];
  created_at: string;
  updated_at: string;
  accent_color?: string;
  type?: string;
  transcript?: string;
  action_items?: any[];
  key_points?: any[];
}

export interface User {
  id: number;
  email: string;
  name: string;
  avatar_url?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
