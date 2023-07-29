<template>
  <div
    :class="` bg-white h-full rounded-xl transition-all duration-300 ${
      isEdit ? '  col-span-3 md:col-span-2 translate-x-[0]' : ' hidden'
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
          label="Umur"
          id="umur"
          type="date"
          v-model="editForm.age"
          icon="ri-chat-heart-line"
        />
        <Select
          label="Jenis Kelamin"
          id="janisKelamamin"
          :data="selectGender"
          v-model="editForm.gender"
          icon="ri-genderless-line"
        />
        <Select
          label="Status Pernikahan"
          id="status pernikahan"
          :data="selectIsMarried"
          v-model="editForm.isMarried"
          icon="ri-user-heart-line"
        />
      </form>
      <div class="w-full flex justify-end mt-4">
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
import Select from "~/components/inputs/Select.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    Input,
    Button,
    Select,
  },
  props: {
    isEdit: Boolean,
  },
  data() {
    return {
      editForm: {
        fullname: "",
        email: "",
        age: "",
        gender: "",
        isMarried: "",
      },
      selectIsMarried: [
        { id: "menikah", name: "Menikah", value: true },
        { id: "belum-menikah", name: "Belum Menikah", value: false },
      ],
      selectGender: [
        { id: "laki-laki", name: "Laki-laki", value: "MALE" },
        { id: "perempuan", name: "Perempuan", value: "FEMALE" },
      ],
    };
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
  },
  methods: {
    ...mapMutations(["addNotification"]),
    closeEditForm() {
      this.$emit("closeEditForm");
      this.editForm = {
        fullname: this.loggedInUser.fullname,
        email: this.loggedInUser.email,
        age: this.loggedInUser.age,
        gender: this.loggedInUser.gender,
        isMarried: this.loggedInUser.isMarried,
      };
    },
    async submitEditProfile() {
      await this.$axios.put("/update/me", {
        ...this.editForm,
      });
      this.addNotification({
        status: "success",
        message: "Profile berhasil diubah",
      });
    },
  },
  mounted() {
    this.editForm = {
      fullname: this.loggedInUser.fullname,
      email: this.loggedInUser.email,
      age: this.loggedInUser.age,
      gender: this.loggedInUser.gender,
      isMarried: this.loggedInUser.isMarried,
    };
  },
};
</script>
