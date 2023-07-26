<template>
  <div
    :class="`popup fixed absolute flex justify-center items-center right-4 top-4 px-4 py-4  rounded-md min-w-[300px] z-10 scale-0 transition-transform ease-out ${
      error && 'bg-red-200'
    } $success && bg-green-200 ${warning && 'bg-yellow-200'}
    ${message && ' scale-100 popup overlay'}`"
  >
    <div class="mx-auto flex items-center w-full justify-between text-lg">
      <h1 class="mr-2 text-md">{{ message }}</h1>
      <div @click="deleteMessage" class="cursor-pointer">
        <i class="ri-close-line"></i>
      </div>
    </div>
  </div>
</template>
<script>
import "remixicon/fonts/remixicon.css";

export default {
  name: "Notification",
  props: {
    message: String,
    error: Boolean,
    success: Boolean,
    warning: Boolean,
  },

  methods: {
    deleteMessage() {
      this.$emit("closeNotification");
    },
  },
};
</script>

<style></style>
