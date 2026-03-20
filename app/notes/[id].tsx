import {
  AISummary,
  ActionItems,
  KeyPoints,
  NoteHeader,
  NoteInfo,
} from "@/components/preview";
import { api } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator } from "react-native";
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

  if (isLoading) {
    return (
      <YStack flex={1} alignItems="center" justifyContent="center">
        <ActivityIndicator size={"large"} />
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
      <NoteHeader title="Note Detail" />

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
