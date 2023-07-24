<template>
  <div class="p-4">
    <div class="overflow-x-auto">
      <table class="w-full table-auto">
        <!-- <colgroup>
          <col v-for="column in tableColumns" :key="column.key" />
        </colgroup> -->
        <thead>
          <tr>
            <th
              v-for="column in tableColumns"
              :key="column.key"
              class="border-b border-primary_dark text-primary px-4 py-2 text-center text-heading-4"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in displayedData" :key="item.id">
            <td
              v-for="column in tableColumns"
              :key="column.key"
              class="border-b border-primary_dark text-primary px-4 py-2 text-center text-2xl"
            >
              {{
                column.key === "jumlahPengguna"
                  ? item[column.key] + " orang"
                  : column.key === "pengeluaranAir"
                  ? item[column.key] + " liter/hari"
                  : item[column.key]
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Pagination
      v-if="increment"
      :currentPage="currentPage"
      :totalPages="totalPages"
      @page-change="changePage"
    />
  </div>
</template>

<script>
import Pagination from "~/components/Pagination.vue";
export default {
  name: "DashboardTable",
  props: {
    dashboardType: {
      type: String,
      required: true,
    },
    tableData: {
      type: Array,
      required: true,
    },
  },
  components: {
    Pagination,
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10, // Adjust this value as needed
    };
  },
  computed: {
    tableColumns() {
      switch (this.dashboardType) {
        case "adminUtama":
          return [
            { key: "kodePost", label: "Kode Post" },
            { key: "namaDaerah", label: "Nama Daerah" },
            { key: "jumlahPengguna", label: "Jumlah Pengguna" },
            { key: "pengeluaranAir", label: "Pengeluaran Air" },
          ];
        case "adminDaerah":
          return [
            { key: "nik", label: "NIK" },
            { key: "nama", label: "Nama" },
            { key: "pengeluaranAir", label: "Pengeluaran Air" },
          ];
        case "pengguna":
          return [
            { key: "tanggal", label: "Tanggal" },
            { key: "pengeluaranAir", label: "Pengeluaran Air" },
          ];
        case "daftarPengguna":
          return [
            { key: "id", label: "ID" },
            { key: "nama", label: "Nama" },
            { key: "role", label: "Role" },
          ];
        default:
          return [];
      }
    },
    totalPages() {
      return Math.ceil(this.tableData.length / this.itemsPerPage);
    },
    displayedData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.tableData.slice(startIndex, endIndex);
    },
    increment() {
      return this.totalPages >= 1;
    },
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
  },
};
</script>

<style></style>
