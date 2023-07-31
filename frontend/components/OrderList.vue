<template>
  <div class="bg-white w-full px-6 py-4 mt-6">
    <h1
      v-if="this.$auth.user.role === 'ADMIN_DAERAH'"
      class="text-heading-4 text-black py-3"
    >
      Daftar Pesanan Air Daerah {{ this.$auth.user.regionName }}
    </h1>
    <h1
      v-else-if="this.$auth.user.role === 'ADMIN_UTAMA'"
      class="text-heading-4 text-black py-3"
    >
      Daftar Pesanan Air Seluruh Daerah
    </h1>
    <h1 v-else class="text-heading-4 text-black py-3">
      Daftar Pesanan Air Saya
    </h1>
    <!-- table head -->
    <div class="w-full grid grid-cols-12">
      <div
        class="col-span-1 bg-primary_dark h-16 flex justify-center items-center"
      >
        <h1 class="text-white text-heading-4 font-heading-1">No</h1>
      </div>
      <div
        class="col-span-2 bg-primary_dark h-16 flex justify-center items-center"
      >
        <h1 class="text-white text-heading-4 font-heading-1 text-center">
          Debit air /liter
        </h1>
      </div>
      <div
        class="col-span-3 bg-primary_dark h-16 flex justify-center items-center"
      >
        <h1 class="text-white text-heading-4 font-heading-1">Pengguna</h1>
      </div>
      <div
        class="col-span-3 bg-primary_dark h-16 flex justify-center items-center"
      >
        <h1 class="text-white text-heading-4 font-heading-1">Perangkat</h1>
      </div>
      <div
        class="col-span-2 bg-primary_dark h-16 flex justify-center items-center"
      >
        <h1 class="text-white text-heading-4 font-heading-1">Total Harga</h1>
      </div>
      <div
        class="col-span-1 bg-primary_dark h-16 flex justify-center items-center"
      >
        <h1 class="text-white text-heading-4 font-heading-1">Aksi</h1>
      </div>
    </div>
    <!-- item table -->
    <ItemOrder
      v-for="item of displayedData"
      :key="item.index"
      :data="item"
      @delete-order="handleDeleteOrder"
    />
    <Pagination
      v-if="increment"
      :currentPage="currentPage"
      :totalPages="totalPages"
      @page-change="changePage"
    />
  </div>
</template>

<script>
import Button from "./Button.vue";
import ItemOrder from "~/components/ItemOrder.vue";
export default {
  components: {
    Button,
    ItemOrder,
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  props: {
    listOrder: Array,
  },
  computed: {
    totalPages() {
      return Math.ceil(this.listOrder.length / this.itemsPerPage);
    },
    displayedData() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.listOrder.slice(startIndex, endIndex);
    },
    increment() {
      return this.totalPages >= 1;
    },
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
    handleDeleteOrder(id) {
      // Cari indeks data yang dihapus dalam tableData
      const deletedIndex = this.listOrder.findIndex((item) => item.id === id);

      // Jika indeks data yang dihapus ditemukan, hapus data tersebut dari array tableData
      if (deletedIndex !== -1) {
        this.listOrder.splice(deletedIndex, 1);

        // Perbarui kembali index untuk data-data yang ada setelah data yang dihapus
        // dengan mengurangi 1 pada index-nya
        for (let i = deletedIndex; i < this.listOrder.length; i++) {
          this.listOrder[i].index -= 1;
        }
      }
    },
  },
};
</script>
