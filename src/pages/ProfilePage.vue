<template>
  <div class="profile-page container-fluid">
    <div class="row d-flex align-items-start justify-content-center">
      <div class="col-md-9">
        <div class="row">
          <div class="col-10 offset-1">
            <div class="bg-white rounded shadow my-3 py-2">
              {{ activeProfile.name }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-10 offset-1" v-for="p in posts" :key="p.id">
            <Post :post="p" />
          </div>
          <div class="row mb-3">
            <div class="col-5 text-end">
              <button
                class="btn btn-outline-secondary"
                :disabled="postsObject.newer === null"
                @click="changePage(-1)"
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
                @click="changePage(1)"
              >
                Next
              </button>
            </div>
          </div>
        </div>
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
import { computed, ref } from "@vue/reactivity";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { onMounted } from "@vue/runtime-core";
import { AppState } from "../AppState";
import { billboardsService } from "../services/BillboardsService";
import { profilesService } from "../services/ProfilesService";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        await billboardsService.getBillboards();
        await profilesService.getProfile(route.params.id);
        await profilesService.getProfilePosts(route.params.id);
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      activeProfile: computed(() => AppState.activeProfile),
      billboards: computed(() => AppState.billboards),
      posts: computed(() => AppState.posts),
      postsObject: computed(() => AppState.postsObject),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>