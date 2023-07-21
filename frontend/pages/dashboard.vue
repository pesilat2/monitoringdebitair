<template>
  <div class="w-full">
    <Header :title="headerTitle" :iconClasses="headerClass" />
    <div class="pt-5 px-6">
      <h1 class="text-heading-4 text-black font-heading-1">
        Laporan Debit Air Keluar Semua Daerah
      </h1>
    </div>
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
      headerTitle: "Dashboard",
      headerClass: "ri-home-4-fill text-heading-4 text-primary_dark",
    };
  },
};
</script>
