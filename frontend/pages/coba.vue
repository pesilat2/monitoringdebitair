<template>
  <div :class="`bg-red-200 transition-all `" :style="{ width: `${waktu}%` }">
    <button @click="addNotification">{{ waktu }}</button>
    div
  </div>
</template>

<script>
import ImageUploader from "~/components/ImageUploader.vue";
export default {
  components: {
    ImageUploader,
  },
  data() {
    return {
      waktu: 0,
    };
  },
  methods: {
    addNotification() {
      this.$store.commit("addNotification", {
        status: "success",
        message: "ini percibaan",
      });
    },
  },
  mounted() {
    const timeNow = Date.now();
    const intervalId = setInterval(() => {
      const timerun = Date.now();
      const timeDiff = timerun - timeNow;
      this.waktu = Math.round((timeDiff / 10000) * 100);
      if (this.waktu > 100) {
        clearInterval(intervalId);
      }
    });
  },
};
</script>

<style>
.progressAnimation {
  animation: "progressAnimation 4s linear infinite";
}
@keyframes progressAnimation {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
</style>
