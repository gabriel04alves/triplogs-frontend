import { authState } from "./state.js";
import { authGetters } from "./getters.js";
import { authActions } from "./authActions.js";
import { registrationActions } from "./registrationActions.js";
import { tokenActions } from "./tokenActions.js";
import { userActions } from "./userActions.js";

export const allAuthActions = {
  ...authActions,
  ...registrationActions,
  ...tokenActions,
  ...userActions,
};

export {
  authState,
  authGetters,
  authActions,
  registrationActions,
  tokenActions,
  userActions,
};
