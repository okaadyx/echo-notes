import { Mic } from "@tamagui/lucide-icons";
import { Text, YStack } from "tamagui";

interface Props {
  tag: string;
}

export const LogoIcon = ({ tag }: Props) => {
  return (
    <YStack alignItems="center" marginBottom={20}>
      <YStack
        width={70}
        height={70}
        borderRadius={20}
        backgroundColor="$blue9"
        justifyContent="center"
        alignItems="center"
        elevation={6}
      >
        <Mic size={30} color="white" />
      </YStack>

      <Text fontSize={22} fontWeight="700" marginTop={12} color="$color">
        EchoNotes
      </Text>

      <Text fontSize={14} color="$gray10" marginTop={4} textAlign="center">
        {tag}
      </Text>
    </YStack>
  );
};
