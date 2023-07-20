<template>
  <form @submit.prevent="submitForm()" class="w-full">
    <Input
      v-if="variant === 'REGISTER'"
      label="Nama Lengkap"
      id="name"
      type="text"
      icon="ri-user-line"
    />
    <Input label="Email" id="email" type="email" icon="ri-mail-line" />
    <Input label="Password" id="password" type="password" icon="ri-lock-line" />
    <div class="flex justify-end mt-6">
      <Button :label="variant === 'LOGIN' ? 'Masuk' : 'Daftar'" type="submit" />
    </div>
  </form>
</template>

<script>
import Input from "./inputs/Input.vue";
import Button from "./Button.vue";

export default {
  components: { Input, Button },
  props: {
    variant: String,
  },
  data() {
    return {};
  },
  methods: {
    submitForm() {
      if (this.variant === "REGISTER") {
        console.log("REGISTER");
      } else if (this.variant === "LOGIN") {
        console.log("LOGIN");
      }
    },
  },
};
</script>
