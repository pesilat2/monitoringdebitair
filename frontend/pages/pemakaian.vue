<template>
  <div>
    <Header iconClasses="ri-order-play-line" title="pemakaian" />
    <div class="p-6 w-full">
      <OrderInput />
      <OrderList />
    </div>
  </div>
</template>

<script>
import OrderInput from "~/components/OrderInput.vue";
import OrderList from "~/components/OrderList.vue";
import Header from "~/components/Header.vue";
export default {
  components: {
    OrderInput,
    OrderList,
    Header,
  },
  async createRegion(regionData) {
    console.log("region data", regionData);
    try {
      // Kirim permintaan ke server untuk membuat pengguna baru
      const response = await this.$axios.post("/regions", {
        name: regionData.nama,
      });

      console.log("respon", response);
      if (response.status === 201) {
        const newRegion = {
          index: 1,
          id: response.data.data.regionId,
          nama: regionData.nama,
        };

        console.log("newRegion", newRegion);

        this.tableData.unshift(newRegion);

        for (let i = 1; i < this.tableData.length; i++) {
          this.tableData[i].index = i + 1;
        }

        this.addNotification({
          message: "Desa baru berhasil dibuat!",
          status: "success",
        });
      } else {
        this.addNotification({
          message: "Gagal membuat desa baru. Silakan coba lagi.",
          status: "error",
        });
      }
    } catch (error) {
      this.addNotification({
        message: error.response.data.message,
        status: "error",
      });
    }
  },
};
</script>
