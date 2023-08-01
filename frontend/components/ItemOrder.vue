<template>
  <div class="w-full grid grid-cols-12">
    <Popup
      :showPopup="showDeleteConfirmationOrder"
      @update:showPopup="showDeleteConfirmationOrder = $event"
      @confirmed="deleteOrder(selectedOrderId)"
      title="Konfirmasi Penghapusan"
      message="Apakah anda yakin ingin menghapus perangkat ini?"
    />
    <div
      class="col-span-1 border-2 border-primary_dark h-16 flex justify-center items-center"
    >
      <h1 class="text-primary_dark text-base lg:text-heading-4">
        {{ data.index }}
      </h1>
    </div>
    <div
      class="col-span-2 border-2 border-primary_dark h-16 flex justify-center items-center"
    >
      <h1 class="text-primary_dark text-base lg:text-heading-4">
        {{ data.quantity }}
      </h1>
    </div>
    <div
      class="col-span-3 border-2 border-primary_dark h-16 flex justify-start items-center"
    >
      <h1 class="px-2 text-primary_dark text-base lg:text-heading-4">
        {{ data.fullname }}
      </h1>
    </div>
    <div
      class="col-span-3 border-2 border-primary_dark h-16 flex justify-start items-center"
    >
      <h1 class="px-2 text-primary_dark text-base lg:text-heading-4">
        {{ data.deviceName }}
      </h1>
    </div>
    <div
      class="col-span-2 border-2 border-primary_dark h-16 flex justify-end items-center"
    >
      <h1 class="text-primary_dark text-base lg:text-heading-4">
        {{ toCurrencySting(data.totalPrice) }}
      </h1>
    </div>
    <div
      class="col-span-1 border-2 border-primary_dark h-16 flex justify-center items-center"
    >
      <button @click="openDeleteConfirmationOrder(data.id)">
        <i class="ri-delete-bin-5-fill text-heading-4 text-red-600"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  props: {
    data: Object,
  },
  data() {
    return {
      selectedOrderId: null,
      showDeleteConfirmationOrder: false,
    };
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
    ...mapMutations(["closeNotification"]),
  },
  methods: {
    ...mapMutations(["addNotification"]),
    toCurrencySting(number) {
      return number.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    },

    openDeleteConfirmationOrder(id) {
      this.selectedOrderId = id;
      this.showDeleteConfirmationOrder = true;
    },

    async deleteOrder(id) {
      this.$store.commit("loading/setLoading", true);
      try {
        const response = await this.$axios.delete(`/order/${id}`);
        if (response.status === 200) {
          this.$emit("delete-order", id);
          this.addNotification({
            message: "Order berhasil dihapus.",
            status: "success",
          });
          this.showDeleteConfirmationOrder = false;
        } else {
          this.addNotification({
            message: "Gagal menghapus order.",
            status: "error",
          });
        }
        this.$store.commit("loading/setLoading", false);
      } catch (error) {
        this.$store.commit("loading/setLoading", false);
        this.addNotification({
          message: error.response.data.message,
          status: "error",
        });
      }
    },
  },
};
</script>
