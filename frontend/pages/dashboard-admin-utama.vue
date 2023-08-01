<template>
  <div class="w-full">
    <Header :title="headerTitle" :iconClasses="headerClass" />
    <div class="p-4">
      <h1 class="text-heading-4 text-black font-heading-1 mb-4">
        Laporan Debit Air Keluar Semua Daerah
      </h1>
      <div>
        <Statistik />
      </div>
      <div class="mt-4">
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
import CardItemLaporan from "~/components/card/CardItemLaporan.vue";
import Statistik from "~/components/statistik/Statistik.vue";
import { dashboardData } from "~/helper/dataTableLaporan";
import { mapGetters } from "vuex";

export default {
  middleware: ["auth", "dashboard-access"],
  computed: {
    ...mapGetters(["loggedInUser"]),
  },
  components: {
    Header,
    Chart,
    CardItemLaporan,
    Statistik,
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
  async fetch() {
    // fetch data
    // await this.$axios
    //   .$get("/cobareport")
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     this.error = err;
    //   });

    // fetch regions
    await this.$axios
      .$get("/regions")
      .then((data) => {
        const regions = data.data.regions.map((region) => {
          return {
            id: region.id,
            name: region.name,
            value: region.id,
          };
        });
        this.dataRegions = regions;
      })
      .catch((err) => {
        this.error = err;
      });
  },
};
</script>
