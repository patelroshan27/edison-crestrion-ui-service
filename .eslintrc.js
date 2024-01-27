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
        "prettier/prettier": 1,
        "@typescript-eslint/strict-boolean-expressions": "off",
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
