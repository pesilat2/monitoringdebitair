<template>
  <button
    :type="type"
    class="py-2 px-8 bg-[#7895CB] font-bold text-2xl rounded text-[#fcfcfc] hover:bg-[#4A55A2] transition-colors"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    type: String,
    label: String,
  },
};
</script>
