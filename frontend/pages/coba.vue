<template>
  <div>
    <Button label="Masuk" type="submit" primary :click="onClick" />
    <div @click="onClick">coba</div>
  </div>
</template>

<script>
import Button from "~/components/Button.vue";
export default {
  components: {
    Button,
  },
  methods: {
    onClick() {
      // this.$router.go(-1);
      console.log("coba");
    },
  },
};
</script>
