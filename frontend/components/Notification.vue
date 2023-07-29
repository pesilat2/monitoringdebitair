<template>
  <div
    :class="`absolute right-4 top-4 scale-0  z-10 transition-transform duration-300  ease-out   ${
      notification.message && ' scale-100 popup overlay'
    }`"
  >
    <div class="relative rounded-md overflow-hidden">
      <div
        :class="`flex flex-col justify-center items-center  px-4 py-4  rounded-md min-w-[300px] overflow-hidden ${
          notification.status === 'error' && 'bg-red-200'
        } ${notification.status === 'success' && 'bg-green-200'} ${
          notification.status === 'warning' && 'bg-yellow-200'
        }
`"
      >
        <div class="mx-auto flex items-center w-full justify-between text-lg">
          <h1
            class="mr-2 text-md max-w-xl overflow-hidden text-ellipsis line-clamp-1"
          >
            {{ notification.message }}
          </h1>
          <div @click="deleteMessage()" class="cursor-pointer">
            <i class="ri-close-line"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "remixicon/fonts/remixicon.css";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Notification",
  props: {
    duration: Number,
  },
  data() {
    return {};
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
      handler(newMessage) {
        if (newMessage) {
          setTimeout(() => {
            this.closeNotification;
          }, this.duration);
        }
      },
    },
  },
};
</script>

<style></style>
