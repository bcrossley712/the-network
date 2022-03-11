<template>
  <div class="billboard">
    <img class="img-fluid" :src="billboard.tall" alt="" />
  </div>
</template>


<script>
export default {
  props: {
    billboard: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
};
</script>


<style lang="scss" scoped>
</style>