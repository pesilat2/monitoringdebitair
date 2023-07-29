<!-- layouts/parentLayout.vue -->
<template>
  <div>
    <Notification :duration="5000" />

    <slot />
  </div>
</template>

<script>
import Notification from "~/components/Notification.vue";

export default {
  components: {
    Notification,
  },
};
</script>
