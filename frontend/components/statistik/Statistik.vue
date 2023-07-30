<template>
  <div>
    <div v-if="dataChart">
      <div
        :class="`transition-transform bg-white p-4 rounded-xl shadow-xl w-full`"
      >
        <h1
          class="text-heading-4 text-black font-heading-1 transition-all duration-300"
        >
          {{ label }}
        </h1>
        <div class="chart-div">
          <LineChart :dataChart="dataChart" />
        </div>
      </div>
      <div class="mt-4 grid grid-cols-3 gap-4">
        <CardItemStatistik
          v-for="item in selectVarianStatistic"
          :key="item.id"
          :data="item"
          :variant="variantStatistict"
          @changeVariant="changeVariant"
        />
      </div>
    </div>
    <div v-else>
      <div
        class="bg-black/40 rounded-xl shadow-xl w-full h-[440px] cursor-wait"
      />
      <div class="mt-4 grid grid-cols-3 gap-4">
        <div
          class="col-span-1 h-[140px] bg-black/40 rounded-xl cursor-wait"
        ></div>
        <div
          class="col-span-1 h-[140px] bg-black/40 rounded-xl cursor-wait"
        ></div>
        <div
          class="col-span-1 h-[140px] bg-black/40 rounded-xl cursor-wait"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from "./LineChart.vue";
import CardItemStatistik from "../card/CardItemStatistik.vue";

export default {
  components: { LineChart, CardItemStatistik },
  async fetch() {
    await this.$axios
      .$get("/report-feedback")
      .then((result) => {
        this.dataStatistik = result.data;
        let labels = [];
        let data = [];
        this.dataStatistik.dailyStatistics.map((item) => {
          labels.unshift(item.date);
          data.unshift(item.quantity);
          return;
        });
        this.dataChart = {
          data: data,
          labels: labels,
        };
        console.log(this.dataStatistik.weeklyStatistics);
        this.selectVarianStatistic = this.selectVarianStatistic.map((item) => {
          if (item.value === "daily") {
            return {
              ...item,
              debitWater: this.dataStatistik.dailyStatistics[0].quantity,
            };
          } else if (item.value === "weekly") {
            return {
              ...item,
              debitWater: this.dataStatistik.weeklyStatistics[0].quantity,
            };
          } else if (item.value === "mountly") {
            return {
              ...item,
              debitWater:
                this.dataStatistik.monthlyStatistics[
                  this.dataStatistik.monthlyStatistics.length - 1
                ].quantity,
            };
          }
          return;
        });
        console.log(this.selectVarianStatistic);
      })
      .catch((err) => {});
  },
  mounted() {},
  data() {
    return {
      dataStatistik: {},
      variantStatistict: "daily",
      label: "Statistic Keluar Debit Perhari",
      dataChart: null,
      selectVarianStatistic: [
        {
          id: "daily",
          value: "daily",
          label: "Keluar Air Hari Ini",
          debitWater: 98,
        },
        {
          id: "weekly",
          value: "weekly",
          label: "Keluar Air Minggu Ini",
          debitWater: 789,
        },
        {
          id: "mountly",
          value: "mountly",
          label: "Keluar Air Bulan Ini",
          debitWater: 2549,
        },
      ],
    };
  },
  methods: {
    changeVariant(variant) {
      this.variantStatistict = variant;
      if (this.variantStatistict === "daily") {
        this.label = "Statistic Keluar Debit Perhari";
        let labels = [];
        let data = [];
        this.dataStatistik.dailyStatistics.map((item) => {
          labels.unshift(item.date);
          data.unshift(item.quantity);
          return;
        });
        this.dataChart = {
          data: data,
          labels: labels,
        };

        console.log(this.dataChart);
      } else if (this.variantStatistict === "weekly") {
        this.label = "Statistic Keluar Debit Perminggu";
        let labels = [];
        let data = [];
        this.dataStatistik.weeklyStatistics.map((item, index) => {
          labels.unshift(`minggu ${7 - index}`);
          data.unshift(item.quantity);
          return;
        });
        this.dataChart = {
          data: data,
          labels: labels,
        };
        console.log(this.dataChart);
      } else if (this.variantStatistict === "mountly") {
        this.label = "Statistic Keluar Debit Perbulan";
        let labels = [];
        let data = [];
        this.dataStatistik.monthlyStatistics.map((item) => {
          labels.push(item.date);
          data.push(item.quantity);
        });
        this.dataChart = {
          data: data,
          labels: labels,
        };
        console.log("mounlty", this.dataChart);
      }
    },
  },
};
</script>
