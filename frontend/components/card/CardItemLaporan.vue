<template>
  <div class="bg-white shadow-lg rounded-xl w-full">
    <div class="pt-6 px-8">
      <h3 class="text-heading-4 text-black font-heading-1">
        {{ title }}
      </h3>
    </div>
    <div
      class="pt-6 px-8 flex flex-wrap gap-6 lg:gap-0 justify-center lg:justify-between items-center"
    >
      <div class="relative w-full lg:w-[50%]">
        <input
          type="text"
          name="search"
          class="py-3 px-5 bg-white border shadow-sm border-slate-300 placeholder-primary focus:outline-none focus:border-primary focus:ring-primary block w-full rounded-md sm:text-sm md:text-lg focus:ring-1"
          :placeholder="placeholder"
          v-model="search"
          @input="filterData"
        />
        <span class="absolute right-6 top-2 text-heading-4 text-primary">
          <i class="ri-search-line"></i>
        </span>
      </div>
      <!-- <div class="flex">
        <h3
          class="bg-primary text-[#ffffff] py-1 px-3 lg:py-3 lg:px-5 text-heading-5 lg:text-heading-4 rounded-tl-2xl rounded-bl-2xl cursor-pointer"
        >
          Day
        </h3>
        <h3
          class="border-2 border-primary text-primary py-1 px-3 lg:py-3 lg:px-5 text-heading-5 lg:text-heading-4 cursor-pointer"
        >
          Week
        </h3>
        <h3
          class="border-2 border-primary text-primary py-1 px-3 lg:py-3 lg:px-5 text-heading-5 lg:text-heading-4 rounded-tr-2xl rounded-br-2xl cursor-pointer"
        >
          Month
        </h3>
      </div> -->
    </div>
    <div class="mt-4">
      <DashboardTable
        :dashboardType="dashboardType"
        :tableData="filteredData"
      />
    </div>
  </div>
</template>

<script>
import DashboardTable from "~/components/table/DashboardTable.vue";

export default {
  name: "CardItemLaporan",
  components: {
    DashboardTable,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    tableData: {
      type: Array || Object,
      required: true,
    },
    dashboardType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      search: "", // Tambahkan data search sebagai data reactive
    };
  },
  watch: {
    // Pantau perubahan pada properti dashboardType
    dashboardType: {
      immediate: true,
      handler(newVal) {
        // Gunakan properti dashboardType sebagai searchByColumn
        this.searchByColumn = this.getSearchByColumn(newVal);
      },
    },
  },
  computed: {
    // Buat computed property untuk mendapatkan data yang telah difilter berdasarkan search
    filteredData() {
      if (this.search.trim() === "") {
        // Jika search kosong, tampilkan semua data
        return this.tableData;
      } else {
        // Jika search tidak kosong, filter data berdasarkan search
        return this.tableData.filter((item) => {
          // Misalkan kita ingin mencari berdasarkan kolom "namaDaerah", sesuaikan dengan kolom yang diinginkan
          return item[this.searchByColumn]
            .toLowerCase()
            .includes(this.search.trim().toLowerCase());
        });
      }
    },
  },
  methods: {
    // Fungsi ini akan dipanggil saat input search berubah
    filterData() {
      if (
        this.$refs.dashboardTable &&
        this.$refs.dashboardTable.$refs.pagination
      ) {
        this.$refs.dashboardTable.$refs.pagination.resetPage();
      }
    },
    // Fungsi untuk mendapatkan searchByColumn berdasarkan dashboardType
    getSearchByColumn(dashboardType) {
      switch (dashboardType) {
        case "adminUtama":
          return "namaDaerah";
        case "adminDaerah":
          return "nama";
        case "pengguna":
          return "nama";
        default:
          return "nama"; // Ganti dengan nilai default yang sesuai
      }
    },
  },
};
</script>

<style></style>
