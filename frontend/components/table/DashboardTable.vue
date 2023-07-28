<template>
  <div class="p-4">
    <div class="overflow-x-auto">
      <Notification
        :message="message"
        :error="status === 'ERROR'"
        :warning="status === 'WARNING'"
        @closeNotification="closeNotification"
      />
      <PopupEdit
        :showPopup="showConfirmation"
        @update:showPopup="showConfirmation = $event"
        :user="selectedUser"
        @confirmed="editUser(selectedUser)"
        title="Konfirmasi Perubahan"
        :message="message"
        :status="status"
      />

      <Popup
        :showPopup="showDeleteConfirmation"
        @update:showPopup="showDeleteConfirmation = $event"
        @confirmed="deleteUser(selectedUserId)"
        title="Konfirmasi Penghapusan"
        message="Apakah anda yakin ingin menghapus akun ini?"
        :messageToast="message"
        :status="status"
      />

      <Popup
        :showPopup="showDeleteConfirmationDevice"
        @update:showPopup="showDeleteConfirmationDevice = $event"
        @confirmed="deleteDevice(selectedDeviceId)"
        title="Konfirmasi Penghapusan"
        message="Apakah anda yakin ingin menghapus perangkat ini?"
        :messageToast="message"
        :status="status"
      />

      <PopupAddDevice
        :showPopup="showConfirmationDevice"
        @update:showPopup="showConfirmationDevice = $event"
        :device="selectedDevice"
        @confirmed="editDevice(selectedDevice)"
        title="Konfirmasi Perubahan"
        :message="message"
        :status="status"
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
            <th
              class="border-b border-primary_dark text-primary px-4 py-2 text-center text-heading-4"
              v-if="dashboardType === 'daftarPerangkat'"
            >
              Aksi
            </th>
          </tr>
        </thead>
        <!-- <tbody class="mt-8" v-if="loading">
          <tr>
            <td rowspan="6" colspan="6">
              <SkletonDasboardTable />
            </td>
          </tr>
        </tbody> -->
        <tbody>
          <tr v-for="item in displayedData" :key="item.id">
            <td
              v-for="column in tableColumns"
              :key="column.key"
              class="border-b border-primary_dark text-primary px-4 py-2 text-center text-base lg:text-md"
            >
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
            <td
              v-if="dashboardType === 'daftarPerangkat'"
              class="border-b border-primary_dark text-center text-base lg:text-lg"
            >
              <button @click="openConfirmationDevice(item)">
                <i class="ri-edit-box-fill text-heading-4 text-primary"></i>
              </button>
              <button @click="openDeleteConfirmationDevice(item.id)">
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
import { mapState } from "vuex";
import SkletonDasboardTable from "./SkletonDasboardTable.vue";

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
    SkletonDasboardTable,
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10, // Adjust this value as needed
      showConfirmation: false,
      showDeleteConfirmation: false,
      selectedUser: null,
      selectedUserId: null,
      selectedDevice: null,
      selectedDeviceId: null,
      showConfirmationDevice: false,
      showDeleteConfirmationDevice: false,
      message: "",
      status: "",
    };
  },
  computed: {
    ...mapState({
      loading: (state) => state.loading.loading,
    }),
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
            { key: "index", label: "No" },
            { key: "nama", label: "Nama" },
            { key: "email", label: "Email" },
            { key: "role", label: "Role" },
          ];
        case "daftarPerangkat":
          return [
            { key: "index", label: "No" },
            { key: "id_region", label: "Id Region" },
            { key: "nama_perangkat", label: "Nama Perangkat" },
            { key: "maksimum_air", label: "Maksimal Air" },
            { key: "harga", label: "Harga" },
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
  mounted() {
    console.log(this.loading);
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
          ...userData,
          fullname: userData.nama,
          email: userData.email,
          role: userData.role,
        });

        // Jika permintaan berhasil dan server memberikan respons status 200 (OK)
        if (response.status === 200) {
          // Emit event untuk memberi tahu parent bahwa peran telah diubah
          this.$emit("user-changed", id, userData);

          // Beritahu pengguna bahwa peran telah diubah dengan sukses (opsional)
          this.message = "Peran pengguna berhasil diubah.";
          this.status = "SUCCESS";
          this.showConfirmation = false;
        } else {
          this.message = "Gagal mengubah peran pengguna.";
          this.status = "ERROR";
          // Jika server memberikan respons selain 200, maka tampilkan pesan kesalahan (opsional)
        }
      } catch (error) {
        this.message = error.response.data.message;
        this.status = "ERROR";
        // Jika terjadi kesalahan pada permintaan atau server memberikan respons error, tampilkan pesan kesalahan (opsional)
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
      this.message = "";
      this.status = "";
    },
    async editUser(userData) {
      try {
        if (!userData || !userData.id) {
          return;
        }
        await this.updateUser(userData.id, userData);
      } catch (error) {
        this.message = error.response.data.message;
        this.status = "ERROR";
      }
    },
    async deleteUser(id) {
      try {
        const response = await this.$axios.delete(`/delete/user/${id}`);
        if (response.status === 200) {
          this.$emit("delete-user", id);
          this.message = "Pengguna berhasil dihapus.";
          this.status = "SUCCESS";
          this.showDeleteConfirmation = false;
        } else {
          this.message = "Gagal menghapus pengguna.";
          this.status = "ERROR";
        }
      } catch (error) {
        this.message = error.response.data.message;
        this.status = "ERROR";
      }
    },
    openDeleteConfirmation(id) {
      this.selectedUserId = id;
      this.showDeleteConfirmation = true;
    },

    // untuk menampilkan popup management device
    openConfirmationDevice(item) {
      this.selectedDevice = {
        ...item,
        id_region: item.id_region,
        nama_perangkat: item.nama_perangkat,
        maksimum_air: item.maksimum_air,
        harga: item.harga,
      };
      this.showConfirmationDevice = true;
      this.message = "";
      this.status = "";
    },

    async editDevice(deviceData) {
      console.log(deviceData);
      try {
        if (!deviceData || !deviceData.id) {
          return;
        }
        await this.updateDevice(deviceData.id, deviceData);
      } catch (error) {
        this.message = error.response.data.message;
        this.status = "ERROR";
      }
    },

    async updateDevice(id, deviceData) {
      try {
        // Kirim permintaan ke server untuk mengubah peran pengguna
        console.log(deviceData);
        const response = await this.$axios.put(`/devices/${id}`, {
          ...deviceData,
          regionId: deviceData.id_region,
          name: deviceData.nama_perangkat,
          max: deviceData.maksimum_air,
          price: deviceData.harga,
        });

        // Jika permintaan berhasil dan server memberikan respons status 200 (OK)
        if (response.status === 200) {
          // Emit event untuk memberi tahu parent bahwa peran telah diubah
          this.$emit("device-changed", id, deviceData);

          // Beritahu pengguna bahwa peran telah diubah dengan sukses (opsional)
          this.message = "Perangkat berhasil diubah.";
          this.status = "SUCCESS";
          this.showConfirmationDevice = false;
        } else {
          // Jika server memberikan respons selain 200, maka tampilkan pesan kesalahan (opsional)
          this.message = "Gagal mengubah perangkat.";
          this.status = "ERROR";
        }
      } catch (error) {
        this.message = error.response.data.message;
        this.status = "ERROR";
      }
    },
    openDeleteConfirmationDevice(id) {
      this.selectedDeviceId = id;
      this.showDeleteConfirmationDevice = true;
    },

    async deleteDevice(id) {
      try {
        const response = await this.$axios.delete(`/devices/${id}`);
        if (response.status === 200) {
          this.$emit("delete-device", id);
          this.message = "Perangkat berhasil dihapus.";
          this.status = "SUCCESS";
          this.showDeleteConfirmationDevice = false;
        } else {
          this.message = "Gagal menghapus Perangkat.";
          this.status = "ERROR";
        }
      } catch (error) {
        this.message = error.response.data.message;
        this.status = "ERROR";
      }
    },
    closeNotification() {
      this.message = "";
      this.status = "";
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
