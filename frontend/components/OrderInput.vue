<template>
  <div class="bg-white w-full px-6 py-4">
    <h1 class="text-heading-4 text-black py-3">
      Silahkan masukan data untuk memesan
    </h1>
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
    <div class="w-full grid grid-cols-5 mt-4">
      <div
        class="col-span-2 bg-[#7895CB] h-16 flex justify-center items-center"
      >
        <div
          class="flex gap-5 h-12 items-center w-[50%] border border-black rounded hover:shadow-lg shadow-[#7895CB] transition-colors"
        >
          <input
            type="number"
            id="device"
            v-model="dataOrder.water"
            class="w-full h-full outline-none text-2xl px-4 text-[#7895CB]"
          />
        </div>
      </div>
      <div
        class="col-span-2 bg-[#7895CB] h-16 flex justify-center items-center"
      >
        <h1 class="text-white text-heading-4 font-heading-1">
          {{ loggedInUser.regionId }}
        </h1>
      </div>
      <div
        class="col-span-1 bg-[#7895CB] h-16 flex justify-center items-center"
      >
        <h1 class="text-white text-heading-4 font-heading-1">
          {{ sumPrice }}
        </h1>
      </div>
      <div
        class="col-span-1 col-end-6 mt-3 flex justify-center items-center h-14"
      >
        <Button type="button" primary label="Pesan" :click="onclick" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Button from "./Button.vue";
export default {
  components: {
    Button,
  },
  props: {
    dataOrder: {
      type: Object,
    },
    createOrder: {
      type: Function,
    },
  },
  data() {
    return {};
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
      this.$emit("order-created", this.dataOrder);
    },
  },
};
</script>
