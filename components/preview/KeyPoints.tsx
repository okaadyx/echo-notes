import { Lightbulb } from "@tamagui/lucide-icons";
import { Text, XStack, YStack } from "tamagui";

interface KeyPointsProps {
  points?: string[];
}

export const KeyPoints = ({ points }: KeyPointsProps) => {
  const defaultPoints = [
    "Primary goal is reducing message delivery latency by 150ms.",
    "The beta test for the new onboarding flow starts next week.",
    "Resources will be shifted from 'Legacy Support' to 'New Core Development'.",
    "Next major release is scheduled for mid-October.",
  ];

  return (
    <YStack gap={16}>
      <XStack alignItems="center" gap={8}>
        <Lightbulb size={20} color="$orange10" />
        <Text fontWeight="700" fontSize={16} color="$color">
          Key Points
        </Text>
      </XStack>
      <YStack gap={12}>
        {(points?.length ? points : defaultPoints).map((point, index) => (
          <XStack key={index} gap={8} alignItems="flex-start">
            <Text color="$orange10" fontSize={18} marginTop={-4}>
              •
            </Text>
            <Text fontSize={14} color="$color" lineHeight={20} flex={1}>
              {point}
            </Text>
          </XStack>
        ))}
      </YStack>
    </YStack>
  );
};
