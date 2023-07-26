<template>
  <div class="mx-auto w-full relative">
    <div class="absolute top-10 left-10 px-4 py-2 bg-red-800">
      <nuxt-link :to="to">
        <!-- Ganti dengan halaman tujuan yang sesuai -->
        <div>Kembali</div>
      </nuxt-link>
    </div>
    <div class="mb-6">
      <div
        class="rounded-full overflow-hidden w-[180px] h-[180px] mx-auto relative flex justify-center items-center"
      >
        <input
          type="file"
          accept="image/*"
          class="absolute"
          @change="changeImage"
        />
        <img
          class="rounded-full mx-auto"
          src="https://th.bing.com/th/id/OIP.w6Cs6qz234c71XloeqKdwgHaHa?w=174&h=180&c=7&r=0&o=5&pid=1.7"
          alt="profile"
        />
      </div>
      <h1
        class="font-heading-1 text-heading-1 text-primary_dark mt-9 text-center"
      >
        {{ loggedInUser.fullname }}
      </h1>
      <p
        class="text-[#999999] text-base font-normal text-center text- mt-2 text-heading-5"
      >
        {{ loggedInUser.role }}
      </p>
    </div>

    <div class="w-full">
      <ItemProfile label="Alamat" :fill="loggedInUser.address" />
      <ItemProfile label="Umur" :fill="loggedInUser.age" />
      <ItemProfile label="jenis Kelamin" :fill="loggedInUser.gender" />
      <ItemProfile
        label="Status Pernikahan"
        :fill="loggedInUser.maritalStatus"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
  },
  methods: {
    to() {
      this.$router.go(-1);
    },
  },
};
</script>

<style></style>
