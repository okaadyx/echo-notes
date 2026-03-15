import FloatingButton from "@/components/core/FloatingButton";
import FolderComponent from "@/components/core/FolderComponent";
import HeaderComponent from "@/components/core/HeaderComponent";
import SearchComponent from "@/components/core/SearchComponent";
import NotesCard from "@/components/NotesCard";
import PinnedCard from "@/components/PinnedCard";
import { StarFull } from "@tamagui/lucide-icons";
import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, XStack, YStack } from "tamagui";

export default function HomeScreen() {
  return (
    <YStack flex={1} backgroundColor="$background">
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 16, gap: 20 }}>
          <HeaderComponent />
          <SearchComponent />
          <FolderComponent />
          <XStack gap={10} alignItems="center">
            <StarFull color={"$red10"} />
            <Text fontSize={24} fontWeight={"bold"}>
              Pinned Notes
            </Text>
          </XStack>
          <PinnedCard />

          <XStack gap={10} alignItems="center" marginBottom={10}>
            {/* <StarFull color={"$red10"} /> */}
            <Text fontSize={24} fontWeight={"bold"}>
              Recent Notes
            </Text>
          </XStack>
          <NotesCard />
          <NotesCard />
        </ScrollView>
        <FloatingButton />
      </SafeAreaView>
    </YStack>
  );
}
