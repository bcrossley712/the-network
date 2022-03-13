<template>
  <div class="row" v-if="account.id == profile.id">
    <div class="col-10 offset-1">
      <div class="bg-white rounded shadow my-3 py-2">
        <div class="p-2 d-flex">
          <img class="img-small rounded-circle" :src="profile.picture" alt="" />
          <form @submit.prevent="handleSubmit" class="w-100 m-3">
            <div class="p-1 borderMe w-100">
              <input
                class="inputMe align-items-start d-flex"
                type="text"
                v-model="editable.body"
                placeholder="Tell us what's on your mind..."
              />
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div class="mt-1 d-flex w-75">
                <input
                  type="text"
                  class="form-control"
                  name="image"
                  id="image"
                  v-model="editable.imgUrl"
                  placeholder="Image Url..."
                />
              </div>
              <div class="selectable">
                <button class="btn">
                  <i class="mdi mdi-send px-2" title="Post"></i>Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { postsService } from "../services/PostsService";
import { AppState } from "../AppState";
export default {
  setup() {
    const editable = ref({});
    return {
      editable,
      profile: computed(() => AppState.activeProfile),
      account: computed(() => AppState.account),
      async handleSubmit() {
        try {
          await postsService.createPost(editable.value);
          editable.value = {};
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
.inputMe {
  border: none;
  width: 100%;
}
.borderMe {
  border: dashed;
  min-height: 100px;
}
.img-small {
  height: 80px;
  width: 80px;
}
</style>