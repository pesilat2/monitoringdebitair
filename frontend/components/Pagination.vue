<template>
  <nav class="flex items-center justify-center mt-4">
    <ul class="flex">
      <li v-if="increment">
        <button
          @click="changePage(currentPage - 1)"
          class="px-3 py-1 mx-1 text-primary bg-white rounded hover:bg-primary hover:text-white"
        >
          Previous
        </button>
      </li>
      <li v-for="page in totalPages" :key="page">
        <button
          @click="changePage(page)"
          :class="{
            'text-white bg-primary': currentPage === page,
            'text-primary bg-white': currentPage !== page,
          }"
          class="px-3 py-1 mx-1 rounded hover:bg-primary hover:text-white"
        >
          {{ page }}
        </button>
      </li>
      <li v-if="decrement">
        <button
          @click="changePage(currentPage + 1)"
          class="px-3 py-1 mx-1 text-primary bg-white rounded hover:bg-primary hover:text-white"
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  methods: {
    changePage(page) {
      this.$emit("page-change", page);
    },
    resetPage() {
      // Set currentPage kembali ke 1 saat dipanggil
      this.currentPage = 1;
    },
  },
  computed: {
    increment() {
      return this.currentPage > 1;
    },
    decrement() {
      return this.currentPage < this.totalPages;
    },
  },
};
</script>

<style></style>
