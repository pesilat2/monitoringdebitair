<template>
  <div class="p-6 w-full">
    <OrderInput />
    <OrderList />
  </div>
</template>

<script>
import OrderInput from "~/components/OrderInput.vue";
import OrderList from "~/components/OrderList.vue";
export default {
  components: {
    OrderInput,
    OrderList,
  },
};
</script>
