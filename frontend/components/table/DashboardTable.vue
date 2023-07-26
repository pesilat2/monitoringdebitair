<template>
  <div class="p-4">
    <div class="overflow-x-auto">
      <PopupEdit
        :showPopup="showConfirmation"
        @update:showPopup="showConfirmation = $event"
        :user="selectedUser"
        @confirmed="editUser(selectedUser)"
        title="Konfirmasi Perubahan"
      />

      <Popup
        :showPopup="showDeleteConfirmation"
        @update:showPopup="showDeleteConfirmation = $event"
        @confirmed="deleteUser(selectedUserId)"
        title="Konfirmasi Penghapusan"
        message="Apakah anda yakin ingin menghapus akun ini?"
      />
      <table class="w-full table-auto">
        <!-- <colgroup>
          <col v-for="column in tableColumns" :key="column.key" />
        </colgroup> -->
        <thead>
          <tr>
            <th
              v-for="column in tableColumns"
              :key="column.key"
              v-if="column.key !== 'id'"
              class="border-b border-primary_dark text-primary px-4 py-2 text-center text-heading-4"
            >
              {{ column.label }}
            </th>
            <th
              class="border-b border-primary_dark text-primary px-4 py-2 text-center text-heading-4"
              v-if="dashboardType === 'daftarPengguna'"
            >
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in displayedData" :key="item.id">
            <td
              v-for="column in tableColumns"
              :key="column.key"
              v-if="column.key !== 'id'"
              class="border-b border-primary_dark text-primary px-4 py-2 text-center text-base lg:text-lg"
            >
              <!-- <template v-if="column.key === 'role'">
                <div v-if="item[column.key] === 'USER'">
                  <button
                    class="outline"
                    @click="openConfirmation(item.id, 'ADMIN_DAERAH')"
                  >
                    Admin Daerah
                  </button>
                  <button
                    :class="{ active: item[column.key] === 'USER' }"
                    class="pointer-events-none"
                    @click="openConfirmation(item.id, 'USER')"
                  >
                    User
                  </button>
                </div>
                <div v-else-if="item[column.key] === 'ADMIN_UTAMA'">
                  <button
                    :class="{ active: item[column.key] === 'ADMIN_UTAMA' }"
                    class="pointer-events-none"
                    disabled
                  >
                    Admin Utama
                  </button>
                </div>
                <div v-else>
                  <button
                    class="outline"
                    @click="openConfirmation(item.id, 'USER')"
                  >
                    User
                  </button>
                  <button
                    :class="{ active: item[column.key] === 'ADMIN_DAERAH' }"
                    class="pointer-events-none"
                    @click="openConfirmation(item.id, 'ADMIN_DAERAH')"
                  >
                    Admin Daerah
                  </button>
                </div>
              </template> -->
              <template>
                {{
                  column.key === "jumlahPengguna"
                    ? item[column.key] + " orang"
                    : column.key === "pengeluaranAir"
                    ? item[column.key] + " liter/hari"
                    : item[column.key]
                }}
              </template>
            </td>
            <td
              v-if="dashboardType === 'daftarPengguna'"
              class="border-b border-primary_dark text-center text-base lg:text-lg"
            >
              <button
                @click="openConfirmation(item)"
                :disabled="item.role === 'ADMIN_UTAMA'"
              >
                <i class="ri-edit-box-fill text-heading-4 text-primary"></i>
              </button>
              <button
                @click="openDeleteConfirmation(item.id)"
                :disabled="item.role === 'ADMIN_UTAMA'"
              >
                <i class="ri-delete-bin-5-fill text-heading-4 text-primary"></i>
              </button>
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
import Popup from "~/components/popup/Popup.vue";
import PopupEdit from "../popup/PopupEdit.vue";

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
    Popup,
    PopupEdit,
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10, // Adjust this value as needed
      showConfirmation: false,
      showDeleteConfirmation: false,
      selectedUser: null,
      selectedUserId: null,
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
            { key: "id", label: "Id" },
            { key: "index", label: "Index" },
            { key: "nama", label: "Nama" },
            { key: "email", label: "Email" },
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
    // redirectToDetail(id) {
    //   // Navigasi ke halaman detail dengan parameter ID
    //   this.$router.push(`/detail-user/${id}`);
    // },
    changePage(page) {
      this.currentPage = page;
    },
    async updateUser(id, userData) {
      try {
        // Kirim permintaan ke server untuk mengubah peran pengguna
        console.log(userData);
        const response = await this.$axios.put(`/update/user/${id}`, {
          fullname: userData.nama,
          email: userData.email,
          role: userData.role,
        });

        console.log(response);

        // Jika permintaan berhasil dan server memberikan respons status 200 (OK)
        if (response.status === 200) {
          // Emit event untuk memberi tahu parent bahwa peran telah diubah
          this.$emit("user-changed", id, userData);

          // Beritahu pengguna bahwa peran telah diubah dengan sukses (opsional)
          alert("Peran pengguna berhasil diubah.");
        } else {
          // Jika server memberikan respons selain 200, maka tampilkan pesan kesalahan (opsional)
          alert("Gagal mengubah peran pengguna. Silakan coba lagi.");
        }
      } catch (error) {
        // Jika terjadi kesalahan pada permintaan atau server memberikan respons error, tampilkan pesan kesalahan (opsional)
        console.log(error);
      }
    },

    openConfirmation(item) {
      this.selectedUser = {
        ...item,
        fullname: item.nama, // Copy the fullname property to nama
        email: item.email,
        role: item.role, // Copy the role property to role
      };
      this.showConfirmation = true;
    },
    async editUser(userData) {
      try {
        if (!userData || !userData.id) {
          return;
        }

        await this.updateUser(userData.id, userData);
      } catch (error) {
        console.log(error);
        alert("Terjadi kesalahan saat mengubah pengguna. Silakan coba lagi.");
      }
    },
    async deleteUser(id) {
      try {
        const response = await this.$axios.delete(`/user/${id}`);
        if (response.status === 200) {
          this.$emit("delete-user", id);
          alert("Pengguna berhasil dihapus.");
        } else {
          alert("Gagal menghapus pengguna. Silakan coba lagi.");
        }
      } catch (error) {
        console.log(error);
        alert("Terjadi kesalahan saat menghapus pengguna. Silakan coba lagi.");
      }
    },
    openDeleteConfirmation(id) {
      this.selectedUserId = id;
      this.showDeleteConfirmation = true;
    },
  },
};
</script>

<style scoped>
button.active {
  @apply bg-primary text-[#ffffff] px-3 py-2 rounded-lg;
}
button.outline {
  @apply border border-primary text-primary px-3 py-1 rounded-lg;
}
</style>
