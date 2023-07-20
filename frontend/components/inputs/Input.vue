<template>
  <div class="mb-4">
    <label class="text-3xl font-normal text-[#7895CB]" :for="id"
      >{{ label }}:</label
    >
    <div
      class="flex gap-5 h-12 items-center w-full border border-[#7895CB] rounded px-5"
    >
      <div class="text-2xl text-[#7895CB]">
        <i :class="icon"></i>
      </div>
      <input :type="type" :id="id" class="w-full h-full outline-none" />
    </div>
  </div>
</template>

<script>
import "remixicon/fonts/remixicon.css";
export default {
  props: {
    label: String,
    id: String,
    type: String,
    icon: String,
  },
};
</script>
