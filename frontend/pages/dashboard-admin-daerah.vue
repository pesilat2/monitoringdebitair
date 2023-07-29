<template>
  <div class="">
    <h1>Dashboard admin daerah</h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  middleware: ["auth", "dashboard-access"],
  computed: {
    ...mapGetters(["loggedInUser"]),
  },
};
</script>
