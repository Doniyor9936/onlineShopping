module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  root: true,
  env: {
    node: true,
  },
  rules: {
    "prettier/prettier": ["error"],
    "@typescript-eslint/no-unused-vars": ["warn"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "warn",
  },
};
