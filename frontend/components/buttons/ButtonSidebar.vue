<template>
  <div @click="logout(linkData.name)">
    <template v-if="linkData.name === 'signout'">
      <div
        class="container flex items-center rounded-xl py-2 px-4 bg-[#fcfcfc] cursor-pointer hover:scale-105 transition-transform duration-200 hover:shadow-customdua"
      >
        <div
          class="box bg-white rounded-2xl w-[48px] h-[48px] flex justify-center items-center shadow-customdua transition-colors duration-200"
        >
          <i
            :class="linkData.icon"
            class="text-primary_dark text-heading-4 icon"
          ></i>
        </div>
        <div>
          <p class="text-paragaph ps-6 text-primary_dark capitalize">
            {{ linkData.name }}
          </p>
        </div>
      </div>
    </template>
    <template v-else>
      <NuxtLink
        :to="linkData.path"
        class="container flex items-center rounded-xl py-2 px-4 bg-[#fcfcfc] hover:shadow-customdua hover:scale-105 transition-transform duration-200"
      >
        <div
          class="box bg-white rounded-2xl w-[48px] h-[48px] flex justify-center items-center shadow-customdua transition-colors duration-200"
        >
          <i
            :class="linkData.icon"
            class="text-primary_dark icon text-heading-4"
          ></i>
        </div>
        <div>
          <p class="text-paragaph ps-6 text-primary_dark capitalize">
            {{ linkData.name }}
          </p>
        </div>
      </NuxtLink>
    </template>
  </div>
</template>

<script>
import "remixicon/fonts/remixicon.css";
import { mapMutations } from "vuex";

export default {
  name: "ButtonSidebar",
  props: {
    linkData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapMutations(["addNotification"]),
    logout(name) {
      if (name === "signout") {
        this.$auth.logout();
        this.addNotification({
          status: "success",
          message: "Anda Telah Keluar",
        });
      }
    },
  },
};
</script>

<style>
.nuxt-link-exact-active {
  @apply shadow-customdua scale-105 transition-transform duration-200;
}
.nuxt-link-exact-active .box {
  @apply bg-primary_dark;
}
.nuxt-link-exact-active .box .icon {
  @apply text-white;
}
.container:hover .box {
  @apply bg-primary_dark;
}
.container:hover .box {
  @apply bg-primary_dark;
}
.container:hover .box .icon {
  @apply text-white;
}
</style>
