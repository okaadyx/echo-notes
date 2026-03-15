import { ChevronLeft, MoreVertical, Share2 } from "@tamagui/lucide-icons";
import { Text, XStack } from "tamagui";

export const NoteHeader = () => (
  <XStack
    paddingHorizontal={16}
    paddingVertical={12}
    alignItems="center"
    justifyContent="space-between"
    borderBottomWidth={1}
    borderBottomColor="$borderColor"
  >
    <XStack alignItems="center" gap={12}>
      <ChevronLeft size={24} color="$color" />
      <Text fontWeight="600" fontSize={16} color="$color">
        Note Detail
      </Text>
    </XStack>
    <XStack gap={16}>
      <Share2 size={20} color="$color" />
      <MoreVertical size={20} color="$color" />
    </XStack>
  </XStack>
);
