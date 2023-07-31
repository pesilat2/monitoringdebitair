<template>
  <div
    :class="`col-span-3 bg-white h-full pt-14 rounded-xl transition-transform duration-300 ${
      isEdit ? 'lg:col-span-1 translate-x-[]' : ''
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
              <button @click="upload"><i class="ri-check-line"></i></button>
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
            :src="base64Url ? base64Url : loggedInUser.imageProfile"
            alt="profile"
          />
        </div>
        <h1
          class="font-heading-2 text-heading-2 md:font-heading-1 md:text-heading-1 text-primary_dark mt-9 text-center overflow-hidden"
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
        <ItemProfile label="Daerah" :fill="loggedInUser.Region.name" />

        <ItemProfile label="Umur" :fill="getAge" />
        <ItemProfile label="jenis Kelamin" :fill="gender" />
        <ItemProfile label="Status Pernikahan" :fill="isMarried" />
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
    getAge() {
      const birthDate = new Date(this.loggedInUser.age);
      const today = new Date();
      const timeDifference = today.getTime() - birthDate.getTime();
      const ageInMilliseconds = new Date(timeDifference);
      const ageInYears = ageInMilliseconds.getUTCFullYear() - 1970;
      return ageInYears + " Tahun";
    },
    gender() {
      let gender = "";
      if (this.loggedInUser.gender === "MALE") {
        gender = "Laki-Laki";
      } else if (this.loggedInUser.gender === "FEMALE") {
        gender = "Perempuan";
      } else {
        gender = "";
      }
      return gender;
    },
    isMarried() {
      if (parseInt(this.loggedInUser.isMarried) === 1) {
        return "Menikah";
      } else if (parseInt(this.loggedInUser.isMarried) === 0) {
        return "Belum Menikah";
      } else {
        return "";
      }
    },
  },
  methods: {
    ...mapMutations(["addNotification", "editPhotoProfile"]),
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
        };
        reader.readAsDataURL(file);
      }
    },
    async upload() {
      try {
        try {
          const res = await this.$axios.post("upload/images", {
            image: this.base64Url,
          });
          this.previewUrl = res.data.url;
        } catch (error) {
          this.base64Url = null;
          this.previewUrl = "";
          this.addNotification({
            status: "error",
            message: error.response.data.message,
          });
        }
        if (this.base64Url && this.previewUrl) {
          await this.$axios.put("me", {
            imageProfile: this.previewUrl,
          });
          this.editPhotoProfile(this.previewUrl);
          this.base64Url = null;
          this.previewUrl = "";
          this.addNotification({
            status: "success",
            message: "Photo profil berhasil di ubah",
          });
        }
      } catch (error) {
        this.base64Url = null;
        this.previewUrl = "";
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
