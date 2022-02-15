module.exports = {
  "extends": ["next", "prettier"],
  "rules": {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".tsx"] }],
    "react/jsx-props-no-spreading": "off",
    "react/function-component-definition": "off",
    "no-console": "warn",
    "eol-last": "error",
    "arrow-spacing": "error",
    "jsx-quotes": [
      "error",
      "prefer-single"
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    "indent": ["error", 2],
    "react/destructuring-assignment": "off",
    "react/no-invalid-html-attribute": "off",
    "react/no-danger": "off",
    "import/no-extraneous-dependencies": "off",
    "no-restricted-exports": "off",
    "import/prefer-default-export": "off",
    "react/require-default-props": "off",
    "react/no-unescaped-entities": "off",
  
    // temp disable
    "import/no-anonymous-default-export": "off",
    "@next/next/no-img-element": "off",

    // not sure:
    "jsx-a11y/label-has-associated-control": "off"
  },
};
