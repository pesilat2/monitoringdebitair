<template>
  <div :class="`bg-red-200 transition-all `" :style="{ width: `${waktu}%` }">
    <button @click="addNotification">{{ waktu }}</button>
    div
  </div>
</template>

<script>
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
<<<<<<< HEAD
.progressAnimation {
  animation: "progressAnimation 4s linear infinite";
}
@keyframes progressAnimation {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
=======
.spinner {
  animation: rotate 2s linear infinite;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;
}

.spinner .path {
  stroke: hsl(210, 100%, 49%);
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
>>>>>>> 8e002bd9750d2d74150ee2bf35803f0c5ee85acc
  }
}
</style>
