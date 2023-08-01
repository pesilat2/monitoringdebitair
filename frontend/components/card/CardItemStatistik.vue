<template>
  <div
    @click="changeVariant(data.value)"
    :class="`col-span-3 lg:col-span-1 bg-white shadow-lg rounded-xl w-full hover:scale-105 shadow-md transition-transform`"
  >
    <div class="flex justify-between items-center px-5 py-4">
      <div>
        <h3 class="text-heading-4 text-black font-heading-1">
          {{ data.label }}
        </h3>
        <p class="text-heading-4 text-primary font-heading-1">
          {{ data.debitWater }} Liter
        </p>
      </div>
      <div
        class="bg-secondary p-3 rounded-lg w-24 h-24 flex justify-center items-center"
      >
        <i class="ri-contrast-drop-line text-heading-1 text-black"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    variant: String,
  },
  name: "CardItemDashboard",
  methods: {
    changeVariant() {
      this.$emit("changeVariant", this.data.value);
      console.log(this.variant);
    },
  },
};
</script>

<style></style>
