<template>
  <div>
    <Header iconClasses="ri-order-play-line" title="pemakaian" />
    <div class="p-6 w-full">
      <OrderInput :dataOrder="dataOrder" @order-created="createOrder" />
      <OrderList :listOrder="listOrder" />
    </div>
  </div>
</template>

<script>
import OrderInput from "~/components/OrderInput.vue";
import OrderList from "~/components/OrderList.vue";
import Header from "~/components/Header.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    OrderInput,
    OrderList,
    Header,
  },
  data() {
    return {
      listOrder: [],
      dataOrder: {
        water: 0,
        regionId: "",
        price: 0,
      },
    };
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
  },
  async createOrder(orderData) {
    console.log("order data", orderData);
    try {
      // Kirim permintaan ke server untuk membuat order baru
      const response = await this.$axios.post("/order", {
        amount_of_water: orderData.water,
        deviceId: this.loggedInUser.regionId,
        userId: this.loggedInUser.Id,
        total_cost: orderData.price,
      });

      console.log("response", response);

      console.log("respon", response);
      if (response.status === 201) {
        const newOrder = {
          index: 1,
          regionId: this.loggedInUser.regionId,
          userId: this.loggedInUser.Id,
          water: orderData.water,
          price: orderData.price,
        };

        console.log("newOrder", newOrder);

        this.listOrder.unshift(newOrder);

        for (let i = 1; i < this.listOrder.length; i++) {
          this.listOrder[i].index = i + 1;
        }

        this.addNotification({
          message: "Pembelian berhasil. Jangan lupa order lagi ya!",
          status: "success",
        });
      } else {
        this.addNotification({
          message: "Gagal membuat orderan baru. Silakan coba lagi.",
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
