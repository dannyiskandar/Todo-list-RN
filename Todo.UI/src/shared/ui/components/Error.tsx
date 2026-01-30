import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Text } from "./Text";
import { Button } from "./Button";
import { colors } from "@shared/colors";
import { spacing } from "@shared/spacing";

interface ErrorProps {
  message: string;
  onRetry?: () => void;
  retryText?: string;
  style?: ViewStyle;
}

export const Error: React.FC<ErrorProps> = ({
  message,
  onRetry,
  retryText = "Retry",
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text variant="error" style={styles.message}>
        {message}
      </Text>
      {onRetry && (
        <Button
          title={retryText}
          onPress={onRetry}
          variant="text"
          textStyle={styles.retryButton}
        />
      )}
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
  message: {
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  retryButton: {
    color: colors.primary,
  },
});
