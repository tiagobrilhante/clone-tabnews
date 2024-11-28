module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["chore", "feat", "fix", "refactor", "ci", "revert"],
    ],
    "header-max-length": [2, "always", 100], // Define limite maior, como 100 caracteres
    "subject-full-stop": [0], // Permite o título sem ponto final
    "subject-case": [0], // Permite qualquer caixa no título
  },
};
