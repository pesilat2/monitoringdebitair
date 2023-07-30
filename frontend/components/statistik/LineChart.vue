<script>
import { Line } from "vue-chartjs";
export default {
  extends: Line,
  props: {
    dataChart: Object,
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  watch: {
    dataChart: {
      handler(newDataChart) {
        this.chartData = {
          ...this.chartData,
          labels: newDataChart.labels,
          datasets: [
            {
              ...this.chartData.datasets[0],
              data: newDataChart.data,
            },
          ],
        };
        this.renderChart(this.chartData, this.options);
      },
    },
  },
  data() {
    return {
      chartData: {
        labels: this.dataChart.labels,
        datasets: [
          {
            label: "Debit Air Harian",
            data: this.dataChart.data,
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
      options: {
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
