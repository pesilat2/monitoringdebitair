<template>
  <parent-layout>
    <div>
      <div class="bg-[#D8E5F1] flex">
        <Sidebar />
        <nuxt-child />
      </div>
    </div>
  </parent-layout>
</template>

<script>
import Sidebar from "~/components/Sidebar.vue";
import ParentLayout from "./parentLayout.vue";
import parentLayout from "./parentLayout.vue";

export default {
  components: { parentLayout },
  name: "Default",
  conmponents: {
    Sidebar,
    Notification,
    ParentLayout,
  },
};
</script>
