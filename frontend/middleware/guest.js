export default function ({ store, redirect }) {
  if (store.state.auth.loggedIn) {
    if (store.state.auth.user.role === "ADMIN_UTAMA") {
      redirect("/dashboard-admin");
    }
    if (store.state.auth.user.role === "ADMIN_DAERAH") {
      redirect("/dashboard-admin-daerah");
    }
    if (store.state.auth.user.role === "USER") {
      redirect("/dashboard-user");
    }
  }
}
