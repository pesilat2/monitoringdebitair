<template>
  <div
    :class="`col-span-3 bg-white h-full pt-14 ${
      isEdit ? 'lg:col-span-1' : ''
    } `"
  >
    <div class="mx-auto w-full">
      <div class="mb-6">
        <div
          class="rounded-full overflow-hidden w-[180px] h-[180px] mx-auto relative border-4 border-[#7895CB]"
        >
          <div class="absolute bottom-0 w-full flex justify-center">
            <label
              v-if="base64Url === null"
              for="imageInput"
              class="mx-auto cursor-pointer bg-[#7895CB] p-2 text-2xl text-white rounded-full w-12 h-12 flex items-center justify-center"
              ><i class="ri-image-edit-fill"></i
            ></label>
            <div
              v-else
              class="mx-auto cursor-pointer bg-[#7895CB] p-2 text-2xl text-white rounded-full flex items-center justify-between space-x-4"
            >
              <button @click="cancelUpload">
                <i class="ri-close-line"></i>
              </button>
              <button><i class="ri-check-line"></i></button>
            </div>
            <input
              @change="previewFile"
              type="file"
              id="imageInput"
              accept="image/*"
              class="hidden"
            />
          </div>

          <img
            class="rounded-full mx-auto h-full w-full object-cover"
            :src="
              previewUrl
                ? previewUrl
                : 'https://th.bing.com/th/id/OIP.w6Cs6qz234c71XloeqKdwgHaHa?w=174&h=180&c=7&r=0&o=5&pid=1.7'
            "
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
        <div class="w-full flex justify-center items-center mt-4">
          <Button
            v-if="!isEdit"
            label="Lengkapi Profil"
            type="button"
            primary
            :click="showEditForm"
          />
        </div>
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
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  props: {
    isEdit: Boolean,
  },
  data() {
    return {
      base64Url: null,
      previewUrl: "",
    };
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
  },
  methods: {
    ...mapMutations(["addNotification"]),
    showEditForm() {
      this.$emit("showEditForm");
    },

    async previewFile(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();

        if (file.size > 1000000) {
          this.addNotification({
            status: "error",
            message: "Ukuran file harus lebih kecil dari 1MB",
          });
          return;
        }

        reader.onload = async () => {
          this.base64Url = reader.result;
          try {
            const res = await this.$axios.post("upload/images", {
              image: this.base64Url,
            });
            this.previewUrl = res.data.url;
          } catch (error) {
            this.addNotification({
              status: "error",
              message: error.response.data.message,
            });
          }
        };
        reader.readAsDataURL(file);
      }
    },
    async upload() {
      try {
        await this.$axios.post("signup", {
          image: this.base64Url,
        });
        this.addNotification({
          status: "success",
          message: "Photo profil berhasil di ubah",
        });
      } catch (error) {
        this.addNotification({
          status: "error",
          message: error.response.data.message,
        });
      }
    },
    cancelUpload() {
      this.base64Url = null;
      this.previewUrl = "";
      this.addNotification({
        status: "success",
        message: "Ubah photo profil di batalkan",
      });
    },
  },
};
</script>
