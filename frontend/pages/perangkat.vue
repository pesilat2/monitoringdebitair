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
      headerTitle: "Manajemen Perangkat",
      headerClass: "ri-rfid-line text-heading-4 text-primary_dark",
      titleCard: "Daftar Perangkat",
      placeholderCard: "Cari Nama Perangkat...",
      tableData: [],
      dashboardType: "daftarPerangkat",
    };
  },
  async fetch() {
    this.$store.commit("loading/setLoading", true);
    try {
      const data = await this.$axios.$get("/devices");
      const devices = data.data.devices.map((device, index) => {
        return {
          index: index + 1,
          id: device.id,
          id_region: device.regionId,
          nama_perangkat: device.name,
          maksimum_air: device.max,
          harga: device.price,
        };
      });
      this.tableData = devices;
      this.$store.commit("loading/setLoading", false);
    } catch (err) {
      this.error = err;
      console.error(err);
    }
  },
};
</script>

<style></style>
