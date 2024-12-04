export const FEATURES = {
  MAX_NESTING_LEVEL: process.env.NEXT_PUBLIC_DISABLE_MAX_NESTING === "true" ? Infinity : 4,
  SHOW_EASTER_EGGS: process.env.NEXT_PUBLIC_DISABLE_EASTER_EGGS !== "true",
  USE_MOCK_DATA: process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false",
} as const;
