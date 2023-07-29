<template>
  <div>
    <label class="text-2xl font-normal text-[#7895CB]" :for="id"
      >{{ label }}:</label
    >
    <div
      class="flex items-center border mt-2 text-xl px-5 border-[#7895CB] rounded hover:shadow-lg shadow-[#7895CB] transition-colors"
    >
      <div class="text-2xl text-[#7895CB]">
        <i :class="icon"></i>
      </div>
      <select
        :value="value"
        @change="$emit('input', $event.target.value)"
        :id="id"
        class="w-full h-12 outline-none text-[#7895CB] px-5"
      >
        <option
          class="text-xl border border-[#7895CB] font-normal text-[#7895CB] mb-2 active:bg-[#7895CB] hover:bg-[#7895CB]"
          v-for="item in data"
          :key="item.id"
          :value="item.value"
        >
          {{ item.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    data: Array,
    id: String,
    value: [String, Number, Boolean],
    icon: String,
  },
};
</script>
