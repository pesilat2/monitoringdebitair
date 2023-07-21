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
      headerTitle: "Manajemen Pengguna",
      headerClass: "ri-git-repository-fill text-heading-4 text-primary_dark",
    };
  },
};
</script>
