/// <reference types="@testing-library/jest-dom" />

// Fixes Vitest type errors
declare module "vitest" {
  interface JestMatchers<R = void, T = {}> {
    toBeInTheDocument(): R;
    toHaveStyle(style: Record<string, any>): R;
    toHaveClass(className: string): R;
  }
}
