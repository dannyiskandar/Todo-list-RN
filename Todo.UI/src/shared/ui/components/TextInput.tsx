import React from "react";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  TextStyle,
} from "react-native";
import { colors } from "@shared/colors";
import { spacing } from "@shared/spacing";

type TextInputVariant = "default" | "edit";

interface CustomTextInputProps extends RNTextInputProps {
  variant?: TextInputVariant;
  style?: TextStyle;
}

const getVariantStyle = (variant?: TextInputVariant) => {
  switch (variant) {
    case "edit":
      return styles.edit;
    case "default":
    default:
      return styles.default;
  }
};

export const TextInput = React.forwardRef<RNTextInput, CustomTextInputProps>(
  ({ variant = "default", style, ...props }, ref) => {
    const variantStyle = getVariantStyle(variant);
    return (
      <RNTextInput
        ref={ref}
        style={[variantStyle, style]}
        placeholderTextColor={colors.gray}
        {...props}
      />
    );
  },
);

TextInput.displayName = "TextInput";

const styles = StyleSheet.create({
  default: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: spacing.xs,
    padding: spacing.padding.input,
    backgroundColor: colors.white,
  },
  edit: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: spacing.xs,
    padding: spacing.xs,
    backgroundColor: colors.white,
  },
});
