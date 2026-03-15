import { Search } from "@tamagui/lucide-icons";
import React from "react";
import { Input, XStack } from "tamagui";

const SearchComponent = () => {
  return (
    <XStack
      borderWidth={1}
      borderColor={"$borderColor"}
      borderRadius={12}
      justifyContent="center"
      alignItems="center"
      backgroundColor={"$backgroundFocus"}
    >
      <Search color={"$color05"} />
      <Input
        color={"$color"}
        placeholder="Search here.."
        placeholderTextColor="$color05"
        backgroundColor={"transparent"}
        borderWidth={0}
        width={"90%"}
      />
    </XStack>
  );
};

export default SearchComponent;
