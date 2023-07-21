<template>
  <button
    :type="type || 'submit'"
    :class="`py-2 px-8 bg-[#7895CB] font-bold text-2xl rounded text-[#fcfcfc] hover:bg-[#4A55A2] transition-colors ${
      fullWidth ? 'w-full' : ''
    }`"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    type: String,
    label: String,
    fullWidth: Boolean,
  },
};
</script>
