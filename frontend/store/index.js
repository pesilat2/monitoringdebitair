export const getters = {
  isAuthenticated(state) {
    console.log(state.auth.loggedIn);
    return state.auth.loggedIn;
  },
  loggedInUser(state) {
    return state.auth.user;
  },
};
