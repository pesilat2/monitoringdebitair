<template>
  <div class="w-full overflow-y-auto">
    <Header :title="headerTitle" :iconClasses="headerClass" />
    <div class="grid grid-cols-3 p-4 w-full gap-6 transition-all">
      <!-- profile -->
      <ProfilePage :isEdit="editProfile" @showEditForm="showEditForm" />
      <!-- edit profile -->
      <FromEditProfile :isEdit="editProfile" @closeEditForm="closeEditForm" />
    </div>
  </div>
</template>

<script>
import Header from "~/components/Header.vue";
import ItemProfile from "~/components/ItemProfile.vue";
import Input from "~/components/inputs/Input.vue";
import Button from "~/components/Button.vue";
import { mapGetters } from "vuex";
import ProfilePage from "~/components/ProfilePage.vue";
import FromEditProfile from "~/components/FormEditProfile.vue";

export default {
  components: {
    Header,
    ItemProfile,
    ProfilePage,
    FromEditProfile,
    Input,
    Button,
  },
  data() {
    return {
      headerTitle: "Profile",
      headerClass: "ri-file-user-fill ",

      changeImage: "",
      editProfile: false,
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
  },
  methods: {
    showEditForm() {
      this.editProfile = true;
    },
    closeEditForm() {
      this.editProfile = false;
    },
  },
};
</script>
