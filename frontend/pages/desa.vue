<template>
  <div class="w-full">
    <Header :title="headerTitle" :iconClasses="headerClass" />
    <div class="p-4">
      <div>
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
export default {
  data() {
    return {
      headerTitle: "Manajemen Desa",
      headerClass: "ri-ancient-gate-fill text-heading-4 text-primary_dark",
      titleCard: "Daftar Desa",
      placeholderCard: "Cari Nama Desa...",
      tableData: [],
      dashboardType: "daftarDesa",
    };
  },
  async fetch() {
    this.$store.commit("loading/setLoading", true);
    try {
      const data = await this.$axios.$get("/regions");
      console.log(data);
      const regions = data.data.regions.map((region, index) => {
        return {
          index: index + 1,
          id: region.id,
          nama: region.name,
        };
      });
      console.log(regions);
      this.tableData = regions;
      this.$store.commit("loading/setLoading", false);
    } catch (err) {
      this.error = err;
      console.error(err);
    }
  },
};
</script>

<style></style>
