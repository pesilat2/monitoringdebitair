<template>
  <div class="bg-white shadow-lg rounded-xl w-full">
    <div class="pt-6 px-8">
      <h3 class="text-heading-4 text-black font-heading-1">
        {{ title }}
      </h3>
    </div>
    <div
      class="pt-6 px-8 flex flex-wrap gap-6 lg:gap-0 justify-end lg:justify-between items-center"
    >
      <div class="relative w-full lg:w-[50%] z-0">
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
      <div>
        <button
          v-if="dashboardType === 'daftarPerangkat'"
          class="bg-primary text-white px-4 py-3 rounded-lg transition duration-300 ease-in-out"
          @click="openConfirmationDevice"
        >
          Tambah Data
        </button>
        <button
          v-if="dashboardType === 'daftarPengguna'"
          class="bg-primary text-white px-4 py-3 rounded-lg transition duration-300 ease-in-out"
          @click="openConfirmation"
        >
          Tambah Data
        </button>
        <button
          v-if="dashboardType === 'daftarPenggunaDaerah'"
          class="bg-primary text-white px-4 py-3 rounded-lg transition duration-300 ease-in-out"
          @click="openConfirmationUserRegion"
        >
          Tambah Data
        </button>
        <button
          v-if="dashboardType === 'daftarDesa'"
          class="bg-primary text-white px-4 py-3 rounded-lg transition duration-300 ease-in-out"
          @click="openConfirmationRegion"
        >
          Tambah Data
        </button>
      </div>
    </div>
    <div class="mt-4">
      <DashboardTable
        :dashboardType="dashboardType"
        :tableData="filteredData"
        @user-changed="handleUserChanged"
        @delete-user="handleDeleteUser"
        @user-region-changed="handleUserRegionChanged"
        @delete-user-region="handleDeleteUserRegion"
        @device-changed="handleDeviceChanged"
        @delete-device="handleDeleteDevice"
        @region-changed="handleRegionChanged"
        @delete-region="handleDeleteRegion"
      />
    </div>
    <PopupEdit
      :showPopup="showConfirmation"
      @update:showPopup="showConfirmation = $event"
      :user="userData"
      @confirmed="createUser(userData)"
      title="Buat Akun Baru"
      :type="createUserData"
    />
    <PopupEdit
      :showPopup="showConfirmationUserRegion"
      @update:showPopup="showConfirmationUserRegion = $event"
      :user="userDataRegion"
      @confirmed="createUserRegion(userDataRegion)"
      title="Buat Akun Baru"
      :type="createUserDataRegion"
    />
    <PopupAddDevice
      :showPopup="showConfirmationDevice"
      @update:showPopup="showConfirmationDevice = $event"
      :device="deviceData"
      @confirmed="createDevice(deviceData)"
      title="Buat Perangkat Baru"
    />
    <PopupAddRegion
      :showPopup="showConfirmationRegion"
      @update:showPopup="showConfirmationRegion = $event"
      :region="regionData"
      @confirmed="createRegion(regionData)"
      title="Buat Desa Baru"
    />
  </div>
</template>

