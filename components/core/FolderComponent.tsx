import { Folder } from "@tamagui/lucide-icons";
import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Text, View, XStack, YStack } from "tamagui";

const MOCK_DATA = [
  {
    id: "1",
    name: "Work",
    notes_Count: 12,
    color: "$blue10",
    bg: "$blue3",
  },
  {
    id: "2",
    name: "Personal",
    notes_Count: 4,
    color: "$purple10",
    bg: "$purple3",
  },
  {
    id: "3",
    name: "Ideas",
    notes_Count: 24,
    color: "$orange10",
    bg: "$yellow3",
  },
  {
    id: "4",
    name: "College",
    notes_Count: 20,
    color: "$green10",
    bg: "$green3",
  },
];
const FolderComponent = () => {
  return (
    <YStack gap={20}>
      <XStack justifyContent="space-between">
        <Text fontSize={24} fontWeight={"bold"}>
          Folders
        </Text>
        <TouchableOpacity>
          <Text fontSize={16} fontWeight={"bold"} color={"$blue10"}>
            View All
          </Text>
        </TouchableOpacity>
      </XStack>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={MOCK_DATA}
        renderItem={({ item }) => (
          <View
            height={150}
            width={150}
            backgroundColor={"$backgroundFocus"}
            borderRadius={20}
            padding={20}
            gap={10}
            justifyContent="center"
          >
            <XStack
              height={50}
              width={50}
              backgroundColor={item.bg as any}
              alignItems="center"
              borderRadius={12}
              justifyContent="center"
            >
              <Folder color={item.color as any} scale={1.5} />
            </XStack>
            <YStack>
              <Text fontSize={20} fontWeight={"bold"} color={"$color"}>
                {item.name}
              </Text>
              <Text color={"$color05"}>{item.notes_Count} notes</Text>
            </YStack>
          </View>
        )}
        contentContainerStyle={{ gap: 10, marginBottom: 20 }}
      />
    </YStack>
  );
};

export default FolderComponent;
