<template>
  <div
    :class="`col-span-${grid} hover:shadow-custom2 transition-transform bg-white p-4 rounded-xl shadow-xl w-full`"
  >
    <h1 class="text-heading-4 text-black font-heading-1">
      {{ label }}
    </h1>
    <div class="chart-div">
      <LineChart :chartData="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import LineChart from "./LineChart.vue";

export default {
  components: { LineChart },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      required: true,
    },
    label: String,
    grid: Number,
  },
};
</script>
