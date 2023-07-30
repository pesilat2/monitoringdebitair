<template></template>

<script>
export default {
  methods: {
    testReport() {
      this.$axios.$post("/report").then((res) => {});
    },
  },
};
</script>

<style></style>
