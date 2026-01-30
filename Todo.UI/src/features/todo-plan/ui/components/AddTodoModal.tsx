import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput as RNTextInput,
  Animated,
  Dimensions,
} from "react-native";
import {
  TodoCategory,
  TODO_CATEGORIES,
  getDefaultCategory,
  TodoItem,
} from "../../domain";
import { colors } from "@shared/colors";
import { spacing } from "@shared/spacing";
import { typography } from "@shared/typography";
import { Text, TextInput, Button } from "@shared/ui/components";
import { Ionicons } from "@expo/vector-icons";

interface AddTodoModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (title: string, notes: string, category: TodoCategory) => void;
  initialCategory?: TodoCategory;
  editingItem?: TodoItem | null;
}

export const AddTodoModal: React.FC<AddTodoModalProps> = ({
  visible,
  onClose,
  onAdd,
  initialCategory,
  editingItem,
}) => {
  const [title, setTitle] = useState(editingItem?.title || "");
  const [notes, setNotes] = useState(editingItem?.notes || "");
  const [selectedCategory, setSelectedCategory] = useState<TodoCategory>(
    editingItem?.category || initialCategory || getDefaultCategory(),
  );
  const notesInputRef = useRef<RNTextInput>(null);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);

  // Animation helper
  const animateModal = (toValue: number, callback?: () => void) => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(callback);
  };

  // Reset form when modal opens or editing item changes
  React.useEffect(() => {
    if (visible) {
      setModalVisible(true);
      setTitle(editingItem?.title || "");
      setNotes(editingItem?.notes || "");
      setSelectedCategory(
        editingItem?.category || initialCategory || getDefaultCategory(),
      );
      // Animate in
      animateModal(1);
    }
  }, [visible, editingItem, initialCategory, slideAnim, overlayOpacity]);

  const handleAdd = () => {
    if (title.trim()) {
      onAdd(title.trim(), notes.trim(), selectedCategory);
      // Animate out
      animateModal(0, () => {
        setTitle("");
        setNotes("");
        setSelectedCategory(getDefaultCategory());
        setModalVisible(false);
        onClose();
      });
    }
  };

  const handleClose = () => {
    animateModal(0, () => {
      setTitle("");
      setNotes("");
      setSelectedCategory(getDefaultCategory());
      setModalVisible(false);
      onClose();
    });
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="none"
      presentationStyle="overFullScreen"
      transparent={true}
      onRequestClose={handleClose}
    >
      <Animated.View style={{ flex: 1, opacity: overlayOpacity }}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={handleClose}
        >
          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [
                  {
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [Dimensions.get("window").height, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity activeOpacity={1}>
              <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                {/* Category Selector */}
                <View style={styles.categorySelector}>
                  <Text variant="body" style={styles.categoryLabel}>
                    {editingItem ? "Edit Category" : "Choose Category"}
                  </Text>
                  <View style={styles.categoryList}>
                    {TODO_CATEGORIES.map((category) => (
                      <TouchableOpacity
                        key={category.id}
                        style={[
                          styles.categoryItem,
                          selectedCategory === category.id &&
                            styles.categoryItemSelected,
                        ]}
                        onPress={() => setSelectedCategory(category.id)}
                      >
                        <Ionicons
                          name={category.icon as any}
                          size={30}
                          color={
                            selectedCategory === category.id
                              ? colors.white
                              : colors.primary
                          }
                          style={{ marginRight: spacing.md }}
                        />
                        <View style={styles.categoryContent}>
                          <Text
                            variant="body"
                            style={[
                              styles.categoryTitle,
                              selectedCategory === category.id &&
                                styles.categoryTitleSelected,
                            ]}
                          >
                            {category.label}
                          </Text>
                          <Text
                            variant="caption"
                            style={[
                              styles.categoryDescription,
                              selectedCategory === category.id &&
                                styles.categoryDescriptionSelected,
                            ]}
                          >
                            {category.description}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Input Fields */}
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder={
                      editingItem ? "Edit todo title" : "What needs to be done?"
                    }
                    value={title}
                    onChangeText={setTitle}
                    onSubmitEditing={() => notesInputRef.current?.focus()}
                    autoFocus
                    multiline
                    maxLength={200}
                    style={styles.titleInput}
                  />

                  <TextInput
                    ref={notesInputRef}
                    placeholder={
                      editingItem
                        ? "Edit notes (optional)"
                        : "Add notes (optional)"
                    }
                    value={notes}
                    onChangeText={setNotes}
                    multiline
                    maxLength={1000}
                    style={styles.notesInput}
                  />
                </View>

                {/* Action Buttons */}
                <View style={styles.actions}>
                  <Button
                    title="Cancel"
                    onPress={handleClose}
                    variant="secondary"
                    style={styles.cancelButton}
                  />
                  <Button
                    title={editingItem ? "Update Todo" : "Add Todo"}
                    onPress={handleAdd}
                    variant="primary"
                    disabled={!title.trim()}
                    style={styles.addButton}
                  />
                </View>
              </KeyboardAvoidingView>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: colors.background,
    borderTopLeftRadius: spacing.lg,
    borderTopRightRadius: spacing.lg,
    maxHeight: "90%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  categorySelector: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  categoryLabel: {
    marginBottom: spacing.md,
    fontWeight: typography.fontWeight.semibold,
  },
  categoryList: {
    gap: spacing.sm,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderRadius: spacing.xs,
    borderWidth: 1,
    borderColor: colors.secondary,
    backgroundColor: colors.white,
  },
  categoryItemSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  categoryContent: {
    flex: 1,
  },
  categoryTitle: {
    fontWeight: typography.fontWeight.medium,
  },
  categoryTitleSelected: {
    color: colors.white,
  },
  categoryDescription: {
    marginTop: spacing.xs,
  },
  categoryDescriptionSelected: {
    color: colors.white,
  },
  inputContainer: {
    flex: 1,
    padding: spacing.lg,
    gap: spacing.md,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: spacing.xs,
    padding: spacing.md,
    backgroundColor: colors.white,
    fontSize: typography.fontSize.md,
    textAlignVertical: "top",
  },
  notesInput: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: spacing.xs,
    padding: spacing.md,
    backgroundColor: colors.white,
    fontSize: typography.fontSize.md,
    minHeight: 80,
    textAlignVertical: "top",
  },
  actions: {
    flexDirection: "row",
    padding: spacing.lg,
    gap: spacing.md,
  },
  cancelButton: {
    flex: 1,
  },
  addButton: {
    flex: 1,
  },
});
