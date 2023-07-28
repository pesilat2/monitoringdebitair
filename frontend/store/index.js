export const state = () => ({
  notification: {
    message: "test",
    status: "error",
  },
});

export const mutations = {
  closeNotification(state) {
    state.notification.message = "";
  },
  addNotification(state, product) {
    state.notification = product;
  },
  clearCart(state) {
    state.items = [];
  },
};

export const getters = {
  notification: (state) => state.notification,
  isAuthenticated(state) {
    console.log(state.auth.loggedIn);
    return state.auth.loggedIn;
  },
  loggedInUser(state) {
    return state.auth.user;
  },
  userRole(state) {
    return state.auth.user.role; // Mengambil nilai role dari user
  },
  routes(state) {
    let path = "";
    if (state.auth.user.role === "ADMIN_UTAMA") {
      path = "/dashboard-admin-utama";
    } else if (state.auth.user.role === "ADMIN_DAERAH") {
      path = "/dashboard-admin-daerah";
    } else {
      path = "/dashboard-user";
    }
    const links = [
      {
        name: "dashboard",
        path: path,
        icon: "ri-home-4-fill",
      },
      {
        name: "pemakaian",
        path: "/pemakaian",
        icon: "ri-order-play-line",
      },
      {
        name: "profile",
        path: "/profile",
        icon: "ri-file-user-fill",
      },
      {
        name: "manajemen pengguna",
        path: "/manajemen",
        icon: "ri-git-repository-fill",
        type: "ADMIN_UTAMA",
      },
      {
        name: "manajemen perangkat",
        path: "/perangkat",
        icon: "ri-rfid-line",
        type: "ADMIN_UTAMA",
      },
    ];
    return links;
  },
};
