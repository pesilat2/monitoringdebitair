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
    <ItemOrder v-for="item of listOrder" :key="item.id" :data="item" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Button from "./Button.vue";
import ItemOrder from "~/components/ItemOrder.vue";
export default {
  components: {
    Button,
    ItemOrder,
  },
  data() {
    return {
      listOrder: [
        { water: 6, regionId: "region4", price: 4000, id: 1 },
        { water: 3, regionId: "region4", price: 6000, id: 2 },
        { water: 7, regionId: "region4", price: 3000, id: 3 },
        { water: 9, regionId: "region4", price: 6000, id: 4 },
      ],
    };
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
    sumPrice() {
      return this.dataOrder.water * 5000;
    },
  },
  mounted() {
    console.log(this.loggedInUser);
  },
  methods: {
    onclick() {
      this.dataOrder = {
        water: this.dataOrder.water,
        regionId: this.loggedInUser.regionId,
        price: this.sumPrice,
      };
      console.log(this.dataOrder);
    },
  },
};
</script>
