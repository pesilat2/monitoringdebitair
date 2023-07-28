<template>
  <section>
    <div
      class="hidden -left-full top-0 lg:opacity-100 lg:left-0 lg:block min-h-screen h-full w-[300px] bg-white shadow-2xl z-20 relative"
      :class="{ active: showNavbar, closing: isClosing }"
    >
      <div class="absolute top-0 right-0 lg:hidden" @click="toggleNavbar">
        <i class="ri-close-line text-heading-3 text-primary cursor-pointer"></i>
      </div>
      <div class="flex justify-center items-center border-b-2 border-primary">
        <h1 class="text-heading-1 font-heading-1 text-primary px-11 py-8">
          Dashboard
        </h1>
      </div>
      <div class="pt-10 px-6 flex flex-col gap-6">
        <ButtonSidebar
          v-for="link of filteredLinks"
          :key="link.nama"
          :linkData="link"
        />
        <ButtonSidebar :linkData="signout" />
      </div>
    </div>
    <div
      class="overlay z-10"
      :class="{ showActive: showOverlay, closing: isClosing }"
      @click="toggleNavbar"
    ></div>
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import ButtonSidebar from "~/components/buttons/ButtonSidebar.vue";
import { signout } from "~/helper/link";
import "remixicon/fonts/remixicon.css";

export default {
  name: "Sidebar",
  components: {
    ButtonSidebar,
  },
  computed: {
    ...mapState({
      showNavbar: (state) => state.sidebar.showNavbar,
      showOverlay: (state) => state.sidebar.showOverlay,
    }),
    ...mapGetters(["userRole", "routes"]),
    filteredLinks() {
      return this.getFilteredLinks(); // Panggil metode getFilteredLinks()
    },
  },
  data() {
    return {
      isAdmin: false,
      signout,
      isClosing: false,
    };
  },
  methods: {
    toggleNavbar() {
      if (this.showNavbar && this.showOverlay) {
        this.isClosing = true; // Memulai animasi penutupan
        setTimeout(() => {
          this.isClosing = false; // Setelah animasi selesai, kembalikan ke false
          this.$store.commit("sidebar/toggleNavbar");
        }, 500); // Sesuaikan durasi animasi dengan durasi di keyframes zoomOut
      } else {
        this.$store.commit("sidebar/toggleNavbar");
      }
    },
    getFilteredLinks() {
      const role = this.userRole; // Dapatkan role pengguna dari getter
      if (!role) return this.routes; // Jika role tidak ada atau null, tampilkan semua links
      return this.routes.filter((link) => !link.type || link.type === role); // Filter links sesuai dengan role pengguna
    },
  },
};
</script>

<style scoped>
.overlay {
  @apply fixed top-0 left-0 w-full h-full bg-black/50 opacity-0 pointer-events-none;
  transition: opacity 0.3s ease-in-out;
}

.overlay.showActive {
  @apply opacity-100 pointer-events-auto cursor-pointer w-full h-full;
}

.active {
  @apply fixed block;
  animation: slideIn 0.5s ease forwards;
}

.closing {
  animation: slideOout 0.5s ease forwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    left: -100%;
  }
  to {
    opacity: 1;
    left: 0;
  }
}

@keyframes slideOout {
  from {
    opacity: 1;
    left: 0;
  }
  to {
    opacity: 0;
    left: -100%;
  }
}
</style>
