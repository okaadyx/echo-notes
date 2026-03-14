import { Mic } from "@tamagui/lucide-icons";
import React from "react";
import { View, XStack } from "tamagui";

const NotesCard = () => {
  return (
    <View>
      <XStack>
        <View height={50} width={50} borderRadius={12}>
          <Mic />
        </View>
      </XStack>
    </View>
  );
};

export default NotesCard;
