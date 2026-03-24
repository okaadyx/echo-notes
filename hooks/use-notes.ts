import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services";
import { Note, Folder } from "@/types";

export function useNotes(initialFolderId: string | number = "all") {
  const queryClient = useQueryClient();
  const [sortBy, setSortBy] = useState<"date" | "tags" | null>(null);
  const [activeFolderId, setActiveFolderId] = useState<string | number>(initialFolderId);

  const { data: notes = [], isLoading: isLoadingNotes } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: () => api.notes.getNotes(),
  });

  const { data: folders = [], isLoading: isLoadingFolders } = useQuery<Folder[]>({
    queryKey: ["folders"],
    queryFn: () => api.notes.getFolders(),
  });

  const categories = useMemo(() => {
    const base = [{ id: "all", name: "All Notes" }];
    const folderCats = folders.map((f: Folder) => ({ id: f.id, name: f.name }));
    return [...base, ...folderCats];
  }, [folders]);

  const filteredAndSortedNotes = useMemo(() => {
    let result = [...notes];

    // Filter by Folder
    if (activeFolderId !== "all") {
      result = result.filter((note: Note) => note.folder_id === activeFolderId);
    }

    if (sortBy === "date") {
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sortBy === "tags") {
      result.sort((a, b) => (b.tags?.length || 0) - (a.tags?.length || 0));
    }

    return result;
  }, [notes, activeFolderId, sortBy]);

  const pinnedNotes = useMemo(() => {
    return notes
      .filter((item: Note) => item.is_favorite === true)
      .sort((a, b) => {
        const dateA = a.updated_at ? new Date(a.updated_at).getTime() : 0;
        const dateB = b.updated_at ? new Date(b.updated_at).getTime() : 0;
        return dateB - dateA;
      });
  }, [notes]);

  const recentNotes = useMemo(() => {
    return [...filteredAndSortedNotes].sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    });
  }, [filteredAndSortedNotes]);

  const toggleSort = (type: "date" | "tags") => {
    setSortBy(prev => prev === type ? null : type);
  };

  const selectFolder = (id: string | number) => {
    setActiveFolderId(id);
    // Note: We don't always need to invalidate everything if we use specific query keys per folder
    // but for now keeping it simple as per existing logic.
    queryClient.invalidateQueries({ queryKey: ["notes"] });
  };

  const deleteNote = async (id: number) => {
    try {
      await api.notes.deleteNote(id);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    } catch (error: any) {
      console.error("Delete note error:", error);
    }
  }

  const togglePin = async (id: number) => {
    try {
      await api.notes.pinToggle(id);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    } catch (error: any) {
      console.error("Toggle pin error:", error);
    }
  };

  return {
    notes: filteredAndSortedNotes,
    pinnedNotes,
    recentNotes,
    folders,
    categories,
    activeFolderId,
    sortBy,
    isLoading: isLoadingNotes || isLoadingFolders,
    toggleSort,
    selectFolder,
    deleteNote,
    togglePin,
    setActiveFolderId
  };
}
