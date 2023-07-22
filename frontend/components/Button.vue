<template>
  <button
    @click="click && click()"
    :type="type || 'submit'"
    :class="`py-2 px-8 font-bold text-2xl rounded text-[#fcfcfc]  transition-colors ${
      fullWidth ? 'w-full' : ''
    } ${primary ? 'bg-[#7895CB] hover:bg-[#4A55A2]' : ''} ${
      secondary ? 'bg-[#F69447] hover:bg-[#FC8324]' : ''
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
    primary: Boolean,
    secondary: Boolean,
    click: Function,
  },
};
</script>
