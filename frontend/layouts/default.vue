<template>
  <parent-layout>
    <div>
      <div class="bg-[#D8E5F1] flex">
        <Sidebar />
        <div class="lg:pl-[300px] w-full h-[100vh] overflow-y-auto">
          <nuxt-child />
        </div>
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
