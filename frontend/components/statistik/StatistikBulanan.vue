<template>
  <div class="bg-white px-5 py-4 rounded-xl shadow-xl w-full mt-6">
    <h1 class="text-heading-4 text-black font-heading-1 mb-4">
      Statistik Bulanan
    </h1>
    <div class="chart-div">
      <LineChart :chartData="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import LineChart from "./chart/LineChart.vue";

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
  },
};
</script>
