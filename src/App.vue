<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid m-0 h-100 flex-column d-flex">
    <div class="row h-100 flex-grow-1">
      <div class="col-md-3 p-0 m-0">
        <Sidebar />
      </div>
      <div class="col-md-9 p-0">
        <router-view />
      </div>
    </div>
  </main>
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";
export default {
  name: "App",
  setup() {
    return {
      appState: computed(() => AppState),
    };
  },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
