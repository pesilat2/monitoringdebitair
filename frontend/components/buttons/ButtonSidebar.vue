<template>
  <div @click="logout(linkData.name)">
    <template v-if="linkData.name === 'signout'">
      <div
        class="flex items-center rounded-xl py-2 px-4 bg-[#ffffff] cursor-pointer"
      >
        <div
          class="bg-primary_dark rounded-2xl w-[48px] h-[48px] flex justify-center items-center"
        >
          <i :class="linkData.icon" class="text-white text-heading-4"></i>
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
        class="flex items-center rounded-xl py-2 px-4 bg-[#ffffff]"
      >
        <div
          class="bg-primary_dark rounded-2xl w-[48px] h-[48px] flex justify-center items-center"
        >
          <i :class="linkData.icon" class="text-white text-heading-4"></i>
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

export default {
  name: "ButtonSidebar",
  props: {
    linkData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    logout(name) {
      console.log(name);
      if (name === "signout") {
        console.log("masuk");
        this.$auth.logout();
      }
    },
  },
};
</script>

<style>
.nuxt-link-exact-active {
  @apply shadow-xl;
}
</style>
