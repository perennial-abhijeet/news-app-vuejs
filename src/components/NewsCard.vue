<template>
  <div class="news-card">
    <img
      class="news-image"
      :src="article.urlToImage || defaultImage"
      alt="News Image"
    />
    <div class="news-content">
      <div class="news-data-container">
        <h2 class="news-title">{{ article.title }}</h2>
        <p class="news-author">{{ article.author }}</p>
        <a class="news-url" :href="article.url" target="_blank">{{
          article.url
        }}</a>
        <p class="news-description">{{ article.description }}</p>
      </div>
      <button class="go-to-page-link" @click="goToSingleNewsPage">
        Go to Page
      </button>
      <div class="date-container">
        <p class="news-date">
          Published: {{ formatDate(article.publishedAt) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import defaultImage from "@/assets/images/news-default-image.png";

export default {
  props: {
    article: Object,
  },
  data() {
    return {
      defaultImage: defaultImage,
    };
  },
  methods: {
    ...mapMutations(["SET_SELECTED_ARTICLE"]),
    ...mapActions(["selectArticle"]),
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    },
    async goToSingleNewsPage() {
      // this.SET_SELECTED_ARTICLE(this.article);
      await this.selectArticle(this.article);
      this.$router.push({
        name: "single-news",
      });
    },
  },
};
</script>

<style scoped>
.news-card {
  width: calc(21% - 10px);
  border: 1px solid #ccc;
  background-color: #ffffff;
  margin: 16px 16px 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.news-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.news-content {
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
}

.news-data-container {
  padding: 0 16px;
}

.news-title {
  font-size: 1.5rem;
  font-weight: bold;
  max-height: 3.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.news-url {
  max-width: 150px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.news-description {
  margin: 10px 0;
}

.date-container {
  background-color: #f7f7f7;
  border-top: 1px solid #d8d8d8;
  padding: 0 16px;
}

.news-date {
  color: #6c747d;
  font-size: 0.9rem;
}

.news-author {
  color: #777;
  font-size: 1rem;
  font-weight: bold;
}

.go-to-page-link {
  background-color: #343940;
  height: 40px;
  width: 100px;
  border-radius: 5px;
  color: #fff;
  font-size: 15px;
  border: none;
  margin: 16px;
  cursor: pointer;
}
</style>
