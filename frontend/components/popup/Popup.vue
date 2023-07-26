<template>
  <div
    v-if="showPopup"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60"
  >
    <div class="bg-white p-8 rounded-lg max-w-sm">
      <h2 class="text-lg font-semibold mb-4">{{ title }}</h2>
      <p class="text-base mb-6">{{ message }}</p>
      <div class="flex justify-end">
        <slot name="no">
          <button @click="closePopup" class="mr-4">Tidak</button>
        </slot>
        <slot name="yes">
          <button
            @click="confirmAction"
            class="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Ya
          </button>
        </slot>
      </div>
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
    message: {
      type: String,
      default: "Apakah Anda yakin?",
    },
  },
  methods: {
    closePopup() {
      this.$emit("update:showPopup", false);
    },
    confirmAction() {
      this.$emit("update:showPopup", false);
      this.$emit("confirmed");
    },
  },
};
</script>
