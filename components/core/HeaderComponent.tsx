import { api } from "@/services";
import { User } from "@tamagui/lucide-icons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import { Text, XStack, YStack } from "tamagui";

const HeaderComponent = () => {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => api.user.getUser(),
  });
  return (
    <XStack
      justifyContent="space-between"
      alignItems="center"
      marginBottom={25}
    >
      <YStack gap={2}>
        <Text fontSize={26} fontWeight="800" color="$color">
          Hello, {data?.name}
        </Text>
        <Text fontSize={15} color="$gray11" fontWeight="500">
          Ready to capture your thoughts?
        </Text>
      </YStack>
      <YStack
        width={50}
        height={50}
        borderRadius={25}
        backgroundColor="#f0f2ff"
        alignItems="center"
        justifyContent="center"
        borderWidth={1}
        borderColor="#e0e7ff"
        onPress={() => router.push("/screens/settings")}
      >
        <User size={26} color="#4f46e5" />
      </YStack>
    </XStack>
  );
};

export default HeaderComponent;
