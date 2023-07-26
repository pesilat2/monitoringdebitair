<template>
  <div class="w-full">
    <Header :title="headerTitle" :iconClasses="headerClass" />
    <div class="pt-5 px-6">
      <div class="mt-6">
        <CardItemLaporan
          :title="titleCard"
          :placeholder="placeholderCard"
          :tableData="tableData"
          :dashboardType="dashboardType"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "~/components/Header.vue";
export default {
  components: {
    Header,
  },
  data() {
    return {
      headerTitle: "Manajemen Pengguna",
      headerClass: "ri-git-repository-fill text-heading-4 text-primary_dark",
      titleCard: "Daftar Pengguna",
      placeholderCard: "Cari Pengguna...",
      tableData: [],
      dashboardType: "daftarPengguna",
    };
  },
  async fetch() {
    try {
      const data = await this.$axios.$get("/findAll/users");
      const users = data.data.map((user, index) => {
        return {
          id: user.id,
          index: index + 1,
          nama: user.fullname,
          email: user.email,
          role: user.role,
        };
      });
      this.tableData = users;
    } catch (err) {
      this.error = err;
      console.error(err);
    }
  },
};
</script>
