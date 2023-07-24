<template>
  <div class="flex justify-between w-full p-6 border-t-4">
    <h2 class="text-[#4A55A2] text-xl font-semibold">{{ label }}</h2>
    <h3 class="text-[#4A55A2] text-lg font-light">{{ fill }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    fill: String,
  },
};
</script>
