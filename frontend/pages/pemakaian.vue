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
};
</script>
