{
  "env": {
    "es2021": true,
    "node": true,
    "jest": true
  },
  "globals": {
    "fetch": true,
    "__DEV__": true,
    "AbortController": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "plugins": [
    "react",
    "jest",
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "linebreak-style": [
      "error",
      "unix"
    ],
    "max-classes-per-file": "error",
    "prefer-regex-literals": "warn",
    "array-bracket-newline": [
      "error",
      {
        "multiline": true
      }
    ],
    "curly": "warn",
    "no-else-return": "error",
    "no-multi-spaces": "error",
    "no-multiple-empty-lines": "error",
    "no-nested-ternary": "error",
    "no-trailing-spaces": "error",
    "no-useless-rename": "error",
    "no-var": "error",
    "prefer-const": [
      "error",
      {
        "destructuring": "all"
      }
    ],
    "@typescript-eslint/quotes": [
      "error",
      "single",
      {
        "avoidEscape": true
      }
    ],
    "@typescript-eslint/semi": [
      "error",
      "never"
    ],
    "@typescript-eslint/comma-dangle": [
      "error",
      "always-multiline"
    ],
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-use-before-define": "error",
    "@typescript-eslint/no-useless-constructor": "error",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "default",
        "format": [
          "camelCase",
          "PascalCase"
        ]
      },
      {
        "selector": "variableLike",
        "format": [
          "camelCase",
          "PascalCase"
        ]
      },
      {
        "selector": "enumMember",
        "format": [
          "PascalCase"
        ]
      },
      {
        "selector": "typeLike",
        "format": [
          "PascalCase"
        ]
      }
    ],
    "@typescript-eslint/space-before-function-paren": [
      "error",
      {
        "named": "never"
      }
    ],
    "@typescript-eslint/no-extra-parens": "error",
    "@typescript-eslint/no-duplicate-imports": "error",
    "@typescript-eslint/indent": [
      "error",
      2,
      {
        "SwitchCase": 1,
        "ignoredNodes": [
          "FunctionExpression > .params[decorators.length > 0]",
          "FunctionExpression > .params > :matches(Decorator, :not(:first-child))",
          "ClassBody.body > PropertyDefinition[decorators.length > 0] > .key"
        ]
      }
    ],
    "@typescript-eslint/no-shadow": "error"
  },
  "overrides": [
    {
      "files": [
        "src/**/__tests__/*.{js,ts,tsx}"
      ],
      "rules": {
        "@typescript-eslint/no-unused-vars": "warn"
      }
    },
    {
      "files": [
        "src/i18n/*.ts",
        "src/theme/colors/*.ts"
      ],
      "rules": {
        "@typescript-eslint/naming-convention": "off"
      }
    },
    {
      "files": [
        "*.js",
        "*.tsx"
      ],
      "rules": {
        "@typescript-eslint/no-extra-parens": "off"
      }
    },
    {
      "files": [
        "*.js"
      ],
      "rules": {
        "max-classes-per-file": "warn",
        "array-bracket-newline": [
          "warn",
          {
            "multiline": true
          }
        ],
        "no-else-return": "warn",
        "prefer-const": [
          "warn",
          {
            "destructuring": "all"
          }
        ],
        "@typescript-eslint/quotes": [
          "warn",
          "single",
          {
            "avoidEscape": true
          }
        ],
        "@typescript-eslint/semi": [
          "warn",
          "never"
        ],
        "@typescript-eslint/comma-dangle": [
          "warn",
          "always-multiline"
        ],
        "@typescript-eslint/no-use-before-define": [
          "warn",
          {
            "functions": true,
            "classes": true,
            "variables": false
          }
        ],
        "@typescript-eslint/indent": [
          "warn",
          4
        ],
        "@typescript-eslint/no-shadow": "warn",
        "@typescript-eslint/no-empty-function": "warn"
      }
    }
  ],
  "ignorePatterns": [
    "node_modules/**/*"
  ]
}
