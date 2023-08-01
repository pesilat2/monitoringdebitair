<template>
  <div
    v-if="this.$auth.user.role === 'ADMIN_DAERAH'"
    class="bg-white w-full px-6 py-4"
  >
    <h1 class="text-heading-4 text-black py-3">
      Silahkan masukan data untuk memesan
    </h1>
    <!-- table head -->
    <div class="w-full grid grid-cols-12">
      <div
        class="col-span-3 bg-primary_dark h-12 flex justify-center items-center"
      >
        <h1 class="text-white text-heading-4 font-heading-1">
          Debit air /liter
        </h1>
      </div>
      <div
        class="col-span-4 bg-primary_dark h-12 flex justify-center items-center"
      >
        <h1 class="text-white text-heading-4 font-heading-1">Pilih Pengguna</h1>
      </div>
      <div
        class="col-span-3 bg-primary_dark h-12 flex justify-center items-center"
      >
        <h1 class="text-white text-heading-4 font-heading-1">Perangkat</h1>
      </div>
      <div
        class="col-span-2 bg-primary_dark h-12 flex justify-center items-center"
      >
        <h1 class="text-white text-heading-4 font-heading-1">Harga</h1>
      </div>
    </div>
    <!-- item table -->
    <div class="w-full grid grid-cols-12">
      <div
        class="col-span-3 h-17 flex justify-center items-center border-2 border-primary py-4"
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
        class="col-span-4 h-17 flex justify-center items-center border-2 border-primary py-4"
      >
        <div
          class="flex gap-5 h-12 items-center w-[50%] border border-black rounded hover:shadow-lg shadow-[#7895CB] transition-colors"
        >
          <select
            type="number"
            id="device"
            v-model="dataOrder.userId"
            class="w-full h-full outline-none text-2xl px-4 text-[#7895CB]"
          >
            <option selected disabled value="">Pilih User Disini</option>
            <option v-for="item of userData" :key="item.id" :value="item.id">
              {{ item.nama }}
            </option>
          </select>
        </div>
      </div>
      <div
        class="col-span-3 h-17 flex justify-center items-center border-2 border-primary"
      >
        <h1 class="text-primary_dark text-heading-4 font-heading-1">
          {{ this.$auth.user.device.name }}
        </h1>
      </div>
      <div
        class="col-span-2 h-17 flex justify-center items-center border-2 border-primary py-4"
      >
        <h1
          v-if="minusPrice"
          class="text-primary_dark text-heading-4 font-heading-1"
        >
          {{ 0 }}
        </h1>
        <h1 v-else class="text-primary_dark text-heading-4 font-heading-1">
          {{ toCurrencySting(totalPrice) }}
        </h1>
      </div>
      <div class="col-end-12 mt-3 flex justify-center items-center h-14">
        <Button type="button" primary :label="label" :click="onclick" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import Button from "./Button.vue";

export default {
  components: {
    Button,
  },
  data() {
    return {
      dataOrder: {
        quantity: 0,
        deviceId: "",
        userId: "",
      },
      index: 1,
      userData: {},
    };
  },
  computed: {
    ...mapMutations(["closeNotification"]),
    ...mapGetters(["loggedInUser"]),
    ...mapState({
      loading: (state) => state.loading.loading,
    }),
    totalPrice() {
      return this.dataOrder.quantity * 5000;
    },
    minusPrice() {
      return this.dataOrder.quantity <= 0;
    },
    label() {
      return this.loading ? "Loading..." : "Pesan";
    },
  },
  mounted() {
    console.log(this.$auth.user);
  },
  methods: {
    ...mapMutations(["addNotification"]),
    adminDaerah() {
      return this.$auth.user.role !== "ADMIN_DAERAH";
    },
    onclick() {
      this.dataOrder = {
        deviceId: this.$auth.user.device.id,
        quantity: parseInt(this.dataOrder.quantity),
        userId: this.dataOrder.userId,
        totalPrice: this.totalPrice,
      };
      if (this.dataOrder.quantity <= 0) {
        this.addNotification({
          message: "Harap masukkan debit air lebih dari 0",
          status: "error",
        });
        return;
      }
      this.createOrder(this.dataOrder);
    },

    toCurrencySting(number) {
      return number.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    },

    resetFormData(orderData) {
      orderData.deviceId = "";
      orderData.deviceName = "";
      orderData.userId = "";
      orderData.fullname = "";
      orderData.quantity = 0;
      orderData.totalPrice = 0;
      orderData.index = 0;
    },

    async createOrder(orderData) {
      this.$store.commit("loading/setLoading", true);
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
            deviceName: response.data.data.deviceName,
            userId: orderData.userId,
            fullname: response.data.data.userName,
            quantity: orderData.quantity,
            totalPrice: orderData.totalPrice,
          };

          this.$emit("order-created", newOrder);

          this.addNotification({
            message: "Pembelian berhasil. Jangan lupa order lagi ya!",
            status: "success",
          });

          resetFormData(newOrder);
        }
        this.$store.commit("loading/setLoading", false);
      } catch (error) {
        this.$store.commit("loading/setLoading", false);
        this.addNotification({
          message: error.response.data.message || "Gagal membuat orderan baru.",
          status: "error",
        });
      }
    },
  },

  async fetch() {
    try {
      const data = await this.$axios.$get("/users");
      console.log("data", data);
      const users = data.data.map((user, index) => {
        return {
          id: user.id,
          index: index + 1,
          nama: user.fullname,
          email: user.email,
          role: user.role,
          regionId: user.regionId,
        };
      });
      this.userData = users;
      console.log("userdata", this.userData);
    } catch (err) {
      this.error = err;
      console.error(err);
    }
  },
};
</script>
