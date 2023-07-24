<template>
  <div class="flex justify-between w-full p-6 border-t-4 overflow-hidden h-11S">
    {{ message }}
  </div>
</template>
<script>
export default {
  name: "Notification",
  props: ["message"],
};
</script>
