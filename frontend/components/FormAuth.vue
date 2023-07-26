<template>
  <div>
    <Notification
      :message="message"
      :error="status === 'ERROR'"
      :success="status === 'SUCCESS'"
      :warning="status === 'WARNING'"
      @closeNotification="closeNotification"
    />
    <form @submit.prevent="submitForm()" class="w-full">
      <Input
        v-if="variant === 'REGISTER'"
        label="Nama Lengkap"
        id="fullNname"
        type="text"
        icon="ri-user-line"
        v-model="form.fullname"
        @closeNotification="closeNotification"
        :autoFocus="true"
      />
      <Input
        label="Email"
        id="email"
        type="email"
        icon="ri-mail-line"
        @closeNotification="closeNotification"
        v-model="form.email"
      />
      <Input
        label="Password"
        id="password"
        type="password"
        icon="ri-lock-line"
        @closeNotification="closeNotification"
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
        :data="dataRegions"
        id="desa"
        @closeNotification="closeNotification"
        v-model="form.regionId"
      />
      <div class="flex justify-end mt-6">
        <Button
          :label="variant === 'LOGIN' ? 'Masuk' : 'Daftar'"
          type="submit"
          primary
        />
      </div>
    </form>
  </div>
</template>

<script>
import Input from "./inputs/Input.vue";
import Select from "./inputs/Select.vue";
import Button from "./Button.vue";
import Notification from "./Notification.vue";

export default {
  components: { Input, Button, Select, Notification },
  props: {
    variant: String,
  },
  data() {
    return {
      form: {
        fullname: "",
        email: "",
        password: "",
        regionId: "",
      },
      status: "",
      message: "",
      dataRegions: [],
    };
  },
  async fetch() {
    await this.$axios
      .$get("/regions")
      .then((data) => {
        const regions = data.data.regions.map((region) => {
          return {
            id: region.id,
            name: region.name,
            value: region.id,
          };
        });
        this.dataRegions = regions;
      })
      .catch((err) => {
        this.error = err;
      });
  },
  methods: {
    async submitForm() {
      if (this.variant === "REGISTER") {
        try {
          const res = await this.$axios.post("signup", {
            ...this.form,
          });
          this.$emit("changeVariant", "LOGIN");
          this.form = this.form = {
            fullname: "",
            email: "",
            password: "",
            regionId: "",
          };
          this.message = "Daftar berhasil !";
          this.status = "SUCCESS";
        } catch (err) {
          this.message = err.response.data.message;
          this.status = "ERROR";
        }
      } else if (this.variant === "LOGIN") {
        try {
          await this.$auth.loginWith("local", {
            data: {
              email: this.form.email,
              password: this.form.password,
            },
          });
          const role = this.$store.state.auth.user.role;
          if (role === "USER") {
            this.$router.push("/dashboard-user");
          } else if (role === "ADMIN_UTAMA") {
            this.$router.push("/dashboard-admin-utama");
          } else if (role === "ADMIN_DAERAH") {
            this.$router.push("/dashboard-admin-daerah");
          }
          this.message = "Login Berhasil";
          this.status = "SUCCESS";
        } catch (err) {
          this.message = err.response.data.message;
          this.status = "ERROR";
        }
      }
    },
    closeNotification() {
      this.message = "";
      this.status = "";
    },
    navigate(route) {
      this.$router.push(`/${route}`);
    },
  },
  mounted() {
    console.log(this.message);
  },
};
</script>
