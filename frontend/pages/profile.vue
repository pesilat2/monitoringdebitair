<template>
  <div class="w-full">
    <Header :title="headerTitle" :iconClasses="headerClass" />
  </div>
</template>

<script>
import Header from "~/components/Header.vue";
export default {
  components: {
    Header,
  },
  data() {
    return {
      headerTitle: "Profile",
      headerClass: "ri-file-user-fill text-heading-4 text-primary_dark",
    };
  },
};
</script>
