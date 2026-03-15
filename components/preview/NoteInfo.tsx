import { Calendar, Clock, Plus } from "@tamagui/lucide-icons";
import { H3, Text, XStack, YStack } from "tamagui";

interface NoteInfoProps {
  title?: string;
  tags?: string[];
}

export const NoteInfo = ({ title, tags }: NoteInfoProps) => (
  <YStack gap={24}>
    {/* Title & Meta */}
    <YStack gap={8}>
      <H3 fontWeight="800" color="$color" lineHeight={32}>
        {title || "Weekly Product Sync: Q3 Strategy"}
      </H3>
      <XStack gap={16} alignItems="center">
        <XStack alignItems="center" gap={6}>
          <Calendar size={14} color="$color05" />
          <Text color="$color05" fontSize={13}>
            Oct 24, 2023
          </Text>
        </XStack>
        <XStack alignItems="center" gap={6}>
          <Clock size={14} color="$color05" />
          <Text color="$color05" fontSize={13}>
            14:32
          </Text>
        </XStack>
      </XStack>
    </YStack>

    {/* Tags */}
    <XStack flexWrap="wrap" gap={8}>
      {(tags?.length ? tags : ["ProductSync", "Strategy", "Q3"]).map(
        (tag: string, index: number) => (
          <XStack
            key={index}
            backgroundColor={index === 2 ? "$backgroundFocus" : "$blue3"}
            paddingHorizontal={12}
            paddingVertical={6}
            borderRadius={20}
          >
            <Text
              fontSize={12}
              fontWeight="600"
              color={index === 2 ? "$color" : "$blue10"}
            >
              #{tag}
            </Text>
          </XStack>
        )
      )}
      <XStack
        borderWidth={1}
        borderColor="$borderColor"
        paddingHorizontal={12}
        paddingVertical={6}
        borderRadius={20}
        alignItems="center"
        gap={4}
      >
        <Plus size={12} color="$color05" />
        <Text fontSize={12} color="$color05">
          Add Tag
        </Text>
      </XStack>
    </XStack>
  </YStack>
);
