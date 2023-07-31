export const state = () => ({
  notification: {
    message: "",
    status: "",
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
  editPhotoProfile(state, imageProfile) {
    state.auth.user = { ...state.auth.user, imageProfile };
  },
  editDataProfile(state, dataProfile) {
    state.auth.user = { ...state.auth.user, ...dataProfile };
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
    let nameDashboard = {
      ADMIN_UTAMA: "/dashboard-admin-utama",
      ADMIN_DAERAH: "/dashboard-admin-daerah",
      USER: "/dashboard-user",
    };
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
        type: "ADMIN_UTAMA",
      },
      {
        name: "pemakaian",
        path: "/pemakaian",
        icon: "ri-order-play-line",
        type: "ADMIN_DAERAH",
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
        name: "manajemen pengguna",
        path: "/manajemen-pengguna-daerah",
        icon: "ri-git-repository-fill",
        type: "ADMIN_DAERAH",
      },
      {
        name: "manajemen perangkat",
        path: "/perangkat",
        icon: "ri-rfid-line",
        type: "ADMIN_UTAMA",
      },
      {
        name: "manajemen desa",
        path: "/desa",
        icon: "ri-ancient-gate-fill",
        type: "ADMIN_UTAMA",
      },
    ];
    return links;
  },
};
