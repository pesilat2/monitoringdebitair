<template>
  <form @submit.prevent="submitForm()" class="w-full">
    <Input
      v-if="variant === 'REGISTER'"
      label="Nama Lengkap"
      id="fullNname"
      type="text"
      icon="ri-user-line"
      v-model="form.fullName"
      :autoFocus="true"
    />
    <Input
      label="Email"
      id="email"
      type="email"
      icon="ri-mail-line"
      v-model="form.email"
    />
    <Input
      label="Password"
      id="password"
      type="password"
      icon="ri-lock-line"
      v-model="form.password"
    />
    <div
      v-if="variant === 'LOGIN'"
      class="flex justify-end cursor-pointer"
      @click="navigate('forgot-password')"
    >
      <p class="text-[#7895CB] hover:text-primary">Lupa password ?</p>
    </div>
    <Select
      v-if="variant === 'REGISTER'"
      label="Desa"
      :data="dataDesa"
      id="desa"
      v-model="form.desa"
    />
    <div class="flex justify-end mt-6">
      <Button
        :label="variant === 'LOGIN' ? 'Masuk' : 'Daftar'"
        type="submit"
        primary
      />
    </div>
  </form>
</template>

<script>
import Input from "./inputs/Input.vue";
import Select from "./inputs/Select.vue";
import Button from "./Button.vue";

export default {
  components: { Input, Button, Select },
  props: {
    variant: String,
  },
  data() {
    return {
      form: {
        fullName: "",
        email: "",
        password: "",
        desa: "",
      },
      dataDesa: ["Sukabumi", "Bandung", "Bogor", "Jakarta"],
    };
  },
  methods: {
    submitForm() {
      if (this.variant === "REGISTER") {
        console.log("REGISTER");
      } else if (this.variant === "LOGIN") {
        console.log("LOGIN");
      }
      console.log(this.form);
    },
    navigate(route) {
      this.$router.push(`/${route}`);
    },
  },
};
</script>
