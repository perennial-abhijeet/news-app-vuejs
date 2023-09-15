<template>
  <div>
    <h1 class="page-header">Latest News</h1>
    <div class="news-list">
      <NewsCard
        v-for="article in getNews"
        :key="article.title"
        :article="article"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NewsCard from "../components/NewsCard.vue";

export default {
  components: {
    NewsCard,
  },
  computed: {
    ...mapGetters(["getNews"]),
  },
  methods: {
    ...mapActions(["fetchNews"]),
    onScroll() {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollY + windowHeight >= documentHeight) {
        this.fetchNews();
      }
    },
  },
  mounted() {
    this.fetchNews();

    window.addEventListener("scroll", this.onScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  },
};
</script>

<style scoped>
.page-header {
  text-align: center;
}

.news-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

@media (max-width: 865px) {
  .news-card {
    width: 100%;
    margin: 10;
  }
}

@media (min-width: 866px) {
  .news-card {
    width: calc(46% - 20px);
    margin: 10px;
  }
}

@media (min-width: 1400px) {
  .news-card {
    width: calc(30% - 20px);
    margin: 10px;
  }
}

@media (min-width: 1716px) {
  .news-card {
    width: calc(23% - 20px);
    margin: 10px;
  }
}
</style>
