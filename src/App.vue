<script>
import { RouterView } from "vue-router";
import { mapActions } from "vuex";
import Header from "./components/Header.vue";

export default {
  components: {
    Header,
  },
  created() {
    this.loadSelectedArticle();
  },
  methods: {
    ...mapActions(["loadSelectedArticle"]),
  },
};
</script>

<template>
  <div class="app-container">
    <Header />
    <div class="container">
      <RouterView />
    </div>
  </div>
</template>

<style>
.app-container {
  background-color: #cccccc;
  min-height: 100vh;
}

.page-container {
  max-width: 85%;
  margin: auto;
}
</style>
