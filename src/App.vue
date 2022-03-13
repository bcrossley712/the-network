<template>
  <header class="sticky-top">
    <Navbar />
  </header>
  <main class="container-fluid">
    <div class="row">
      <div class="col-md-3 col-xl-2 mobile">
        <Sidebar />
      </div>
      <div class="col-12 col-md-9 col-xl-10 p-0">
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
.sidebar {
  height: 100vh;
  position: fixed;
}
@media only screen and (max-width: 768px) {
  .mobile {
    display: none;
  }
}
</style>
