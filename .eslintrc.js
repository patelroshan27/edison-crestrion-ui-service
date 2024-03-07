module.exports = {
    "root": true,
    "env": {
        es2021: true,
        browser: true,
        jest: true,
        node: true,
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended",
        "prettier"
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        "ecmaVersion": "latest",
        "sourceType": "module",
        project: './tsconfig.json',
    },
    "plugins": [
        "react",
        "prettier"
    ],
    "rules": {
        "n/handle-callback-err": "warn",
        "prettier/prettier": 1,
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/no-confusing-void-expression": "off",
        "@typescript-eslint/return-await": "off",
        "@typescript-eslint/promise-function-async": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-non-null-assertion" : "warn",
        "@typescript-eslint/consistent-type-imports": "warn"
    },
    settings: {
        "import/parsers": {
            "@typescript-eslint/parser": [".js", ".jsx", ".ts", ".tsx"],
        },
        react: {
            version: "detect",
        },
    },
    ignorePatterns: ['**/build/**/*.js', '.eslintrc.js', '*.config.js'],
}
