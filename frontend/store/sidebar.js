export const state = () => ({
  showNavbar: false, // Inisialisasi status tampilan Navbar
  showOverlay: false,
});

export const mutations = {
  toggleNavbar(state) {
    state.showNavbar = !state.showNavbar; // Mutasi untuk toggle status tampilan Navbar
    state.showOverlay = !state.showOverlay;
  },
};
