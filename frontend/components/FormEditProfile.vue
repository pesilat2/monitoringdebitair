<template>
  <div
    :class="` col-span-3  bg-white h-full ${
      isEdit ? 'md:col-span-2' : 'hidden'
    }`"
  >
    <div class="w-full py-6 px-10 border-b-2 border-[#4A55A2]">
      <h1 class="text-[#4A55A2] text-heading-4 font-bold">Edit Profile</h1>
    </div>
    <div class="p-6">
      <form @submit.prevent="submitEditProfile">
        <Input
          label="Nama Lengkap"
          id="name"
          type="text"
          v-model="editForm.fullname"
          icon="ri-user-line"
        />
        <Input
          label="Email"
          id="email"
          type="email"
          v-model="editForm.email"
          icon="ri-mail-line"
        />
        <Input
          label="Alamat"
          id="alamant"
          type="text"
          v-model="editForm.address"
          icon="ri-lock-line"
        />
        <Input
          label="Umur"
          id="umur"
          type="number"
          v-model="editForm.age"
          icon="ri-chat-heart-line"
        />
        <Input
          label="Jenis Kelamin"
          id="janisKelamamin"
          type="text"
          v-model="editForm.gender"
          icon="ri-genderless-line"
        />
        <Input
          label="Status Pernikahan"
          id="status pernikahan"
          type="text"
          v-model="editForm.maritalStatus"
          icon="ri-user-heart-line"
        />
      </form>
      <div class="w-full flex justify-end">
        <div>
          <Button
            label="Kembali"
            type="button"
            class="ml-3"
            secondary
            :click="closeEditForm"
          />
          <Button
            label="Simpan"
            type="submit"
            primary
            :click="submitEditProfile"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "~/components/inputs/Input.vue";
import Button from "~/components/Button.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    Input,
    Button,
  },
  props: {
    isEdit: Boolean,
  },
  data() {
    return {
      editForm: {
        fullname: "",
        email: "",
        image: "",
        address: "",
        age: "",
        gender: "",
        maritalStatus: "",
      },
    };
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
  },
  methods: {
    closeEditForm() {
      this.$emit("closeEditForm");
    },
    async submitEditProfile() {
      await this.$axios.put(
        "/update/user/" + this.loggedInUser.id,
        this.editForm
      );
    },
  },
  mounted() {
    this.editForm = {
      fullname: this.loggedInUser.fullname,
      email: this.loggedInUser.email,
      image: this.loggedInUser.image,
      address: this.loggedInUser.address,
      age: this.loggedInUser.age,
      gender: this.loggedInUser.gender,
      isMarried: this.loggedInUser.isMarried,
    };
    console.log(this.editForm);
  },
};
</script>
