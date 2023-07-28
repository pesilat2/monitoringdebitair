<template>
  <div class="bg-gradient-to-r from-primary_dark to-primary h-full">
    <Notification :duration="5000" />
    <nuxt-child />
  </div>
</template>

<script>
import Notification from "~/components/Notification.vue";

export default {
  name: "Default",
  components: {
    Notification,
  },
};
</script>
