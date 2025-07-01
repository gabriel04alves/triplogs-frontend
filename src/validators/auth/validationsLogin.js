export const emailRules = [
  (v) => !!v || "Email é obrigatório",
  (v) => /.+@.+\..+/.test(v) || "Email deve ser válido",
];

export const passwordRules = [
  (v) => !!v || "Senha é obrigatória",
  (v) => v.length >= 6 || "Senha deve ter pelo menos 6 caracteres",
];

export const confirmPasswordRules = (password) => [
  (v) => !!v || "Confirmação de senha é obrigatória",
  (v) => v === password || "As senhas não coincidem",
];
export const nameRules = [
  (v) => !!v || "Nome é obrigatório",
  (v) => v.length >= 2 || "Nome deve ter pelo menos 2 caracteres",
  (v) => v.length <= 50 || "Nome deve ter no máximo 50 caracteres",
];

export const validateField = (value, rules) => {
  if (!value && value !== 0) return [];
  return rules.map((rule) => rule(value)).filter((result) => result !== true);
};

export const isFormValid = (...fields) => {
  return fields.every((field) => {
    const { value, rules } = field;
    return value && validateField(value, rules).length === 0;
  });
};
