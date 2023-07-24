<template>
  <h1>Dashboard admin daerah</h1>
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
