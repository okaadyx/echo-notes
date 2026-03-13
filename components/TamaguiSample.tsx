import { Button, H1, View, YStack } from 'tamagui'

export default function TamaguiSample() {
  return (
    <YStack f={1} ai="center" jc="center" p="$4" space="$4">
      <H1>Tamagui is Ready!</H1>
      <View theme="alt1" p="$4" br="$4" bc="$background">
        <Button>Press Me</Button>
      </View>
    </YStack>
  )
}
