<template>
  <header class="w-full h-[138px] bg-white border-b-2 border-primary z-10">
    <div class="flex justify-between items-center w-full px-8 py-7">
      <div class="lg:hidden">
        <button @click="toggleNavbar">
          <i class="ri-menu-3-line text-primary text-heading-4"></i>
        </button>
      </div>
      <div>
        <div class="flex items-center gap-3">
          <i :class="iconClasses"></i>
          <div class="flex gap-2">
            <p class="text-primary_dark text-paragaph">/</p>
            <p class="text-primary_dark text-paragaph">{{ title }}</p>
          </div>
        </div>
        <div>
          <h4
            class="text-xl md:text-heading-4 font-heading-1 text-primary_dark"
          >
            {{ title }}
          </h4>
        </div>
      </div>
      <nuxt-link to="/profile" class="header-profile flex items-center gap-3">
        <div>
          <h1
            class="hidden md:block text-heading-4 text-primary font-heading-1"
          >
            {{ loggedInUser.fullname }}
          </h1>
        </div>
        <div>
          <img
            src="https://avatars.githubusercontent.com/640x640?technology"
            alt="avatar"
            class="rounded-full w-12"
          />
        </div>
      </nuxt-link>
    </div>
  </header>
</template>

<script>
import "remixicon/fonts/remixicon.css";
import { mapGetters } from "vuex";

export default {
  name: "Header",
  props: {
    title: {
      type: String,
      required: true,
    },
    iconClasses: {
      type: String,
      required: true,
    },
  },
  mounted() {
    console.log(this.$auth);
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
  },
  methods: {
    toggleNavbar() {
      this.$store.commit("sidebar/toggleNavbar");
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.header-profile {
  @apply shadow-none;
}
</style>
