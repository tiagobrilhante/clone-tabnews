module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "chore",
        "feat",
        "fix",
        "refactor",
        "ci",
        "revert",
        "docs",
        "style",
        "test",
        "build",
        "perf",
      ],
    ],
    "header-max-length": [2, "always", 300], // Define limite maior, como 300 caracteres
    "body-max-length": [2, "always", 500], // Define limite maior, como 300 caracteres
    "body-max-line-length": [0],
    "body-empty": [0], // Define limite maior, como 300 caracteres
    "subject-full-stop": [0], // Permite o título sem ponto final
    "subject-case": [0], // Permite qualquer caixa no título
  },
};
