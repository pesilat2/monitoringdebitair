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
            v-model="dataOrder.quantity"
            class="w-full h-full outline-none text-2xl px-4 text-[#7895CB]"
          />
        </div>
      </div>
      <div
        class="col-span-2 bg-[#7895CB] h-16 flex justify-center items-center"
      >
        <h1 class="text-white text-heading-4 font-heading-1">
          {{ loggedInUser.deviceName }}
        </h1>
      </div>
      <div
        class="col-span-1 bg-[#7895CB] h-16 flex justify-center items-center"
      >
        <h1 class="text-white text-heading-4 font-heading-1">
          {{ totalPrice }}
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
import { mapGetters, mapMutations } from "vuex";
import Button from "./Button.vue";

export default {
  components: {
    Button,
  },
  props: {},
  data() {
    return {
      dataOrder: {
        quantity: 0,
        deviceId: "",
        userId: "",
      },
    };
  },
  computed: {
    ...mapMutations(["closeNotification"]),
    ...mapGetters(["loggedInUser"]),
    totalPrice() {
      return this.dataOrder.quantity * 5000;
    },
  },
  methods: {
    ...mapMutations(["addNotification"]),
    onclick() {
      this.dataOrder = {
        deviceId: this.loggedInUser.deviceId,
        quantity: parseInt(this.dataOrder.quantity),
        userId: this.loggedInUser.id,
        totalPrice: this.totalPrice,
      };
      this.createOrder(this.dataOrder);
    },

    async createOrder(orderData) {
      console.log(orderData);
      try {
        // Kirim permintaan ke server untuk membuat order baru
        const response = await this.$axios.post("/order", {
          quantity: orderData.quantity,
          deviceId: orderData.deviceId,
          userId: orderData.userId,
        });

        if (response.status === 201) {
          const newOrder = {
            index: 1,
            deviceId: orderData.deviceId,
            userId: orderData.userId,
            quantity: orderData.quantity,
            totalPrice: orderData.totalPrice,
          };

          this.$emit("order-created", newOrder);

          this.addNotification({
            message: "Pembelian berhasil. Jangan lupa order lagi ya!",
            status: "success",
          });
        }
      } catch (error) {
        if (error) {
          this.addNotification({
            message:
              error.response.data.message || "Gagal membuat orderan baru.",
            status: "error",
          });
        }
      }
    },
  },
};
</script>
