export const spacing = {
  // Base spacing units (multiples of 4 for consistency)
  xs: 4, // 4px
  sm: 8, // 8px
  md: 12, // 12px
  lg: 16, // 16px
  xl: 20, // 20px
  xxl: 24, // 24px
  xxxl: 32, // 32px

  // Semantic spacing (commonly used values)
  padding: {
    screen: 20, // Screen/container padding
    card: 16, // Card content padding
    input: 12, // Input field padding
    button: 12, // Button padding
  },

  margin: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },

  gap: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
} as const;

// Type for spacing values
export type SpacingValue = typeof spacing;
export type SpacingKey = keyof SpacingValue;
