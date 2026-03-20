import {
  AISummary,
  ActionItems,
  KeyPoints,
  NoteHeader,
  NoteInfo,
} from "@/components/preview";
import { api } from "@/services";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, Platform, ToastAndroid } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, Text, YStack } from "tamagui";

export default function PreviewComponent() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => api.notes.getNote(Number(id)),
  });
  console.log(data);

  const queryClient = useQueryClient();

  const handlePinnedNotes = async () => {
    try {
      const response = await api.notes.pinToggle(Number(id));

      // Invalidate queries to refresh UI
      queryClient.invalidateQueries({ queryKey: ["note", id] });
      queryClient.invalidateQueries({ queryKey: ["notes"] });

      if (Platform.OS === "android") {
        ToastAndroid.showWithGravity(
          response?.message || "Success",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      }
    } catch (error) {
      console.error("Error toggling pin:", error);
    }
  };

  if (isLoading) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center">
        <ActivityIndicator size={"large"} color="#4f46e5" />
      </YStack>
    );
  }

  if (isError || !data) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center">
        <Text color="$red10">Error loading note</Text>
      </YStack>
    );
  }
  return (
    <YStack flex={1} backgroundColor="$background" paddingTop={insets.top}>
      <NoteHeader
        title="Note Detail"
        pinIcon={true} // Keep true to show the pin icon, but icon inside NoteHeader should reflect state
        handlePinNote={handlePinnedNotes}
        isPinned={data.is_favorite ? true : false}
      />

      <ScrollView flex={1}>
        <YStack padding={20} gap={24}>
          <NoteInfo title={data.title} tags={data.tags} />

          <AISummary summary={data.summary} />

          <ActionItems items={data.action_items} />

          <KeyPoints points={data.key_points} />
        </YStack>
      </ScrollView>
    </YStack>
  );
}
