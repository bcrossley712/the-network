<template>
  <div class="post bg-white rounded shadow my-3 p-2">
    <div class="d-flex">
      <img
        class="img-small rounded-circle"
        :src="post.creator?.picture"
        alt=""
      />
      <div class="p-2 ms-3">
        <p>{{ post.creator?.name }}</p>
        <p>{{ post.createdAt }} {{ post.graduated }}</p>
      </div>
    </div>
    <div class="px-3">{{ post.body }}</div>
    <div class="d-flex justify-content-end pe-1">
      <i class="mdi mdi-heart-outline selectable"></i>
      <p class="ps-2">{{ post.likes?.length }}</p>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    post: {
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
.img-small {
  height: 80px;
  width: 80px;
}
</style>