<template>
  <div class="container-fluid">
    <div class="row d-flex align-items-start justify-content-center">
      <div class="col-md-9">
        <div class="row">
          <div class="col-10 offset-1" v-for="p in posts" :key="p.id">
            <Post :post="p" />
          </div>
        </div>
        <PageChangeForm />
      </div>
      <div class="col-md-3">
        <div class="row">
          <div class="col-12 my-4" v-for="b in billboards" :key="b.id">
            <div><Billboard :billboard="b" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { onMounted } from "@vue/runtime-core";
import { postsService } from "../services/PostsService";
import { billboardsService } from "../services/BillboardsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
export default {
  name: "Home",
  setup() {
    onMounted(async () => {
      try {
        await postsService.getPosts();
        await billboardsService.getBillboards();
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      postsObject: computed(() => AppState.postsObject),
      posts: computed(() => AppState.posts),
      billboards: computed(() => AppState.billboards),
      async changePage(num) {
        try {
          await postsService.changePage(num);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
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
