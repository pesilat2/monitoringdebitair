<template>
  <div class="bg-white w-full px-6 py-4 mt-6">
    <h1 class="text-heading-4 text-black py-3">Pesanan Air Saya</h1>
    <!-- table head -->
    <div class="w-full grid grid-cols-5">
      <div
        class="col-span-2 border-2 border-[#7895CB] h-12 flex justify-center items-center"
      >
        <h1 class="text-[#7895CB] text-heading-4 font-heading-1">
          Debit air /liter
        </h1>
      </div>
      <div
        class="col-span-2 border-2 border-[#7895CB] h-12 flex justify-center items-center"
      >
        <h1 class="text-[#7895CB] text-heading-4 font-heading-1">Perangkat</h1>
      </div>
      <div
        class="col-span-1 border-2 border-[#7895CB] h-12 flex justify-center items-center"
      >
        <h1 class="text-[#7895CB] text-heading-4 font-heading-1">Harga</h1>
      </div>
    </div>
    <!-- item table -->
    <ItemOrder v-for="item of listOrder" :key="item.index" :data="item" />
  </div>
</template>

<script>
import Button from "./Button.vue";
import ItemOrder from "~/components/ItemOrder.vue";
export default {
  components: {
    Button,
    ItemOrder,
  },
  props: {
    listOrder: Array,
  },
  async fetch() {
    try {
      const res = await this.$axios.$get("/orders");
      const data = res.data;
      console.log(data);
      this.listOrder = data;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
