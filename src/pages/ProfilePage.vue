<template>
  <div class="profile-page container-fluid">
    <div class="row d-flex align-items-start justify-content-center">
      <div class="col-md-9">
        <div class="row">
          <div class="col-10 offset-1">
            <div class="bg-white rounded shadow my-3">
              <div class="img-bg">
                <img
                  class="rounded-circle img-picture ms-3"
                  :src="activeProfile.picture"
                  alt=""
                />
              </div>
              <div class="my-4 text-end">
                <a
                  :href="profile.linkedin"
                  v-if="profile.linkedin"
                  :title="profile.linkedin"
                  class="px-2 selectable fs-2 mdi mdi-linkedin text-primary"
                ></a>
                <a
                  :href="profile.github"
                  v-if="profile.github"
                  :title="profile.github"
                  class="px-2 selectable fs-2 mdi mdi-github text-primary"
                ></a>
                <a
                  href="mailto:{{profile.email}}"
                  v-if="profile.email"
                  :title="profile.email"
                  class="px-2 selectable fs-2 mdi mdi-email text-primary"
                >
                </a>
                <a
                  :href="profile.resume"
                  v-if="profile.resume"
                  :title="profile.resume"
                  class="px-2 selectable fs-2 mdi icon"
                  ><img class="icon" src="../assets/img/resume.png" alt=""
                /></a>
              </div>
              <h5 class="px-2 pt-2 m-0">{{ activeProfile.class }}</h5>
              <h3 class="px-2 pb-2">{{ activeProfile.name }}</h3>
              <p class="px-2 pb-4 m-0">{{ activeProfile.bio }}</p>
              <div v-if="account.id == profile.id" class="text-end">
                <button
                  title="Edit Profile"
                  class="btn-outline-warning btn m-2"
                  data-bs-toggle="modal"
                  data-bs-target="#edit-profile"
                >
                  <i class="mdi mdi-pencil"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Start CreatePostForm -->
        <div class="row" v-if="account.id == profile.id">
          <div class="col-10 offset-1">
            <div class="bg-white rounded shadow my-3 py-2">
              <div class="p-2 d-flex">
                <img
                  class="img-small rounded-circle"
                  :src="profile.picture"
                  alt=""
                />
                <form @submit.prevent="handleSubmit" class="w-100 m-3">
                  <div class="p-1 borderMe w-100">
                    <input
                      class="inputMe align-items-start d-flex"
                      type="text"
                      v-model="editable.body"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="mt-1 d-flex w-75">
                      <label for="image" class="form-label">Add Image:</label>
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
        <!-- End Form -->
        <div class="row">
          <div class="col-10 offset-1" v-for="p in posts" :key="p.id">
            <Post :post="p" />
          </div>
          <!-- Start PageChangeForm -->
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
          <!-- End -->
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
    <Modal id="edit-profile">
      <template #title>Edit Profile</template>
      <template #body><ProfileForm /></template>
    </Modal>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { onMounted, watchEffect } from "@vue/runtime-core";
import { AppState } from "../AppState";
import { billboardsService } from "../services/BillboardsService";
import { profilesService } from "../services/ProfilesService";
import { useRoute } from "vue-router";
import { postsService } from "../services/PostsService";
export default {
  setup() {
    const editable = ref({});
    const route = useRoute();
    watchEffect(async () => {
      try {
        if (route.name == "Profile") {
          await billboardsService.getBillboards();
          await profilesService.getProfile(route.params.id);
          await profilesService.getProfilePosts(route.params.id);
        }
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      editable,
      account: computed(() => AppState.account),
      activeProfile: computed(() => AppState.activeProfile),
      billboards: computed(() => AppState.billboards),
      posts: computed(() => AppState.posts),
      postsObject: computed(() => AppState.postsObject),
      profile: computed(() => AppState.activeProfile),
      profileBgImg: computed(() => `url(${AppState.activeProfile?.coverImg})`),
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
.borderMe {
  border: dashed;
  min-height: 150px;
}
.inputMe {
  border: none;
  width: 100%;
}
.img-picture {
  height: 180px;
  width: 180px;
  transform: translateY(90px);
}
.img-bg {
  background-image: v-bind(profileBgImg);
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  background-position: center;
}
.icon {
  height: 25px;
  display: inline-flex;
}
.img-small {
  height: 80px;
  width: 80px;
}
</style>