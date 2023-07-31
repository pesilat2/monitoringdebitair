<template>
  <div
    v-if="showPopup"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60"
  >
    <div class="bg-white p-8 rounded-lg w-full max-w-[500px]">
      <h2 class="text-lg font-semibold mb-4">{{ title }}</h2>
      <form @submit.prevent="confirmAction">
        <div class="mb-4">
          <label for="name" class="block font-medium">Nama Perangkat</label>
          <input
            v-model="device.nama_perangkat"
            type="text"
            id="name"
            class="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <div class="mb-4">
          <label for="max" class="block font-medium">Maksimum Air</label>
          <input
            v-model="device.maksimum_air"
            type="text"
            id="max"
            class="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <div class="mb-4">
          <label for="price" class="block font-medium">Harga</label>
          <input
            v-model="device.harga"
            type="text"
            id="price"
            class="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <div class="mb-4">
          <label for="regionId" class="block font-medium">Desa</label>
          <select
            v-model="device.id_region"
            id="regionId"
            class="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option selected disabled value="">Silahkan Pilih Desa</option>
            <option
              v-for="region in dataRegions"
              :key="region.id"
              :value="region.id"
            >
              {{ region.name }}
            </option>
          </select>
        </div>
        <div v-if="loading" class="flex justify-end">
          <slot name="loading">
            <button
              disabled
              class="bg-primary/50 text-white px-4 py-2 rounded-lg"
            >
              Loading...
            </button>
          </slot>
        </div>
        <div v-else class="flex justify-end">
          <slot name="no">
            <button @click="closePopup" class="mr-4">Tidak</button>
          </slot>
          <slot name="yes">
            <button
              type="submit"
              class="bg-primary text-white px-4 py-2 rounded-lg"
            >
              Ya
            </button>
          </slot>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    showPopup: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Konfirmasi",
    },
    data: {
      type: Array,
    },
    device: {
      type: Object,
      default: () => ({
        id_region: "",
        nama_perangkat: "",
        maksimum_air: "",
        harga: "",
      }),
    },
    type: {
      type: String,
    },
  },
  data() {
    return {
      dataRegions: [],
    };
  },
  async fetch() {
    await this.$axios
      .$get("/regions")
      .then((data) => {
        const regions = data.data.regions.map((region) => {
          return {
            id: region.id,
            name: region.name,
          };
        });
        this.dataRegions = regions;
      })
      .catch((err) => {
        this.error = err;
      });
  },
  methods: {
    closePopup() {
      this.$emit("update:showPopup", false);
    },
    confirmAction() {
      this.$emit("confirmed");
    },
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading.loading,
    }),
  },
};
</script>
