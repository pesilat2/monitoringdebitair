export default function ({ store, redirect }) {
  if (store.state.auth.loggedIn) {
    if (store.state.auth.user.role === "ADMIN_UTAMA") {
      return redirect("/dashboard-admin");
    }
    if (store.state.auth.user.role === "ADMIN_DAERAH") {
      return redirect("/dashboard-admin-daerah");
    }
    if (store.state.auth.user.role === "USER") {
      return redirect("/dashboard-user");
    }
  }
}
