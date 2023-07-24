<template>
  <div class="w-full">
    <Header :title="headerTitle" :iconClasses="headerClass" />
    <div class="pt-5 px-6">
      <h1 class="text-heading-4 text-black font-heading-1 mb-6">
        Laporan Debit Air Keluar Semua Daerah
      </h1>
      <div>
        <Chart />
      </div>
      <div class="mt-6">
        <CardStatistik />
      </div>
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
import Chart from "~/components/Chart.vue";
import CardStatistik from "~/components/CardStatistik.vue";
import CardItemLaporan from "~/components/card/CardItemLaporan.vue";
import { dashboardData } from "~/helper/dataTableLaporan";

export default {
  components: {
    Header,
    Chart,
    CardStatistik,
    CardItemLaporan,
  },
  data() {
    return {
      headerTitle: "Dashboard",
      headerClass: "ri-home-4-fill text-heading-4 text-primary_dark",
      titleCard: "Detail Laporan Debit Air Keluar Semua Daerah",
      placeholderCard: "Cari Daerah...",
      tableData: dashboardData.adminUtama,
      dashboardType: "adminUtama",
    };
  },
};
</script>
