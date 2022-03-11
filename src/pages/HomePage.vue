<template>
  <div class="container-fluid">
    <div class="row d-flex align-items-start justify-content-center">
      <div class="col-9">
        <div class="row">
          <div class="col-10 offset-1" v-for="p in posts" :key="p.id">
            <Post :post="p" />
          </div>
        </div>
      </div>
      <div class="col-3">
        <div>Billboard</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { onMounted } from "@vue/runtime-core";
import { postsService } from "../services/PostsService";
export default {
  name: "Home",
  setup() {
    onMounted(async () => {
      try {
        await postsService.getPosts();
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      posts: computed(() => AppState.posts),
    };
  },
};
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
