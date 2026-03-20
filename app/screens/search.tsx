import {
    ChevronRight
} from "@tamagui/lucide-icons";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Circle, Separator, Text, XStack } from "tamagui";

export default function SearchScreen() {
    const insets = useSafeAreaInsets();

    return
}

function SettingItem({ icon: Icon, label }: any) {
    return (
        <>
            <XStack
                justifyContent="space-between"
                alignItems="center"
                paddingVertical={12}
            >
                <XStack alignItems="center" gap={10}>
                    <Circle size={36} backgroundColor="$blue3">
                        <Icon size={18} color="$blue9" />
                    </Circle>
                    <Text color="$color">{label}</Text>
                </XStack>

                <ChevronRight size={18} color="#9ca3af" />
            </XStack>
            <Separator />
        </>
    );
}
