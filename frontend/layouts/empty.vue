<template>
  <div class="bg-gradient-to-r from-primary_dark to-primary h-full">
    <nuxt-child />
  </div>
</template>

<script>
import Header from "~/components/Header.vue";
import Sidebar from "~/components/Sidebar.vue";

export default {
  name: "Default",
  conmponents: {
    Header,
    Sidebar,
  },
};
</script>
