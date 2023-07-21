<template>
  <div class="bg-[#D8E5F1] flex">
    <Sidebar />
    <nuxt-child />
  </div>
</template>

<script>
import Sidebar from "~/components/Sidebar.vue";

export default {
  name: "Default",
  conmponents: {
    Sidebar,
  },
};
</script>