<script>
import DashboardTable from "~/components/table/DashboardTable.vue";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";

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
      showConfirmation: false,
      showConfirmationDevice: false,
      showConfirmationRegion: false,
      showConfirmationUserRegion: false,
      userData: {
        // id: "",
        nama: "",
        email: "",
        role: "USER",
        password: "",
        regionId: "",
      },
      userDataRegion: {
        // id: "",
        nama: "",
        email: "",
        role: "",
        password: "",
        // regionId: this.loggedInUser.regionId,
      },
      deviceData: {
        id_region: "",
        nama_perangkat: "",
        maksimum_air: "",
        harga: "",
      },
      regionData: {
        // id: "",
        nama: "",
      },
      createUserData: "create",
      createUserDataRegion: "createUserDaerah",
    };
  },
  mounted() {
    console.log("carditem", this.userDataRegionComputed);
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
    ...mapGetters(["loggedInUser"]),
    userDataRegionComputed() {
      return {
        ...this.userDataRegion,
        regionId: this.loggedInUser.regionId,
      };
    },
    localTableData() {
      return this.tableData;
    },
    // Buat computed property untuk mendapatkan data yang telah difilter berdasarkan search
    filteredData() {
      if (this.search.trim() === "") {
        // Jika search kosong, tampilkan semua data
        return this.localTableData;
      } else {
        // Jika search tidak kosong, filter data berdasarkan search
        return this.localTableData.filter((item) => {
          // Misalkan kita ingin mencari berdasarkan kolom "namaDaerah", sesuaikan dengan kolom yang diinginkan
          return item[this.searchByColumn]
            .toLowerCase()
            .includes(this.search.trim().toLowerCase());
        });
      }
    },
    ...mapMutations(["closeNotification"]),
  },
  methods: {
    ...mapMutations(["addNotification"]),
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
        case "daftarPerangkat":
          return "nama_perangkat";
        default:
          return "nama"; // Ganti dengan nilai default yang sesuai ( ini untuk manajement pengguna)
      }
    },
    // Tangani perubahan data yang diberikan dari DashboardTable
    handleUserChanged(id, user) {
      console.log(id, user);
      // Perbarui data yang diberikan oleh DashboardTable dengan nilai yang baru
      this.tableData = this.tableData.map((item) => {
        if (item.id === id) {
          item.nama = user.nama;
          item.email = user.email;
          item.role = user.role;
          item.regionId = user.regionId;
        }
        return item;
      });
    },
    handleDeleteUser(id) {
      // Cari indeks data yang dihapus dalam tableData
      const deletedIndex = this.tableData.findIndex((item) => item.id === id);

      // Jika indeks data yang dihapus ditemukan, hapus data tersebut dari array tableData
      if (deletedIndex !== -1) {
        this.tableData.splice(deletedIndex, 1);

        // Perbarui kembali index untuk data-data yang ada setelah data yang dihapus
        // dengan mengurangi 1 pada index-nya
        for (let i = deletedIndex; i < this.tableData.length; i++) {
          this.tableData[i].index -= 1;
        }
      }
    },
    handleUserRegionChanged(id, userRegion) {
      console.log(id, userRegion);
      // Perbarui data yang diberikan oleh DashboardTable dengan nilai yang baru
      this.tableData = this.tableData.map((item) => {
        if (item.id === id) {
          item.nama = userRegion.nama;
          item.email = userRegion.email;
          item.role = userRegion.role;
        }
        return item;
      });
    },
    handleDeleteUserRegion(id) {
      // Cari indeks data yang dihapus dalam tableData
      const deletedIndex = this.tableData.findIndex((item) => item.id === id);

      // Jika indeks data yang dihapus ditemukan, hapus data tersebut dari array tableData
      if (deletedIndex !== -1) {
        this.tableData.splice(deletedIndex, 1);

        // Perbarui kembali index untuk data-data yang ada setelah data yang dihapus
        // dengan mengurangi 1 pada index-nya
        for (let i = deletedIndex; i < this.tableData.length; i++) {
          this.tableData[i].index -= 1;
        }
      }
    },
    resetFormData(data, type) {
      data.nama = "";
      data.email = "";
      data.role = "";
      if (type) {
        data.role = "USER";
      }
      data.password = "";
      data.id_region = "";
      data.nama_perangkat = "";
      data.maksimum_air = "";
      data.harga = "";
      data.regionId = "";
      data.index = "";
      data.id = "";
    },
    async createUser(userData) {
      try {
        // Kirim permintaan ke server untuk membuat pengguna baru
        const response = await this.$axios.post("/signup", {
          fullname: userData.nama,
          email: userData.email,
          role: userData.role,
          password: userData.password,
          regionId: userData.regionId,
        });

        // Jika permintaan berhasil dan server memberikan respons status 201 (Created)
        if (response.status === 201) {
          // Dapatkan ID pengguna baru dari respons server
          const newUserId = response.data.data.id;
          console.log(newUserId);

          // Dapatkan indeks terakhir dalam tabel data saat ini

          const newUser = {
            id: newUserId,
            index: 1,
            nama: userData.nama,
            email: userData.email,
            role: userData.role,
            regionId: userData.regionId,
          };
          // Tambahkan pengguna baru ke dalam tabel data
          this.tableData.push(newUser);

          for (let i = 1; i < this.tableData.length; i++) {
            this.tableData[i].index = i + 1;
          }

          // Kosongkan nilai input setelah berhasil menambahkan data perangkat
          this.resetFormData(userData, true);

          // Beritahu pengguna bahwa pengguna baru telah dibuat dengan sukses (opsional)
          this.addNotification({
            message: "Pengguna baru berhasil dibuat!",
            status: "success",
          });
          this.showConfirmation = false;
        } else {
          // Jika server memberikan respons selain 201, maka tampilkan pesan kesalahan (opsional)
          this.addNotification({
            message: "Gagal membuat pengguna baru. Silakan coba lagi.",
            status: "error",
          });
        }
      } catch (error) {
        // Jika terjadi kesalahan pada permintaan atau server memberikan respons error, tampilkan pesan kesalahan (opsional)
        this.addNotification({
          message: error.response.data.message,
          status: "error",
        });
      }
    },
    openConfirmation() {
      this.showConfirmation = true;
    },

    // Fungsi untuk membuat pengguna baru daerah
    async createUserRegion(userDataRegion) {
      try {
        const regionId = this.userDataRegionComputed.regionId;
        // Kirim permintaan ke server untuk membuat pengguna baru
        const response = await this.$axios.post("/signup", {
          fullname: userDataRegion.nama,
          email: userDataRegion.email,
          role: userDataRegion.role,
          password: userDataRegion.password,
          regionId: regionId,
        });

        // Jika permintaan berhasil dan server memberikan respons status 201 (Created)
        if (response.status === 201) {
          // Dapatkan ID pengguna baru dari respons server
          const newUserId = response.data.data.id;
          console.log(newUserId);

          const newUser = {
            id: newUserId,
            index: 1,
            nama: userDataRegion.nama,
            email: userDataRegion.email,
            role: userDataRegion.role,
            regionId: regionId,
          };

          console.log("regionIdHarusMasuk", newUser);
          // Tambahkan pengguna baru ke dalam tabel data
          this.tableData.unshift(newUser);

          for (let i = 1; i < this.tableData.length; i++) {
            this.tableData[i].index = i + 1;
          }

          // Kosongkan nilai input setelah berhasil menambahkan data perangkat
          this.resetFormData(userDataRegion);

          // Beritahu pengguna bahwa pengguna baru telah dibuat dengan sukses (opsional)
          this.addNotification({
            message: "Pengguna baru berhasil dibuat!",
            status: "success",
          });
          this.showConfirmationUserRegion = false;
        } else {
          // Jika server memberikan respons selain 201, maka tampilkan pesan kesalahan (opsional)
          this.addNotification({
            message: "Gagal membuat pengguna baru. Silakan coba lagi.",
            status: "error",
          });
        }
      } catch (error) {
        // Jika terjadi kesalahan pada permintaan atau server memberikan respons error, tampilkan pesan kesalahan (opsional)
        this.addNotification({
          message: error.response.data.message,
          status: "error",
        });
      }
    },
    openConfirmationUserRegion() {
      this.showConfirmationUserRegion = true;
    },

    // device
    openConfirmationDevice() {
      this.showConfirmationDevice = true;
    },

    handleDeviceChanged(id, device) {
      console.log(id, device);
      // Perbarui data yang diberikan oleh DashboardTable dengan nilai yang baru
      this.tableData = this.tableData.map((item) => {
        if (item.id === id) {
          item.id_region = device.id_region;
          item.nama_perangkat = device.nama_perangkat;
          item.maksimum_air = device.maksimum_air;
          item.harga = device.harga;
        }
        return item;
      });
    },

    handleDeleteDevice(id) {
      // Cari indeks data yang dihapus dalam tableData
      const deletedIndex = this.tableData.findIndex((item) => item.id === id);

      // Jika indeks data yang dihapus ditemukan, hapus data tersebut dari array tableData
      if (deletedIndex !== -1) {
        this.tableData.splice(deletedIndex, 1);

        // Perbarui kembali index untuk data-data yang ada setelah data yang dihapus
        // dengan mengurangi 1 pada index-nya
        for (let i = deletedIndex; i < this.tableData.length; i++) {
          this.tableData[i].index -= 1;
        }
      }
    },

    async createDevice(deviceData) {
      console.log(deviceData);
      try {
        // Kirim permintaan ke server untuk membuat pengguna baru
        const response = await this.$axios.post("/devices", {
          regionId: deviceData.id_region,
          name: deviceData.nama_perangkat,
          max: deviceData.maksimum_air,
          price: deviceData.harga,
        });

        // Jika permintaan berhasil dan server memberikan respons status 201 (Created)
        if (response.status === 201) {
          // Dapatkan ID pengguna baru dari respons server
          const device = {
            id: response.data.data.deviceId,
            index: 1,
            id_region: deviceData.id_region,
            nama_perangkat: deviceData.nama_perangkat,
            maksimum_air: deviceData.maksimum_air,
            harga: deviceData.harga,
          };

          console.log(response);

          // Tambahkan pengguna baru ke dalam tabel data
          this.tableData.push(device);

          for (let i = 1; i < this.tableData.length; i++) {
            this.tableData[i].index = i + 1;
          }

          // Kosongkan nilai input setelah berhasil menambahkan data perangkat
          this.resetFormData(deviceData);

          // Beritahu pengguna bahwa pengguna baru telah dibuat dengan sukses (opsional)
          this.addNotification({
            message: "Perangkat baru berhasil dibuat!",
            status: "success",
          });
          this.showConfirmationDevice = false;
        } else {
          this.addNotification({
            // Jika server memberikan respons selain 201, maka tampilkan pesan kesalahan (opsional)
            message: "Gagal membuat perangkat baru. Silahkan coba lagi",
            status: "error",
          });
        }
      } catch (error) {
        // Jika terjadi kesalahan pada permintaan atau server memberikan respons error, tampilkan pesan kesalahan (opsional)
        this.addNotification({
          message: error.response.data.message,
          status: "error",
        });
      }
    },

    // region
    async createRegion(regionData) {
      try {
        // Kirim permintaan ke server untuk membuat pengguna baru
        // const response = await this.$axios.post("/regions", {
        //   name: regionData.nama,
        // });

        const response = await fetch(
          "https://monitoring-debit-air.vercel.app/api/regions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItdmpPcjRNQ2tDbVJXZ1c0QXRvMGJBIiwiaWF0IjoxNjkwNTY5NzM0LCJleHAiOjE2OTA2NTYxMzR9.8z5K-Rldo1M_DcY7GNU5bZU5JIx8HMfJ8Ho1QkBCe8A`,
            },
            body: JSON.stringify({
              name: regionData.nama,
            }),
          }
        );
        console.log("respon", response);
        // Jika permintaan berhasil dan server memberikan respons status 201 (Created)
        if (response.status === 201) {
          const newRegion = {
            index: 1, // Set the new region's index to 1 since it will be placed at the beginning
            id: response.data.data.regionId,
            nama: regionData.nama,
          };

          console.log("newRegion", newRegion);

          // Add the new region to the beginning of the tableData array using unshift
          this.tableData.unshift(newRegion);

          // Update the indices of existing regions by incrementing them by 1
          for (let i = 1; i < this.tableData.length; i++) {
            this.tableData[i].index = i + 1;
          }

          // Beritahu pengguna bahwa pengguna baru telah dibuat dengan sukses (opsional)
          this.addNotification({
            message: "Desa baru berhasil dibuat!",
            status: "success",
          });

          this.showConfirmationRegion = false;
          // this.resetFormData(newRegion);
        } else {
          // Jika server memberikan respons selain 201, maka tampilkan pesan kesalahan (opsional)
          this.addNotification({
            message: "Gagal membuat desa baru. Silakan coba lagi.",
            status: "error",
          });
        }
      } catch (error) {
        // Jika terjadi kesalahan pada permintaan atau server memberikan respons error, tampilkan pesan kesalahan (opsional)
        this.addNotification({
          message: error.response.data.message,
          status: "error",
        });
      }
    },
    openConfirmationRegion() {
      this.showConfirmationRegion = true;
    },

    handleRegionChanged(id, region) {
      console.log(id, region);
      // Perbarui data yang diberikan oleh DashboardTable dengan nilai yang baru
      this.tableData = this.tableData.map((item) => {
        if (item.id === id) {
          item.nama = region.nama;
        }
        return item;
      });
    },

    handleDeleteRegion(id) {
      // Cari indeks data yang dihapus dalam tableData
      const deletedIndex = this.tableData.findIndex((item) => item.id === id);

      // Jika indeks data yang dihapus ditemukan, hapus data tersebut dari array tableData
      if (deletedIndex !== -1) {
        this.tableData.splice(deletedIndex, 1);

        // Perbarui kembali index untuk data-data yang ada setelah data yang dihapus
        // dengan mengurangi 1 pada index-nya
        for (let i = deletedIndex; i < this.tableData.length; i++) {
          this.tableData[i].index -= 1;
        }
      }
    },
  },
};
</script>

<style></style>
