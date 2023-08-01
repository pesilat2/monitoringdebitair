<!-- layouts/parentLayout.vue -->
<template>
  <div class="overflow-hidden w-full relative">
    <Notification :duration="5000" />
    <transition name="fade" mode="out-in" />
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
<style>
/* Definisikan efek transisi */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to /* .fade-leave-active di versi Vue sebelum 2.1.8 */ {
  opacity: 0;
}
</style>
