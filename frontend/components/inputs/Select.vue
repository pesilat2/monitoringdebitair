<template>
  <div>
    <label class="text-3xl font-normal text-[#7895CB]" :for="id"
      >{{ label }}:</label
    >
    <div
      class="border text-xl border-[#7895CB] rounded px-5 hover:shadow-lg shadow-[#7895CB] transition-colors"
    >
      <select
        :value="value"
        @change="$emit('input', $event.target.value)"
        :id="id"
        class="w-full h-12 outline-none text-[#7895CB]"
      >
        <option
          class="text-xl border border-[#7895CB] font-normal text-[#7895CB] mb-2"
          v-for="city in data"
          :key="city"
        >
          {{ city }}
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
    value: String,
  },
};
</script>
