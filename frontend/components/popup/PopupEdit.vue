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
        <div
          v-if="type === 'create' || type === 'createUserDaerah'"
          class="mb-4"
        >
          <label for="password" class="block font-medium">Password</label>
          <input
            v-model="user.password"
            type="password"
            id="password"
            class="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <div v-if="type === 'create'" class="mb-4">
          <label for="role" class="block font-medium">Role</label>
          <input
            id="role"
            class="w-full border border-gray-300 rounded-lg px-4 py-2"
            disabled
            v-model="user.role"
          />
        </div>
        <div v-else class="mb-4">
          <label for="role" class="block font-medium">Role</label>
          <select
            id="region"
            class="w-full border border-gray-300 rounded-lg px-4 py-2"
            v-model="user.role"
          >
            <option selected disabled value="">Silihkan Pilih Role</option>
            <option value="ADMIN_DAERAH">ADMIN DAERAH</option>
            <option value="USER">USER</option>
          </select>
        </div>
        <div
          v-if="type !== 'createUserDaerah' && type !== 'editUserDaerah'"
          class="mb-4"
        >
          <label for="region" class="block font-medium">Desa</label>
          <select
            id="region"
            class="w-full border border-gray-300 rounded-lg px-4 py-2"
            v-model="user.regionId"
          >
            <option selected disabled value="">Silihkan Pilih Desa</option>
            <option
              v-for="region in dataRegions"
              :key="region.id"
              :value="region.id"
            >
              {{ region.name }}
            </option>
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
      default: () => ({
        nama: "",
        email: "",
        role: "USER",
        password: "",
        regionId: "",
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
    try {
      const response = await this.$axios.$get("/regions");
      console.log(response);
      const regions = response.data.regions.map((region) => ({
        id: region.id,
        name: region.name,
        value: region.id,
      }));
      console.log(regions);
      this.dataRegions = regions;
    } catch (error) {
      this.error = error;
    }
  },
  mounted() {
    console.log(this.levelAccess);
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
