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
      <PopupEdit
        :showPopup="showConfirmationUserRegion"
        @update:showPopup="showConfirmationUserRegion = $event"
        :user="selectedUserRegion"
        @confirmed="editUserRegion(selectedUserRegion)"
        title="Konfirmasi Perubahan"
        type="editUserDaerah"
      />

      <Popup
        :showPopup="showDeleteConfirmation"
        @update:showPopup="showDeleteConfirmation = $event"
        @confirmed="deleteUser(selectedUserId)"
        title="Konfirmasi Penghapusan"
        message="Apakah anda yakin ingin menghapus akun ini?"
      />

      <Popup
        :showPopup="showDeleteConfirmationUserRegion"
        @update:showPopup="showDeleteConfirmationUserRegion = $event"
        @confirmed="deleteUserRegion(selectedUserRegionId)"
        title="Konfirmasi Penghapusan"
        message="Apakah anda yakin ingin menghapus akun ini?"
      />

      <Popup
        :showPopup="showDeleteConfirmationDevice"
        @update:showPopup="showDeleteConfirmationDevice = $event"
        @confirmed="deleteDevice(selectedDeviceId)"
        title="Konfirmasi Penghapusan"
        message="Apakah anda yakin ingin menghapus perangkat ini?"
      />

      <Popup
        :showPopup="showDeleteConfirmationRegion"
        @update:showPopup="showDeleteConfirmationRegion = $event"
        @confirmed="deleteRegion(selectedRegionId)"
        title="Konfirmasi Penghapusan"
        message="Apakah anda yakin ingin menghapus perangkat ini?"
      />

      <PopupAddDevice
        :showPopup="showConfirmationDevice"
        @update:showPopup="showConfirmationDevice = $event"
        :device="selectedDevice"
        @confirmed="editDevice(selectedDevice)"
        title="Konfirmasi Perubahan"
      />

      <PopupAddRegion
        :showPopup="showConfirmationRegion"
        @update:showPopup="showConfirmationRegion = $event"
        :region="selectedRegion"
        @confirmed="editRegion(selectedRegion)"
        title="Konfirmasi Perubahan"
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
              v-if="dashboardType === 'daftarPenggunaDaerah'"
            >
              Aksi
            </th>
            <th
              class="border-b border-primary_dark text-primary px-4 py-2 text-center text-heading-4"
              v-if="dashboardType === 'daftarPerangkat'"
            >
              Aksi
            </th>
            <th
              class="border-b border-primary_dark text-primary px-4 py-2 text-center text-heading-4"
              v-if="dashboardType === 'daftarDesa'"
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
                <i class="ri-edit-box-fill text-heading-4 text-green-600"></i>
              </button>
              <button
                @click="openDeleteConfirmation(item.id)"
                :disabled="item.role === 'ADMIN_UTAMA'"
              >
                <i class="ri-delete-bin-5-fill text-heading-4 text-red-600"></i>
              </button>
            </td>
            <td
              v-if="dashboardType === 'daftarPenggunaDaerah'"
              class="border-b border-primary_dark text-center text-base lg:text-lg"
            >
              <button @click="openConfirmationUserRegion(item)">
                <i class="ri-edit-box-fill text-heading-4 text-green-600"></i>
              </button>
              <button @click="openDeleteConfirmationUserRegion(item.id)">
                <i class="ri-delete-bin-5-fill text-heading-4 text-red-600"></i>
              </button>
            </td>

            <td
              v-if="dashboardType === 'daftarDesa'"
              class="border-b border-primary_dark text-center text-base lg:text-lg"
            >
              <button @click="openConfirmationRegion(item)">
                <i class="ri-edit-box-fill text-heading-4 text-green-600"></i>
              </button>
              <button @click="openDeleteConfirmationRegion(item.id)">
                <i class="ri-delete-bin-5-fill text-heading-4 text-red-600"></i>
              </button>
            </td>
            <td
              v-if="dashboardType === 'daftarPerangkat'"
              class="border-b border-primary_dark text-center text-base lg:text-lg"
            >
              <button @click="openConfirmationDevice(item)">
                <i class="ri-edit-box-fill text-heading-4 text-green-600"></i>
              </button>
              <button @click="openDeleteConfirmationDevice(item.id)">
                <i class="ri-delete-bin-5-fill text-heading-4 text-red-600"></i>
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
import { mapState, mapMutations, mapGetters } from "vuex";
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
    levelAccess: {
      type: String,
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
      showConfirmationUserRegion: false,
      showDeleteConfirmationUserRegion: false,
      selectedUser: null,
      selectedUserId: null,
      selectedUserRegion: null,
      selectedUserRegionId: null,
      selectedDevice: null,
      selectedDeviceId: null,
      showConfirmationDevice: false,
      showDeleteConfirmationDevice: false,
      selectedRegion: null,
      selectedRegionId: null,
      showConfirmationRegion: false,
      showDeleteConfirmationRegion: false,
    };
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
    ...mapMutations(["closeNotification"]),
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
            { key: "region", label: "Nama Desa" },
          ];
        case "daftarPenggunaDaerah":
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
        case "daftarDesa":
          return [
            { key: "index", label: "No" },
            { key: "id", label: "Id Region" },
            { key: "nama", label: "Nama Desa" },
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
    ...mapMutations(["addNotification"]),
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
        const response = await this.$axios.put(`/update/user/${id}`, {
          ...userData,
          fullname: userData.nama,
          email: userData.email,
          role: userData.role,
          regionId: userData.regionId,
        });

        // Jika permintaan berhasil dan server memberikan respons status 200 (OK)
        if (response.status === 200) {
          // Emit event untuk memberi tahu parent bahwa peran telah diubah
          this.$emit("user-changed", id, userData);

          // Beritahu pengguna bahwa peran telah diubah dengan sukses (opsional)
          this.addNotification({
            message: "Peran pengguna berhasil diubah.",
            status: "success",
          });
          this.showConfirmation = false;
        } else {
          this.addNotification({
            message: "Gagal mengubah peran pengguna.",
            status: "error",
          });
          // Jika server memberikan respons selain 200, maka tampilkan pesan kesalahan (opsional)
        }
      } catch (error) {
        this.addNotification({
          message: error.response.data.message,
          status: "error",
        });
        // Jika terjadi kesalahan pada permintaan atau server memberikan respons error, tampilkan pesan kesalahan (opsional)
      }
    },

    openConfirmation(item) {
      this.selectedUser = {
        ...item,
        fullname: item.nama, // Copy the fullname property to nama
        email: item.email,
        role: item.role, // Copy the role property to role
        regionId: item.regionId,
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
        this.addNotification({
          message: error.response.data.message,
          status: "error",
        });
      }
    },
    async deleteUser(id) {
      try {
        const response = await this.$axios.delete(`/delete/user/${id}`);
        if (response.status === 200) {
          this.$emit("delete-user", id);
          this.addNotification({
            message: "Pengguna berhasil dihapus.",
            status: "success",
          });
          this.showDeleteConfirmation = false;
        } else {
          this.addNotification({
            message: "Gagal menghapus pengguna.",
            status: "error",
          });
        }
      } catch (error) {
        this.addNotification({
          message: error.response.data.message,
          status: "error",
        });
      }
    },
    openDeleteConfirmation(id) {
      this.selectedUserId = id;
      this.showDeleteConfirmation = true;
    },

    // user by region
    async updateUserRegion(id, userRegionData) {
      try {
        // Kirim permintaan ke server untuk mengubah peran pengguna
        const response = await this.$axios.put(`/update/user/${id}`, {
          ...userRegionData,
          fullname: userRegionData.nama,
          email: userRegionData.email,
          role: userRegionData.role,
          // regionId: this.loggedInUser.regionId
        });

        // Jika permintaan berhasil dan server memberikan respons status 200 (OK)
        if (response.status === 200) {
          // Emit event untuk memberi tahu parent bahwa peran telah diubah
          this.$emit("user-region-changed", id, userRegionData);

          // Beritahu pengguna bahwa peran telah diubah dengan sukses (opsional)
          this.addNotification({
            message: "Peran pengguna berhasil diubah.",
            status: "success",
          });
          this.showConfirmationUserRegion = false;
        } else {
          this.addNotification({
            message: "Gagal mengubah peran pengguna.",
            status: "error",
          });
          // Jika server memberikan respons selain 200, maka tampilkan pesan kesalahan (opsional)
        }
      } catch (error) {
        this.addNotification({
          message: error.response.data.message,
          status: "error",
        });
        // Jika terjadi kesalahan pada permintaan atau server memberikan respons error, tampilkan pesan kesalahan (opsional)
      }
    },

    openConfirmationUserRegion(item) {
      this.selectedUserRegion = {
        ...item,
        fullname: item.nama, // Copy the fullname property to nama
        email: item.email,
        role: item.role, // Copy the role property to role
        // regionId: this.loggedInUser.regionId,
      };
      this.showConfirmationUserRegion = true;
    },
    async editUserRegion(userRegionData) {
      try {
        if (!userRegionData || !userRegionData.id) {
          return;
        }
        await this.updateUserRegion(userRegionData.id, userRegionData);
      } catch (error) {
        this.addNotification({
          message: error.response.data.message,
          status: "error",
        });
      }
    },
    async deleteUserRegion(id) {
      try {
        const response = await this.$axios.delete(`/delete/user/${id}`);
        if (response.status === 200) {
          this.$emit("delete-user-region", id);
          this.addNotification({
            message: "Pengguna berhasil dihapus.",
            status: "success",
          });
          this.showDeleteConfirmationUserRegion = false;
        } else {
          this.addNotification({
            message: "Gagal menghapus pengguna.",
            status: "error",
          });
        }
      } catch (error) {
        this.addNotification({
          message: error.response.data.message,
          status: "error",
        });
      }
    },
    openDeleteConfirmationUserRegion(id) {
      this.selectedUserRegionId = id;
      this.showDeleteConfirmationUserRegion = true;
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
          this.addNotification({
            message: "Perangkat berhasil diubah.",
            status: "success",
          });
          this.showConfirmationDevice = false;
        } else {
          this.addNotification({
            message: "Gagal mengubah perangkat.",
            status: "error",
          });
          // Jika server memberikan respons selain 200, maka tampilkan pesan kesalahan (opsional)
        }
      } catch (error) {
        this.addNotification({
          message: error.response.data.message,
          status: "error",
        });
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
          this.addNotification({
            message: "Perangkat berhasil dihapus.",
            status: "success",
          });
          this.showDeleteConfirmationDevice = false;
        } else {
          this.addNotification({
            message: "Gagal menghapus perangkat.",
            status: "error",
          });
        }
      } catch (error) {
        this.addNotification({
          message: error.response.data.message,
          status: "error",
        });
      }
    },

    openConfirmationRegion(item) {
      this.selectedRegion = {
        ...item,
        nama: item.nama,
      };
      this.showConfirmationRegion = true;
    },

    async editRegion(regionData) {
      console.log(regionData);
      try {
        if (!regionData || !regionData.id) {
          return;
        }
        await this.updateRegion(regionData.id, regionData);
      } catch (error) {
        this.message = error.response.data.message;
        this.status = "ERROR";
      }
    },

    async updateRegion(id, regionData) {
      try {
        // Kirim permintaan ke server untuk mengubah peran pengguna

        console.log(regionData);
        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: regionData.nama,
          }),
        };

        // const response = await this.$axios.put(`/regions/${id}`, {
        //   // ...regionData,
        //   name: regionData.nama,
        // });

        const response = await fetch(`/regions/${id}`, requestOptions);

        // Jika permintaan berhasil dan server memberikan respons status 200 (OK)
        if (response.status === 200) {
          // Emit event untuk memberi tahu parent bahwa peran telah diubah
          this.$emit("region-changed", id, regionData);

          // Beritahu pengguna bahwa peran telah diubah dengan sukses (opsional)
          this.addNotification({
            message: "Perangkat berhasil diubah.",
            status: "success",
          });
          this.showConfirmationDevice = false;
        } else {
          this.addNotification({
            message: "Gagal mengubah perangkat.",
            status: "error",
          });
          // Jika server memberikan respons selain 200, maka tampilkan pesan kesalahan (opsional)
        }
      } catch (error) {
        this.addNotification({
          message: error.response.data.message,
          status: "error",
        });
      }
    },

    openDeleteConfirmationRegion(id) {
      this.selectedRegionId = id;
      this.showDeleteConfirmationRegion = true;
    },

    async deleteRegion(id) {
      try {
        const response = await this.$axios.delete(`/regions/${id}`);
        if (response.status === 200) {
          this.$emit("delete-region", id);
          this.addNotification({
            message: "Perangkat berhasil dihapus.",
            status: "success",
          });
          this.showDeleteConfirmationRegion = false;
        } else {
          this.addNotification({
            message: "Gagal menghapus perangkat.",
            status: "error",
          });
        }
      } catch (error) {
        this.addNotification({
          message: error.response.data.message,
          status: "error",
        });
      }
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
