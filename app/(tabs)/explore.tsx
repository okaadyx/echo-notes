import React, { useEffect, useState } from "react";
import { ScrollView, YStack, Spinner, Text } from "tamagui";
import { ExploreHeader, FloatingButton as ExploreFAB } from "@/components/layout";
import { CategoryTabs, EnhancedNoteCard, NoteOptionsModal } from "@/components/features/notes";
import { SafeAreaView } from "react-native-safe-area-context";
import { Mic } from "@tamagui/lucide-icons";
import { formatTimeAgo } from "@/lib/dateUtils";
import { useLocalSearchParams } from "expo-router";
import { useNotes } from "@/hooks/use-notes";
import { Note } from "@/types";

export default function TabTwoScreen() {
  const params = useLocalSearchParams();
  const {
    notes,
    categories,
    activeFolderId,
    sortBy,
    isLoading,
    toggleSort,
    selectFolder,
    deleteNote,
    togglePin,
    setActiveFolderId,
  } = useNotes(params.folderId ? Number(params.folderId) : "all");

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (params.folderId) {
      setActiveFolderId(Number(params.folderId));
    } else {
      setActiveFolderId("all");
    }
  }, [params.folderId]);

  const handleLongPress = (note: Note) => {
    setSelectedNote(note);
    setShowOptions(true);
  };

  return (
    <YStack flex={1} backgroundColor="$background">
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 100, gap: 10 }}>
          <ExploreHeader sortBy={sortBy} onSort={toggleSort} />
          <CategoryTabs 
            categories={categories} 
            activeCategoryId={activeFolderId} 
            onSelectCategory={selectFolder} 
          />
          
          {isLoading ? (
            <YStack padding={50} alignItems="center" justifyContent="center">
              <Spinner size="large" color="$blue10" />
            </YStack>
          ) : (
            <YStack gap={5}>
              {notes.map((note: any) => (
                <EnhancedNoteCard 
                  key={note.id} 
                  note={note}
                  icon={note.transcript ? Mic : undefined}
                  onDelete={() => deleteNote(note.id)}
                  onLongPress={handleLongPress}
                />
              ))}
              {notes.length === 0 && (
                <Text textAlign="center" color="$color10" padding={40}>
                  No notes found in this folder.
                </Text>
              )}
            </YStack>
          )}
        </ScrollView>
        <ExploreFAB />
        <NoteOptionsModal
          visible={showOptions}
          onClose={() => setShowOptions(false)}
          note={selectedNote}
          onPin={togglePin}
          onDelete={deleteNote}
        />
      </SafeAreaView>
    </YStack>
  );
}
