<template>
  <div>
    <div class="flex w-full h-[100vh] relative">
      <div class="h-full bg-[#D8E5F1] w-1/2 left-0" />
      <div class="h-full bg-[#4A55A2] w-1/2 right-0" />
    </div>

    <div
      class="absolute flex justify-center items-center top-0 left-0 w-full h-full"
    >
      <div
        class="flex max-w-[900px] rounded-xl overflow-hidden bg-[#fcfcfc] p-12"
      >
        <div class="mx-auto">
          <h1 class="text-[#4A55A2] text-5xl font-bold text-center">
            Lupa Password
          </h1>
          <p class="text-[#999999] text-base font-normal text-center my-6">
            Kami akan mengirimkan link reset password
          </p>
          <form @submit.prevent="submitForm">
            <Input
              label="Email"
              id="email"
              type="email"
              v-model="email"
              icon="ri-mail-line"
            />
            <div class="mt-6">
              <Button label="Kirim" fullWidth />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "@/components/inputs/Input.vue";
import Button from "@/components/Button.vue";

export default {
  components: {
    Input,
    Button,
  },
  data() {
    return {
      email: "",
    };
  },
  methods: {
    submitForm() {
      console.log(this.email);
    },
  },
};
</script>
