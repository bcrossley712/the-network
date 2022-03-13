<template>
  <div class="row flex-column d-flex w-100">
    <div class="col-12 bg-white p-0 m-0 side-bar">
      <div v-if="profile.id" class="p-2">
        <div class="d-flex flex-column justify-content-center">
          <img
            class="img-picture rounded-circle"
            :src="profile.picture"
            alt=""
          />
        </div>
        <i
          class="fas fa-graduation-cap fs-1 pe-4 d-flex justify-content-end"
          title="Graduated"
          v-if="profile.graduated"
        ></i>
        <div class="">
          <h5>{{ profile.class }}</h5>
          <h3>{{ profile.name }}</h3>
          <div class="d-flex justify-content-around">
            <div v-if="profile.linkedin" class="d-flex align-items-center">
              <a
                :href="profile.linkedin"
                class="mdi mdi-linkedin fs-1 selectable text-primary"
                :title="profile.linkedin"
              ></a>
            </div>
            <div v-if="profile.github" class="d-flex align-items-center">
              <a
                :href="profile.github"
                class="mdi mdi-github fs-1 selectable text-primary"
                :title="profile.github"
              ></a>
            </div>
          </div>
          <div class="d-flex justify-content-around">
            <div v-if="profile.email" class="d-flex align-items-center">
              <a
                :href="`mailto: ${profile.email}`"
                class="mdi mdi-email fs-1 selectable text-primary"
                :title="profile.email"
              ></a>
            </div>
            <div v-if="profile.resume" class="py-2">
              <a :href="profile.resume">
                <img
                  src="../assets/img/resume.png"
                  class="icon selectable ps-1"
                  :title="profile.resume"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center p-2">
        <h5 class="lh-lg">Sign up now to fully enjoy Network</h5>
        <button
          class="
            btn btn-primary
            selectable
            text-light text-uppercase
            my-2 my-lg-0
          "
          @click="login"
          v-if="!user.isAuthenticated"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity";
import { AppState } from "../AppState";
import { AuthService } from "../services/AuthService";
export default {
  setup() {
    return {
      profile: computed(() => AppState.account),
      user: computed(() => AppState.user),
      async login() {
        AuthService.loginWithPopup();
      },
    };
  },
};
</script>


<style lang="scss" scoped>
.side-bar {
  height: 100vw;
  width: 17vw;
  position: fixed;
}
.icon {
  max-height: 35px;
}

.img-picture {
  height: 180px;
  width: 180px;
}
</style>