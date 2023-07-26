<template>
  <div>
    <input type="file" accept="image/*" @change="handleFileUpload" />
    <img v-if="imageUrl" :src="imageUrl" alt="Preview image" />
    <button @click="uploadImage">test</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedImage: null,
      imageUrl: null,
    };
  },
  methods: {
    handleFileUpload(e) {
      this.selectedImage = e.target.files[0];
    },
    async uploadImage() {
      if (!this.selectedImage) {
        return;
      }
      try {
        const formData = new FormData();
        formData.append("file", this.selectedImage);
        formData.append("upload_preset", "stu6ldtq");
        const requestOptions = {
          headers: {
            // Hapus header Authorization dari permintaan
            Authorization: null,
          },
        };
        const response = await this.$axios.$post(
          "https://api.cloudinary.com/v1_1/didqljyaq/image/upload",
          formData,
          requestOptions
        );
        const data = await res.json();
        this.imageUrl = data.url;
        console.log(data);
        console.log("imageUrl", this.imageUrl);
        console.log("selectedImage", this.selectedImage);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
// CLOUD_NAME, FILE, TIMESTAMP, API_KEY, and SIGNATURE in the cURL command below:
</script>
