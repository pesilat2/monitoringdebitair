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
};
</script>
