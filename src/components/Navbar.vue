<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-3">
    <div class="navbar-brand d-flex selectable btn" @click="goTo">
      <div class="d-flex flex-column align-items-center">
        <img
          class="rounded-circle img-small"
          alt="logo"
          src="../assets/img/network-logo.jpg"
          height="45"
        />
      </div>
      <h1 class="ps-2">Network</h1>
    </div>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <!-- <li>
          <router-link
            :to="{ name: 'Home' }"
            class="btn text-success lighten-30 selectable text-uppercase"
          >
            Home
          </router-link>
        </li> -->
      </ul>
      <form class="input-group w-25 pe-2" @submit.prevent="search">
        <input
          type="text"
          class="form-control"
          placeholder="Search..."
          v-model="editable"
        />
        <button
          class="btn btn-secondary"
          type="button"
          id="button-addon2"
          title="Search"
        >
          <i class="mdi mdi-magnify"></i>
        </button>
      </form>
      <span class="navbar-text">
        <div class="dropdown my-2 my-lg-0" v-if="user.isAuthenticated">
          <div
            class="dropdown-toggle selectable"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            id="authDropdown"
          >
            <img
              :src="user.picture"
              alt="user photo"
              height="40"
              class="rounded"
            />
            <span class="mx-3 text-success lighten-30">{{ user.name }}</span>
          </div>
          <div
            class="dropdown-menu p-0 list-group w-100"
            aria-labelledby="authDropdown"
          >
            <router-link :to="{ name: 'Profile', params: { id: account.id } }">
              <div class="list-group-item list-group-item-action hoverable">
                My Profile
              </div>
            </router-link>
            <div
              class="
                list-group-item list-group-item-action
                hoverable
                text-danger
              "
              @click="logout"
            >
              <i class="mdi mdi-logout"></i>
              logout
            </div>
          </div>
        </div>
      </span>
    </div>
  </nav>
</template>

<script>
import { AuthService } from "../services/AuthService";
import { AppState } from "../AppState";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
export default {
  setup() {
    const router = useRouter();
    const editable = ref("");
    return {
      editable,
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      async search() {
        try {
          AppState.searchTerm = editable.value;
          router.push({ name: "Home" });
          editable.value = "";
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      goTo() {
        AppState.searchTerm = "";
        router.push({ name: "Home" });
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      },
    };
  },
};
</script>

<style scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
