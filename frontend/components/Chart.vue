<template>
  <div>
    <div class="flex flex-wrap gap-6 w-full">
      <StatistikHarian :chartData="chartData" :chartOptions="chartOptions" />
      <StatistikMingguan :chartData="chartData" :chartOptions="chartOptions" />
    </div>
    <StatistikBulanan :chartData="chartData" :chartOptions="chartOptions" />
  </div>
</template>

<script>
import LineChart from "./statistik/chart/LineChart.vue";
import StatistikBulanan from "./statistik/StatistikBulanan.vue";
import StatistikHarian from "./statistik/StatistikHarian.vue";
import StatistikMingguan from "./statistik/StatistikMingguan.vue";
export default {
  components: {
    LineChart,
    StatistikBulanan,
    StatistikMingguan,
    StatistikHarian,
  },
  data() {
    return {
      chartData: {
        labels: [
          "Senin",
          "Selasa",
          "Rabu",
          "Kamis",
          "Jumat",
          "Sabtu",
          "Minggu",
        ],
        datasets: [
          {
            label: "Debit Air Harian",
            data: [65, 59, 80, 81, 56, 55, 40],
            pointBackgroundColor: "#4A55A2",
            pointBorderColor: "#ffffff",
            pointHoverBackgroundColor: "#7895CB",
            pointRadius: 8,
            pointHoverRadius: 10,
            backgroundColor: "rgba(120, 149, 203, 0.50)",
            borderColor: "#7895CB",
            borderWidth: 4,
          },
        ],
      },
      chartOptions: {
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
          backgroundColor: "#7895CB", // Ganti title menjadi backgroundColor
          titleFontColor: "#ffffff", // Ubah titleFontColor menjadi warna font untuk judul tooltip
          bodyFontColor: "#ffffff", // Ubah bodyFontColor menjadi warna font untuk isi tooltip
          position: "nearest",
          mode: "nearest",
          intersect: false, // Ubah intersect menjadi false
          bodySpacing: 4,
          xPadding: 20,
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                padding: 10,
              },
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                padding: 10,
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    };
  },
};
</script>
