<template>
  <div class="w-full">
    <Header iconClasses="ri-order-play-line" title="pemakaian" />
    <div class="p-4 w-full">
      <OrderInput @order-created="handleCreateOrder" />
      <OrderList :listOrder="listOrder" />
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
  data() {
    return {
      listOrder: [],
    };
  },
  methods: {
    handleCreateOrder(orderData) {
      this.listOrder.unshift(orderData);
      for (let i = 1; i < this.listOrder.length; i++) {
        this.listOrder[i].index = i + 1;
      }
    },
  },
  mounted() {
    console.log(this.listOrder);
  },
  async fetch() {
    try {
      const res = await this.$axios.$get("/orders");
      const data = res.data.map((order, index) => {
        return {
          id: order.id,
          index: index + 1,
          quantity: order.quantity,
          totalPrice: order.totalPrice,
          userId: order.userId,
          deviceId: order.deviceId,
          fullname: order.User.fullname,
          deviceName: order.Device.name,
        };
      });
      console.log("data order", data);
      this.listOrder = data;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
