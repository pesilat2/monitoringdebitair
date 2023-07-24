<template>
  <h2>sdfsfsdf</h2>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  middleware: "auth",
  computed: {
    ...mapGetters(["loggedInUser"]),
  },
  mounted() {
    console.log(this.loggedInUser);
  },
};
</script>
