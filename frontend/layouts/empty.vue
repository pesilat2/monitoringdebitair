<template>
  <parent-layout>
    <div class="bg-gradient-to-r from-primary_dark to-primary h-full">
      <nuxt-child />
    </div>
  </parent-layout>
</template>

<script>
import ParentLayout from "./parentLayout.vue";

export default {
  name: "Default",
  components: {
    Notification,
    ParentLayout,
  },
};
</script>
