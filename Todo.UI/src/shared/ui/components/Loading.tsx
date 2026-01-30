import React from "react";
import { View, ActivityIndicator, StyleSheet, ViewStyle } from "react-native";
import { Text } from "./Text";
import { colors } from "@shared/colors";
import { spacing } from "@shared/spacing";

interface LoadingProps {
  text?: string;
  size?: "small" | "large";
  color?: string;
  style?: ViewStyle;
}

export const Loading: React.FC<LoadingProps> = ({
  text = "Loading...",
  size = "large",
  color = colors.primary,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
      <Text variant="body" style={styles.text}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.padding.screen,
  },
  text: {
    marginTop: spacing.sm,
  },
});
