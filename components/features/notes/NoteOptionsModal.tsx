import { MoreVertical, Pencil, Trash2, X, Star, StarOff } from "@tamagui/lucide-icons";
import React from "react";
import { Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Alert } from "react-native";
import { Button, Text, View, XStack, YStack } from "tamagui";
import { Note } from "@/types";

interface NoteOptionsModalProps {
  visible: boolean;
  onClose: () => void;
  note: Note | null;
  onPin: (id: number) => void;
  onDelete: (id: number) => void;
}

const NoteOptionsModal = ({ visible, onClose, note, onPin, onDelete }: NoteOptionsModalProps) => {
  if (!note) return null;

  const handlePin = () => {
    onPin(note.id);
    onClose();
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: () => {
            onDelete(note.id);
            onClose();
          } 
        }
      ]
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View flex={1} backgroundColor="rgba(0,0,0,0.5)" justifyContent="flex-end">
          <TouchableWithoutFeedback>
            <YStack 
              backgroundColor="$background" 
              padding={25} 
              borderTopLeftRadius={30} 
              borderTopRightRadius={30} 
              gap={20}
              paddingBottom={50}
            >
              <XStack justifyContent="space-between" alignItems="center">
                <Text fontSize={20} fontWeight="bold" numberOfLines={1} flex={1}>
                  {note.title}
                </Text>
                <TouchableOpacity onPress={onClose}>
                  <X size={24} color="$color10" />
                </TouchableOpacity>
              </XStack>

              <TouchableOpacity 
                onPress={handlePin}
                style={styles.optionButton}
              >
                <XStack gap={15} alignItems="center">
                  <View backgroundColor={note.is_favorite ? "$orange3" : "$blue3"} padding={10} borderRadius={12}>
                    {note.is_favorite ? (
                      <StarOff size={20} color="$orange10" />
                    ) : (
                      <Star size={20} color="$blue10" />
                    )}
                  </View>
                  <Text fontSize={18} fontWeight="600">
                    {note.is_favorite ? "Unpin Note" : "Pin Note"}
                  </Text>
                </XStack>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={handleDelete}
                style={styles.optionButton}
              >
                <XStack gap={15} alignItems="center">
                  <View backgroundColor="$red3" padding={10} borderRadius={12}>
                    <Trash2 size={20} color="$red10" />
                  </View>
                  <Text fontSize={18} fontWeight="600" color="$red10">Delete Note</Text>
                </XStack>
              </TouchableOpacity>

              <Button size="$5" borderRadius={15} onPress={onClose} marginTop={10}>
                Cancel
              </Button>
            </YStack>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  optionButton: {
    paddingVertical: 5,
  }
});

export default NoteOptionsModal;
