import { Mic } from "@tamagui/lucide-icons";
import React from "react";
import { Text, View, XStack, YStack } from "tamagui";

const NotesCard = () => {
  return (
    <XStack
      backgroundColor={"#ffffff"}
      padding={16}
      borderRadius={12}
      justifyContent="space-between"
      alignItems="center"
    >
      <XStack alignItems="center" gap={20}>
        <View
          height={50}
          width={50}
          borderRadius={16}
          backgroundColor={"#ffedd5"}
          alignItems="center"
          justifyContent="center"
        >
          <Mic color={"#ea580c"} />
        </View>
        <YStack flexWrap="nowrap">
          <Text fontSize={18} color={"#0f172a"} fontWeight={"bold"}>
            Grocery List
          </Text>
          <Text color={"#6d7c92"}>Text note</Text>
        </YStack>
      </XStack>
      <Text color={"#a7b3c4"}>Yesterday</Text>
    </XStack>
  );
};

export default NotesCard;
