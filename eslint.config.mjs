import unjs from "eslint-config-unjs"

export default unjs({
  ignores: [
    "dist",
    "node_modules"
  ],
  rules: {
    "space-before-function-paren": "off",
    "unicorn/filename-case": "off",
    "unicorn/no-array-callback-reference": "off"
  },
})
