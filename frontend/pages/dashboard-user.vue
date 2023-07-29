<template>
  <div>
    <h1>Dashboard admin user</h1>
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
