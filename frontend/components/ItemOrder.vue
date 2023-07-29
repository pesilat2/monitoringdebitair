<template>
  <div class="w-full grid grid-cols-5 mt-4">
    <div class="col-span-2 bg-[#7895CB] h-16 flex justify-center items-center">
      <h1 class="text-white text-heading-4 font-heading-1">
        {{ data.quantity }} Liter
      </h1>
    </div>
    <div class="col-span-2 bg-[#7895CB] h-16 flex justify-center items-center">
      <h1 class="text-white text-heading-4 font-heading-1">
        {{ data.deviceId }}
      </h1>
    </div>
    <div class="col-span-1 bg-[#7895CB] h-16 flex justify-center items-center">
      <h1 class="text-white text-heading-4 font-heading-1">
        {{ data.totalPrice }}
      </h1>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    data: Object,
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
  },
};
</script>
