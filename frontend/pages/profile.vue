<template>
  <div class="w-full overflow-y-auto">
    <Header :title="headerTitle" :iconClasses="headerClass" />
    <div class="grid grid-cols-3 px-6 pt-6 w-full gap-6">
      <!-- profile -->
      <div class="col-span-3 md:col-span-1 bg-white h-full pt-14">
        <div class="mx-auto w-full">
          <div class="mb-6">
            <div
              class="rounded-full overflow-hidden w-[180px] h-[180px] mx-auto"
            >
              <img
                class="rounded-full mx-auto"
                src="https://th.bing.com/th/id/OIP.w6Cs6qz234c71XloeqKdwgHaHa?w=174&h=180&c=7&r=0&o=5&pid=1.7"
                alt="profile"
              />
            </div>
            <h1
              class="font-heading-1 text-heading-1 text-primary_dark mt-9 text-center"
            >
              Hendra Setiawan
            </h1>
            <p
              class="text-[#999999] text-base font-normal text-center text- mt-2 text-heading-5"
            >
              administrator
            </p>
          </div>

          <div class="w-full">
            <ItemProfile label="Alamat" fill="Sukabumi" />
            <ItemProfile label="Umur" fill="23" />
            <ItemProfile label="jenis Kelamin" fill="Laki-laki" />
            <ItemProfile label="Status Pernikahan" fill="Menikah" />
            <ItemProfile label="Hobi" fill="Membaca" />
          </div>
        </div>
      </div>

      <!-- edit profile -->
      <div class="col-span-3 md:col-span-2 bg-white h-full">
        <div class="w-full py-6 px-10 border-b-2 border-[#4A55A2]">
          <h1 class="text-[#4A55A2] text-heading-4 font-bold">Edit Profile</h1>
        </div>
        <div class="p-6">
          <form @submit.prevent="submitEditProfile">
            <Input
              label="Nama Lengkap"
              id="name"
              type="text"
              v-model="editForm.fullName"
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
              icon="ri-user-line"
            />
            <Input
              label="Jenis Kelamin"
              id="janisKelamamin"
              type="text"
              v-model="editForm.gender"
              icon="ri-mail-line"
            />
            <Input
              label="Status Pernikahan"
              id="status pernikahan"
              type="text"
              v-model="editForm.maritalStatus"
              icon="ri-lock-line"
            />
            <Input
              label="Hobi"
              id="hobi"
              type="text"
              v-model="editForm.hobi"
              icon="ri-user-line"
            />
          </form>
          <div>
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
  </div>
</template>

<script>
import Header from "~/components/Header.vue";
import ItemProfile from "~/components/ItemProfile.vue";
import Input from "~/components/inputs/Input.vue";
import Button from "~/components/Button.vue";
export default {
  components: {
    Header,
    ItemProfile,
    Input,
    Button,
  },
  data() {
    return {
      headerTitle: "Profile",
      headerClass: "ri-file-user-fill text-heading-4 text-primary_dark",
      editForm: {
        fullName: "",
        email: "",
        address: "",
        age: "",
        gender: "",
        maritalStatus: "",
        hobi: "",
      },
    };
  },
  methods: {
    submitEditProfile() {
      console.log(this.editForm);
    },
  },
};
</script>
