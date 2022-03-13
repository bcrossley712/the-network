<template>
  <div class="row mb-3">
    <div class="col-5 text-end">
      <button
        class="btn btn-outline-secondary"
        :disabled="postsObject.newer === null"
        @click="changePage(postsObject.newer)"
      >
        Previous
      </button>
    </div>
    <div class="col-2 d-flex align-items-center justify-content-center">
      {{ postsObject.page }}
    </div>
    <div class="col-5">
      <button
        class="btn btn-outline-secondary"
        :disabled="postsObject.older === null"
        @click="changePage(postsObject.older)"
      >
        Next
      </button>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { AppState } from "../AppState";
import { postsService } from "../services/PostsService";
export default {
  setup() {
    return {
      postsObject: computed(() => AppState.postsObject),
      async changePage(url) {
        try {
          await postsService.changePage(url);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>