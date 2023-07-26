<template>
  <div
    v-if="showPopup"
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60"
  >
    <div class="bg-white p-8 rounded-lg w-full max-w-[500px]">
      <h2 class="text-lg font-semibold mb-4">{{ title }}</h2>
      <form @submit.prevent="confirmAction">
        <div class="mb-4">
          <label for="name" class="block font-medium">Nama</label>
          <input
            v-model="user.nama"
            type="text"
            id="name"
            class="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block font-medium">Email</label>
          <input
            v-model="user.email"
            type="email"
            id="email"
            class="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <div class="mb-4">
          <label for="role" class="block font-medium">Role</label>
          <select
            v-model="user.role"
            id="role"
            class="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="USER">User</option>
            <option value="ADMIN_DAERAH">Admin Daerah</option>
          </select>
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
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      userData: {
        id: "",
        nama: "",
        email: "",
        role: "",
      },
    };
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
