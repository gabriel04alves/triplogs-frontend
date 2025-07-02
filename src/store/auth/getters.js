export const authGetters = {
  isLoggedIn: (state) => !!state.accessToken && state.isAuthenticated,
  getUser: (state) => state.user,
  getError: (state) => state.error,
  isLoading: (state) => state.loading,
  getUserName: (state) => state.user?.name || "",
  getUserEmail: (state) => state.user?.email || "",
  hasToken: (state) => !!state.accessToken,
};
