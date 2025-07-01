export const nameRules = [
  (v) => !!v || "Nome é obrigatório",
  (v) => v.length >= 2 || "Nome deve ter pelo menos 2 caracteres",
];

export const emailRules = [
  (v) => !!v || "Email é obrigatório",
  (v) => /.+@.+\..+/.test(v) || "Email deve ser válido",
];

export const passwordRules = [
  (v) => !!v || "Senha é obrigatória",
  (v) => v.length >= 6 || "Senha deve ter pelo menos 6 caracteres",
];

export const termsRules = [
  (v) => !!v || "Você deve aceitar os termos e condições",
];

export const isSignUpFormValid = (name, email, password, terms) => {
  return (
    name.length >= 2 &&
    email &&
    /.+@.+\..+/.test(email) &&
    password.length >= 6 &&
    terms
  );
};

export const sanitizeUserData = (userData) => {
  return {
    name: userData.name?.trim(),
    email: userData.email?.trim().toLowerCase(),
    password: userData.password,
  };
};
