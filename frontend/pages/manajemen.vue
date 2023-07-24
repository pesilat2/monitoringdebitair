<template>
  <div class="w-full">
    <Header :title="headerTitle" :iconClasses="headerClass" />
    <div class="pt-5 px-6">
      <div class="mt-6">
        <CardItemLaporan
          :title="titleCard"
          :placeholder="placeholderCard"
          :tableData="tableData"
          :dashboardType="dashboardType"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "~/components/Header.vue";
import { dashboardData } from "~/helper/dataTableDaftarPengguna";
export default {
  components: {
    Header,
  },
  data() {
    return {
      headerTitle: "Manajemen Pengguna",
      headerClass: "ri-git-repository-fill text-heading-4 text-primary_dark",
      titleCard: "Daftar Pengguna",
      placeholderCard: "Cari Pengguna...",
      tableData: dashboardData,
      dashboardType: "daftarPengguna",
    };
  },
};
</script>
