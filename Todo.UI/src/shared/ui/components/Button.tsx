import React from "react";
import { TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";
import { colors } from "@shared/colors";
import { spacing } from "@shared/spacing";
import { typography } from "@shared/typography";

type ButtonVariant = "primary" | "secondary" | "text";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
}

const getVariantStyles = (variant?: ButtonVariant, disabled?: boolean) => {
  const baseButton: ViewStyle = {
    paddingHorizontal: spacing.padding.button,
    paddingVertical: spacing.sm,
    borderRadius: spacing.xs,
    justifyContent: "center",
    alignItems: "center",
  };

  const baseText: TextStyle = {
    fontWeight: typography.fontWeight.bold,
  };

  switch (variant) {
    case "primary":
      return {
        button: [
          baseButton,
          { backgroundColor: disabled ? colors.gray : colors.primary },
        ],
        text: [baseText, { color: colors.white }],
      };
    case "secondary":
      return {
        button: [
          baseButton,
          {
            backgroundColor: colors.white,
            borderWidth: 1,
            borderColor: disabled ? colors.gray : colors.primary,
          },
        ],
        text: [baseText, { color: disabled ? colors.gray : colors.primary }],
      };
    case "text":
      return {
        button: [{ padding: 0, backgroundColor: "transparent" }],
        text: [{ color: disabled ? colors.gray : colors.primary }],
      };
    default:
      return {
        button: [baseButton, { backgroundColor: colors.primary }],
        text: [baseText, { color: colors.white }],
      };
  }
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  style,
  textStyle,
  disabled = false,
  loading = false,
}) => {
  const variantStyles = getVariantStyles(variant, disabled);

  return (
    <TouchableOpacity
      style={[variantStyles.button, style]}
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
    >
      <Text style={[variantStyles.text, textStyle]}>
        {loading ? "Loading..." : title}
      </Text>
    </TouchableOpacity>
  );
};
