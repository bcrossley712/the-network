<template>
  <div class="post bg-white rounded shadow my-3 py-2">
    <div class="d-flex p-2">
      <img
        @click="goTo"
        class="img-small rounded-circle selectable"
        :src="post.creator?.picture"
        alt=""
      />
      <div class="p-2 ms-3">
        <b class="mb-1">{{ post.creator?.name }}</b>
        <p class="mt-1">{{ date }} {{ post.graduated }}</p>
      </div>
    </div>
    <div class="px-3">{{ post.body }}</div>
    <div class="py-2 d-flex justify-content-center" v-if="post.imgUrl">
      <img class="img-fluid" :src="post.imgUrl" alt="" />
    </div>
    <div class="d-flex justify-content-end pe-1">
      <i class="mdi mdi-heart-outline selectable"></i>
      <p class="ps-2">{{ post.likes?.length }}</p>
    </div>
  </div>
</template>


<script>
import { useRouter } from "vue-router";
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    let dateFormat = new Intl.DateTimeFormat("en", {
      timeStyle: "short",
      dateStyle: "short",
    });
    let date = dateFormat.format(new Date(props.post.createdAt));
    return {
      date,
      goTo() {
        router.push({ name: "Profile", params: { id: props.post.creatorId } });
      },
    };
  },
};
</script>


<style lang="scss" scoped>
.img-small {
  height: 80px;
  width: 80px;
}
</style>