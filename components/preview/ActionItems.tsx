import { ClipboardCheck } from "@tamagui/lucide-icons";
import { Card, Text, XStack, YStack } from "tamagui";

interface ActionItemsProps {
  items?: string[];
}

export const ActionItems = ({ items }: ActionItemsProps) => {
  const defaultItems = [
    "Review onboarding mockups with the design team",
    "Schedule sync with infrastructure lead",
    "Draft Q3 goals for the executive summary",
  ];

  return (
    <YStack gap={16}>
      <XStack alignItems="center" gap={8}>
        <ClipboardCheck size={20} color="$green10" />
        <Text fontWeight="700" fontSize={16} color="$color">
          Action Items
        </Text>
      </XStack>
      <YStack gap={12}>
        {(items?.length ? items : defaultItems).map((item, index) => (
          <Card
            key={index}
            padding={12}
            borderRadius={12}
            borderWidth={1}
            borderColor="$borderColor"
            backgroundColor="$background"
          >
            <XStack gap={12} alignItems="center">
              <YStack
                width={20}
                height={20}
                borderRadius={6}
                borderWidth={2}
                borderColor={index === 1 ? "$blue10" : "$borderColor"}
                backgroundColor={index === 1 ? "$blue10" : "$background"}
                justifyContent="center"
                alignItems="center"
              >
                {index === 1 && (
                  <Text fontSize={10} color="white" fontWeight="900">
                    ✓
                  </Text>
                )}
              </YStack>
              <Text
                fontSize={14}
                color={index === 1 ? "$color05" : "$color"}
                style={index === 1 ? { textDecorationLine: "line-through" } : {}}
                flex={1}
              >
                {item}
              </Text>
            </XStack>
          </Card>
        ))}
      </YStack>
    </YStack>
  );
};
