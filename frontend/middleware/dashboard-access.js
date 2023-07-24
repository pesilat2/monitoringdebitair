// middleware/dashboard-access.js
export default function ({ store, route, redirect }) {
  // Ambil role dari store atau sesuaikan dengan cara Anda mengambil role pengguna
  const role = store.state.auth.user.role;

  // Tentukan halaman dashboard yang diizinkan berdasarkan rolenya
  const allowedDashboardPages = {
    ADMIN_UTAMA: ["/dashboard-admin-utama"],
    ADMIN_DAERAH: ["/dashboard-admin-daerah"],
    USER: ["/dashboard-user"],
  };

  // Jika role pengguna tidak termasuk dalam halaman yang diizinkan, redirect ke halaman yang sesuai dengan rolenya
  if (!allowedDashboardPages[role].includes(route.path)) {
    return redirect(allowedDashboardPages[role][0]);
  }
}
