<template>
  <div>
    <Notification
      :message="message"
      success
      @closeNotification="closeNotification"
    />
    <div class="bg-[#D8E5F1] flex">
      <Sidebar />
      <nuxt-child />
    </div>
  </div>
</template>

<script>
import Sidebar from "~/components/Sidebar.vue";
import Notification from "~/components/Notification.vue";

export default {
  name: "Default",
  conmponents: {
    Sidebar,
    Notification,
  },
  data() {
    return {
      message: "",
      status: "",
    };
  },
  methods: {
    closeNotification() {
      this.message = "";
      this.status = "";
    },
  },
};
</script>
