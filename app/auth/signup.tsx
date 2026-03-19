import { LogoIcon } from "@/components/core/LogoIcon";
import { router } from "expo-router";
import React, { useState } from "react";
import { Button, Input, Text, XStack, YStack } from "tamagui";

export default function LoginScreen() {
  const [name, setName] = useState<string | null>(null);
  const [email, setEame] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  return (
    <YStack
      flex={1}
      backgroundColor="$background"
      justifyContent="center"
      padding={20}
    >
      <YStack
        width="100%"
        maxWidth={360}
        padding={20}
        borderRadius={20}
        backgroundColor="$background"
      >
        <LogoIcon tag={"Create Your Account"} />

        <YStack gap={12}>
          <Text fontSize={12} color="$gray10">
            Full Name
          </Text>
          <Input
            placeholder="John Doe"
            placeholderTextColor="$placeholderColor"
            backgroundColor="$gray2"
            borderRadius={12}
            height={45}
            borderWidth={1}
            borderColor="$borderColor"
            focusStyle={{
              borderColor: "$blue8",
            }}
          />

          <Text fontSize={12} color="$gray10">
            Email Address
          </Text>
          <Input
            placeholder="name@example.com"
            placeholderTextColor="$placeholderColor"
            backgroundColor="$gray2"
            borderRadius={12}
            height={45}
            borderWidth={1}
            borderColor="$borderColor"
            focusStyle={{
              borderColor: "$blue8",
            }}
          />

          <Text fontSize={12} color="$gray10">
            Password
          </Text>
          <Input
            placeholder="••••••••"
            placeholderTextColor="$placeholderColor"
            secureTextEntry
            backgroundColor="$gray2"
            borderRadius={12}
            height={45}
            borderWidth={1}
            borderColor="$borderColor"
            focusStyle={{
              borderColor: "$blue8",
            }}
          />

          <Button
            marginTop={10}
            height={48}
            borderRadius={14}
            backgroundColor="$blue9"
            color="white"
            pressStyle={{ scale: 0.97 }}
          >
            Sign Up
          </Button>

          <XStack
            alignItems="center"
            justifyContent="center"
            marginVertical={10}
          >
            <YStack flex={1} height={1} backgroundColor="$gray6" />
            <Text marginHorizontal={10} fontSize={12} color="$gray9">
              OR CONTINUE WITH
            </Text>
            <YStack flex={1} height={1} backgroundColor="$gray6" />
          </XStack>

          <Button
            height={45}
            borderRadius={12}
            backgroundColor="$background"
            borderWidth={1}
            borderColor="$borderColor"
            pressStyle={{ scale: 0.97 }}
          >
            <Text color="$color">Google</Text>
          </Button>

          <Text textAlign="center" fontSize={12} color="$gray10" marginTop={10}>
            Already have an account?{" "}
            <Text
              color="$blue9"
              fontWeight="600"
              onPress={() => router.push("/auth/login")}
            >
              Sign In
            </Text>
          </Text>
        </YStack>
      </YStack>
    </YStack>
  );
}
