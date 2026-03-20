import { Mic } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import React from "react";
import { Text, View, XStack, YStack } from "tamagui";

interface Note {
  id: string;
  title: string;
  type?: string;
  date?: string;
}

interface NotesCardProps {
  item: Note;
}

const NotesCard = ({ item }: NotesCardProps) => {
  return (
    <XStack
      backgroundColor="#ffffff"
      padding={16}
      borderRadius={12}
      justifyContent="space-between"
      alignItems="center"
      onPress={() =>
        router.push({
          pathname: "/notes/[id]",
          params: { id: item.id },
        })
      }
    >
      <XStack flex={1} alignItems="center" gap={20}>
        <View
          height={50}
          width={50}
          borderRadius={16}
          backgroundColor="#ffedd5"
          alignItems="center"
          justifyContent="center"
        >
          <Mic color="#8b8bf7ff" />
        </View>

        <YStack width={"70%"}>
          <Text
            fontSize={16}
            color="#0f172a"
            fontWeight="bold"
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <Text color="#6d7c92">{item.type ?? "Text note"}</Text>
        </YStack>
      </XStack>

      <Text color="#a7b3c4">{item.date ?? "Yesterday"}</Text>
    </XStack>
  );
};

export default React.memo(NotesCard);
