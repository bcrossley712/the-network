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
                  alt="Profile pic"
                />
              </div>
              <div class="my-4 text-end">
                <i
                  class="fas fa-graduation-cap fs-1 pe-4"
                  title="Graduated"
                  v-if="profile.graduated"
                ></i>
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
                  :href="`mailto: ${profile.email}`"
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
        <CreatePostForm />
        <!-- End Form -->
        <div class="row">
          <div class="col-10 offset-1" v-for="p in posts" :key="p.id">
            <Post :post="p" />
          </div>
        </div>
        <!-- Start PageChangeForm -->
        <PageChangeForm />
        <!-- End -->
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
import { computed } from "@vue/reactivity";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { watchEffect } from "@vue/runtime-core";
import { AppState } from "../AppState";
import { billboardsService } from "../services/BillboardsService";
import { profilesService } from "../services/ProfilesService";
import { useRoute } from "vue-router";
export default {
  setup() {
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
      account: computed(() => AppState.account),
      activeProfile: computed(() => AppState.activeProfile),
      billboards: computed(() => AppState.billboards),
      posts: computed(() => AppState.posts),
      profile: computed(() => AppState.activeProfile),
      profileBgImg: computed(() => `url(${AppState.activeProfile?.coverImg})`),
    };
  },
};
</script>


<style lang="scss" scoped>
@media only screen and (min-width: 768px) {
  .img-picture {
    transform: translateY(90px);
  }
}
.img-picture {
  height: 180px;
  width: 180px;
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