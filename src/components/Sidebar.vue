<template>
  <div class="row flex-column d-flex w-100">
    <div class="col-12 bg-white p-0 m-0 side-bar">
      <div class="p-2">
        <div class="d-flex flex-column justify-content-center">
          <img class="img-fluid rounded-circle" :src="profile.picture" alt="" />
        </div>
        <div class="ps-4">
          <h5>{{ profile.class }}</h5>
          <h3>{{ profile.name }}</h3>
          <p v-if="profile.linkedin" class="d-flex align-items-center">
            <a
              :href="profile.linkedin"
              class="mdi mdi-linkedin fs-1 selectable text-primary"
              :title="profile.linkedin"
            ></a>
            <b>LinkedIn</b>
          </p>
          <p v-if="profile.github" class="d-flex align-items-center">
            <a
              :href="profile.github"
              class="mdi mdi-github fs-1 selectable text-primary"
              :title="profile.github"
            ></a>
            <b>Github</b>
          </p>
          <p v-if="profile.email" class="d-flex align-items-center">
            <a
              href="mailto:{{profile.email}}"
              class="mdi mdi-email fs-1 selectable text-primary"
              :title="profile.email"
            ></a>
            <b>Email</b>
          </p>
          <p v-if="profile.resume">
            <a :href="profile.resume">
              <img
                src="../assets/img/resume.png"
                class="icon selectable"
                :title="profile.resume"
                alt=""
              />
              <b> Resume </b>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { AppState } from "../AppState";
export default {
  setup() {
    return {
      profile: computed(() => AppState.account),
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
</style>