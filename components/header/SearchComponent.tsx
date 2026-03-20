import React, { useEffect, useRef } from "react";
import { Input, XStack } from "tamagui";

const SearchComponent = () => {
  const inputRef = useRef<any>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 120);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <XStack flex={1} alignItems="center">
      <Input
        ref={inputRef}
        flex={1}
        placeholder="Search notes, ideas, and memories"
        placeholderTextColor="$gray11"
        backgroundColor="transparent"
        borderWidth={0}
        color="$color"
        returnKeyType="search"
        autoCorrect={false}
        autoCapitalize="none"
        fontWeight="400"
      />
    </XStack>
  );
};

export default SearchComponent;
