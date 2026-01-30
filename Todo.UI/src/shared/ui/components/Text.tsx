import React from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from "react-native";
import { colors } from "@shared/colors";
import { typography } from "@shared/typography";

type TextVariant = "header" | "body" | "caption" | "error";

interface CustomTextProps extends RNTextProps {
  children: React.ReactNode;
  variant?: TextVariant;
}

const getVariantStyle = (variant?: TextVariant) => {
  switch (variant) {
    case "header":
      return styles.header;
    case "body":
      return styles.body;
    case "caption":
      return styles.caption;
    case "error":
      return styles.error;
    default:
      return styles.body;
  }
};

export const Text: React.FC<CustomTextProps> = ({
  children,
  style,
  variant,
  ...props
}) => {
  const variantStyle = getVariantStyle(variant);
  return (
    <RNText style={[variantStyle, style]} {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.black,
  },
  body: {
    fontSize: typography.fontSize.md,
    color: colors.black,
  },
  caption: {
    fontSize: typography.fontSize.sm,
    color: colors.gray,
  },
  error: {
    fontSize: typography.fontSize.md,
    color: colors.red,
  },
});
