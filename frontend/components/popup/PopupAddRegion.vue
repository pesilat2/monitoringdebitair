<template>
  <div
    v-if="showPopup"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60"
  >
    <div class="bg-white p-8 rounded-lg w-full max-w-[500px]">
      <h2 class="text-lg font-semibold mb-4">{{ title }}</h2>
      <form @submit.prevent="confirmAction">
        <div class="mb-4">
          <label for="name" class="block font-medium">Nama Desa</label>
          <input
            v-model="region.nama"
            type="text"
            id="name"
            class="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <div class="flex justify-end">
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
    region: {
      type: Object,
      default: () => ({
        id: "",
        nama: "",
      }),
    },
    type: {
      type: String,
    },
  },
  data() {
    return {};
  },

  methods: {
    closePopup() {
      this.$emit("update:showPopup", false);
    },
    confirmAction() {
      this.$emit("confirmed");
    },
  },
};
</script>
