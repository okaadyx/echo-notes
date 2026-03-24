import { MoreVertical, Sparkles, Star } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import React from "react";
import { Alert, View } from "react-native";
import { Button, Card, Text, XStack, YStack } from "tamagui";
import { Note, Tag } from "@/types";
import { formatTimeAgo } from "@/lib/dateUtils";

interface NoteCardProps {
  note: Note;
  onDelete?: () => void;
  icon?: any;
}

const EnhancedNoteCard = React.memo(({
  note,
  onDelete,
  icon: IconComponent,
}: NoteCardProps) => {
  if (!note) return null;
  const { id, title, summary, created_at, tags, is_favorite, accent_color } = note;

  return (
    <Card
      elevation={4}
      size="$4"
      marginBottom={15}
      backgroundColor="$background"
      borderRadius={20}
      padding={15}
      borderLeftWidth={accent_color ? 4 : 1}
      borderLeftColor={accent_color || "$borderColor"}
      pressStyle={{ scale: 0.98 }}
      onPress={() =>
        router.push({
          pathname: "/notes/[id]",
          params: { id: id.toString() },
        })
      }
    >
      <YStack gap={10}>
        <XStack justifyContent="space-between" alignItems="center">
          <View />
          <Text fontSize={12} color="$color10">
            {formatTimeAgo(created_at)}
          </Text>
        </XStack>

        <YStack gap={5}>
          <Text fontSize={20} fontWeight="700" color="$color">
            {String(title)}
          </Text>
          <Text fontSize={14} color="$color11" numberOfLines={3} lineHeight={18}>
            {String(summary)}
          </Text>
        </YStack>

        <XStack
          marginTop={10}
          gap={10}
          alignItems="flex-end"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          <XStack gap={8} flexWrap="wrap" flex={1} minWidth={100}>
            {(tags || []).map((tag: any, index) => {
              const tagName = typeof tag === "string" ? tag : (tag?.name || "Tag");
              const tagId = typeof tag === "string" ? tag : (tag?.id || index);

              return (
                <XStack
                  key={tagId}
                  backgroundColor="$backgroundFocus"
                  paddingHorizontal={10}
                  paddingVertical={4}
                  borderRadius={10}
                >
                  <Text fontSize={10} fontWeight="600" color="$blue11">
                    #{tagName}
                  </Text>
                </XStack>
              );
            })}
          </XStack>

          <XStack gap={8} alignItems="center" flexShrink={0} marginLeft="auto">
            {is_favorite && <Star size={16} color="$blue10" fill="$blue10" />}
            {IconComponent && <IconComponent size={16} color="$blue10" />}
            <Button
              size="$2"
              circular
              icon={<MoreVertical size={18} color="$color10" />}
              backgroundColor="transparent"
              padding={0}
              width={24}
              height={24}
              pressStyle={{ backgroundColor: "$backgroundFocus" }}
              onPress={(e) => {
                e.stopPropagation();
                if (onDelete) {
                  Alert.alert(
                    "Delete Note",
                    "Are you sure you want to delete this note?",
                    [
                      { text: "Cancel", style: "cancel" },
                      { text: "Delete", style: "destructive", onPress: onDelete }
                    ]
                  );
                }
              }}
            />
          </XStack>
        </XStack>
      </YStack>
    </Card>
  );
});

export default EnhancedNoteCard;
