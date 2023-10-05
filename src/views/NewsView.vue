<template>
  <div>
    <Filters />
    <h2 class="page-header">{{ getNews.length }} News Result(s)</h2>
    <div class="news-grid" v-if="getNews.length">
      <NewsCard
        v-for="article in getNews"
        :key="article.title"
        :article="article"
      />
    </div>
    <div v-else class="no-news">
      <h3>No news found.</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NewsCard from "../components/NewsCard.vue";
import Filters from "../components/Filters.vue";

export default {
  components: {
    NewsCard,
    Filters,
  },
  computed: {
    ...mapGetters(["getNews"]),
  },
  methods: {
    ...mapActions(["fetchNews", "resetPage"]),
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

.no-news {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.no-news h3 {
  text-align: center;
  font-size: 1.5rem;
  margin-top: -200px;
}

.news-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  justify-items: center;
  padding-bottom: 60px;
}

.news-card {
  width: 100%; /* or adjust as needed */
}

@media (max-width: 1400px) {
  .news-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    justify-items: center;
  }
}

@media (max-width: 1024px) {
  .news-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    justify-items: center;
  }
}

@media (max-width: 698px) {
  .news-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
    justify-items: center;
  }
}
</style>
