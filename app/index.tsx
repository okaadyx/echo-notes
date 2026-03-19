import { api } from "@/services";
import { Mic } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from "react-native-reanimated";
import { Text, YStack } from "tamagui";

export default function SplashScreen() {
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(20);

  useEffect(() => {
    // Icon animation: fade in and scale up, then pulse
    opacity.value = withTiming(1, { duration: 800 });
    scale.value = withSequence(
      withTiming(1, { duration: 800, easing: Easing.out(Easing.back(1.5)) }),
      withRepeat(
        withTiming(1.1, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
        -1,
        true
      )
    );

    // Text animation: fade in and slide up with delay
    textOpacity.value = withDelay(500, withTiming(1, { duration: 800 }));
    textTranslateY.value = withDelay(
      500,
      withTiming(0, { duration: 800, easing: Easing.out(Easing.quad) })
    );
  }, []);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  useEffect(() => {
    const checkLogin = async () => {
      // Minimum display time for splash screen (2.5 seconds)
      const splashMinTime = new Promise((resolve) => setTimeout(resolve, 2500));

      try {
        const token = await SecureStore.getItemAsync("token");
        await splashMinTime; // Ensure splash shows for at least 2.5s

        if (!token) {
          router.replace("/auth/login");
          return;
        }

        const user = await api.user.getUser();
        if (!user.status) {
          router.replace("/auth/login");
          return;
        }
        router.replace("/(tabs)");
      } catch (error) {
        router.replace("/auth/login");
      }
    };
    checkLogin();
  }, []);

  const loadingIndicatorStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withRepeat(
          withTiming(40, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
          -1,
          true
        ),
      },
    ],
  }));

  return (
    <YStack
      flex={1}
      backgroundColor="#1e1b4b"
      justifyContent="center"
      alignItems="center"
    >
      <YStack justifyContent="center" alignItems="center">
        <Animated.View style={animatedIconStyle}>
          <YStack
            width={100}
            height={100}
            borderRadius={24}
            backgroundColor="#4f46e5"
            justifyContent="center"
            alignItems="center"
            elevation={15}
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 10 }}
            shadowOpacity={0.3}
            shadowRadius={20}
          >
            <Mic size={42} color="white" />
          </YStack>
        </Animated.View>

        <Animated.View style={animatedTextStyle}>
          <YStack alignItems="center" marginTop={30}>
            <Text
              fontSize={32}
              fontWeight="800"
              color="white"
              letterSpacing={1}
            >
              EchoNotes
            </Text>
            <Text marginTop={8} fontSize={16} color="#c7d2fe" fontWeight="400">
              Turn voice into knowledge.
            </Text>
          </YStack>
        </Animated.View>

        {/* Improved Loading Indicator */}
        <YStack marginTop={50} alignItems="center">
          <YStack
            width={60}
            height={4}
            borderRadius={2}
            backgroundColor="#6366f1"
            overflow="hidden"
          >
            <Animated.View
              style={[
                {
                  width: "40%",
                  height: "100%",
                  backgroundColor: "white",
                  borderRadius: 2,
                },
                loadingIndicatorStyle,
              ]}
            />
          </YStack>
        </YStack>
      </YStack>
    </YStack>
  );
}
