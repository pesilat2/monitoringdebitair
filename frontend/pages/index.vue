<template>
  <div>
    <!-- background -->
    <div class="flex w-full h-[100vh] relative">
      <div class="h-full bg-[#D8E5F1] w-1/2 left-0" />
      <div class="h-full bg-[#4A55A2] w-1/2 right-0" />
    </div>

    <!-- login box -->
    <div
      class="absolute flex justify-center items-center top-0 left-0 w-full h-full"
    >
      <div
        class="flex max-w-[900px] h-[600px] rounded-xl overflow-hidden bg-[#fcfcfc]"
      >
        <!-- information -->
        <div
          class="hidden md:flex items-center w-[325px] bg-[#4A55A2] py-14 px-10"
        >
          <div class="mx-auto">
            <h1 class="text-[#F69447] text-5xl font-bold text-center">
              {{ variant === "LOGIN" ? "Masuk" : "Daftar" }}
            </h1>
            <p class="text-[#fcfcfc] text-base font-normal text-center mt-6">
              Untuk memantau debit air
            </p>
            <div class="mt-6">
              <p class="text-center font-normal text-[#fcfcfc]">
                {{
                  variant === "LOGIN"
                    ? "Belum punya akun ?"
                    : "Sudah punya akun ?"
                }}
              </p>
              <p
                @click="changeVariant"
                class="text-center font-normal text-[#F69447] hover:text-[#FC8324] cursor-pointer"
              >
                {{ variant === "LOGIN" ? "Daftar" : "Masuk" }}
              </p>
            </div>
          </div>
        </div>

        <!-- login form -->
        <div class="flex items-center p-11 w-[575px] py-11 px-24">
          <FormAuth :variant="variant" @changeVariant="changeVariant" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormAuth from "~/components/FormAuth.vue";
export default {
  layout: "empty",
  // middleware: "guest",
  name: "IndexPage",
  components: {
    FormAuth,
  },
  data() {
    return {
      variant: "LOGIN",
    };
  },
  methods: {
    changeVariant() {
      this.variant = this.variant === "LOGIN" ? "REGISTER" : "LOGIN";
    },
  },
};
</script>
