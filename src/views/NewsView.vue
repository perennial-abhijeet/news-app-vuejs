<template>
  <div>
    <h1 class="page-header">Latest News</h1>
    <div class="country-select">
      <select
        id="country"
        class="select"
        v-model="selectedCountry"
        @change="updateSelectedCountry"
      >
        <option value="">Select a country</option>
        <option
          v-for="country in countries"
          :key="country.code"
          :value="country.code"
        >
          {{ country.name }}
        </option>
      </select>
    </div>
    <div class="news-list" v-if="getNews.length">
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
import { mapGetters, mapActions, mapMutations } from "vuex";
import NewsCard from "../components/NewsCard.vue";
import { COUNTRY_LIST } from "../shared/constants";

export default {
  components: {
    NewsCard,
  },
  data() {
    return {
      countries: COUNTRY_LIST,
    };
  },
  computed: {
    ...mapGetters(["getNews", "getSelectedCountry"]),
  },
  methods: {
    ...mapMutations(["SET_SELECTED_COUNTRY", "RESET_PAGE"]),
    ...mapActions(["fetchNews", "resetPage"]),
    onScroll() {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollY + windowHeight >= documentHeight) {
        this.fetchNews();
      }
    },
    updateSelectedCountry() {
      this.SET_SELECTED_COUNTRY(this.selectedCountry);
      this.resetPage();
      this.fetchNews();
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

.country-select {
  text-align: right;
  margin-right: 20px;
}

.select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 250px;
  margin-top: 10px;
  margin-bottom: 20px;
  background-color: #fff;
  cursor: pointer;
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
