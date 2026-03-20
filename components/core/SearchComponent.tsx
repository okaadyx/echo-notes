import { Search } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import React from "react";
import { Input, XStack } from "tamagui";

const SearchComponent = () => {
  return (
    <XStack
      borderWidth={1}
      borderColor="$gray4"
      borderRadius={16}
      px={16}
      alignItems="center"
      backgroundColor="$gray2"
      height={54}
      focusStyle={{
        borderColor: "#4f46e5",
        backgroundColor: "$gray1",
      }}
      pressStyle={{
        opacity: 0.5,
      }}
      onPress={() => router.push("/screens/search")}
    >
      <Search size={20} color="#6366f1" />
      <Input
        flex={1}
        placeholder="Search your notes..."
        placeholderTextColor="$gray8"
        backgroundColor="transparent"
        borderWidth={0}
        fontSize={16}
        color="$color"
        height="100%"
        disabled
      />
    </XStack>
  );
};

export default SearchComponent;
