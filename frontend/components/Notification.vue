<template>
  <div
    :class="` absolute flex flex-col justify-center items-center right-4 top-4 px-4 py-4  rounded-md min-w-[300px] z-10 scale-0 transition-transform ease-out ${
      notification.status === 'error' && 'bg-red-200'
    } ${notification.status === 'success' && 'bg-green-200'} ${
      notification.status === 'warning' && 'bg-yellow-200'
    }
    ${notification.message && ' scale-100 popup overlay'}`"
  >
    <div class="mx-auto flex items-center w-full justify-between text-lg">
      <h1 class="mr-2 text-md">{{ waktu }}</h1>
      <div @click="deleteMessage" class="cursor-pointer">
        <i class="ri-close-line"></i>
      </div>
    </div>
    <div :class="`h-1 w-[${waktu}%] bg-red-900 transition-all`"></div>
  </div>
</template>
<script>
import "remixicon/fonts/remixicon.css";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Notification",
  data() {
    return {
      waktu: 0,
    };
  },
  methods: {
    deleteMessage() {
      this.closeNotification;
    },
  },
  computed: {
    ...mapGetters(["notification"]),
    ...mapMutations(["closeNotification"]),
  },
  watch: {
    "notification.message": {
      handler(newMessage, oldMessage) {
        if (newMessage) {
          const timeNow = Date.now();
          const intervalId = setInterval(() => {
            const timerun = Date.now();
            const timeDiff = timerun - timeNow;
            this.waktu = Math.round((timeDiff / 5000) * 100);
            if (this.waktu > 100) {
              this.deleteMessage();
              clearInterval(intervalId);
            }
          });
        }
      },
      immediate: true,
    },
  },
  mounted() {},
};
</script>

<style></style>
