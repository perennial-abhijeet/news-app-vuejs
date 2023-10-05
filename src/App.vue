<script>
import { RouterView } from "vue-router";
import { mapActions } from "vuex";
import Header from "./components/Header.vue";

export default {
  components: {
    Header,
  },
  created() {
    // Dispatch the action to load the selected article
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

<style scoped>
.app-container {
  background-color: #cccccc;
}
.container {
  max-width: 85%;
  margin: auto;
}
</style>
