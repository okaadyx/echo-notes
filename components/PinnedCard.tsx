import { Clock } from "@tamagui/lucide-icons";
import React from "react";
import { Text, View, XStack, YStack } from "tamagui";
interface PinnedProps {
  title: string;
  summary: string;
}
interface Props {
  item: PinnedProps;
}
const PinnedCard = ({ item }: Props) => {
  return (
    <View
      backgroundColor={"$backgroundFocus"}
      minHeight={140}
      padding={16}
      borderRadius={12}
      borderWidth={1}
      borderColor="$borderColor"
      overflow="hidden"
    >
      <YStack flex={1} justifyContent="space-between" gap={10}>
        <Text
          fontSize={18}
          fontWeight={"bold"}
          color={"$color"}
          numberOfLines={1}
        >
          {item.title}
        </Text>
        <Text color={"$color05"} numberOfLines={3}>
          {item.summary}
        </Text>
        <XStack gap={10} alignItems="center">
          <Clock size={20} color={"$color05"} />
          <Text color={"$color05"}>2 hour ago</Text>
        </XStack>
      </YStack>
    </View>
  );
};

export default PinnedCard;
