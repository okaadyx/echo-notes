import { Search } from "@tamagui/lucide-icons";
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
        borderColor: "$blue9",
        backgroundColor: "$gray1",
      }}
    >
      <Search size={20} color="$gray9" />
      <Input
        flex={1}
        placeholder="Search your notes..."
        placeholderTextColor="$gray8"
        backgroundColor="transparent"
        borderWidth={0}
        fontSize={16}
        color="$color"
        height="100%"
      />
    </XStack>
  );
};

export default SearchComponent;
