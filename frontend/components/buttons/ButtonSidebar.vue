<template>
  <NuxtLink
    :to="to"
    class="flex items-center rounded-xl py-2 px-4 bg-[#ffffff]"
  >
    <div
      class="bg-primary_dark rounded-2xl w-[48px] h-[48px] flex justify-center items-center"
    >
      <i :class="iconClasses"></i>
    </div>
    <div>
      <p class="text-paragaph ps-6 text-primary_dark capitalize">{{ label }}</p>
    </div>
  </NuxtLink>
</template>

<script>
import "remixicon/fonts/remixicon.css";

export default {
  name: "ButtonSidebar",
  props: {
    to: {
      type: [String, Object],
      required: true,
    },
    iconClasses: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.nuxt-link-exact-active {
  @apply shadow-xl;
}
</style>
