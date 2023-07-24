<template>
  <button @click="logout">logout</button>
</template>

<script>
export default {
  methods: {
    logout() {
      console.log("test");
      this.$auth.logout();
    },
  },
};
</script>
