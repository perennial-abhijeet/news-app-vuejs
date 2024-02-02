<template>
  <div class="single-news-page page-container">
    <div class="single-news-content">
      <h1 class="news-title">{{ getSelectedArticle.title }}</h1>
      <img
        :src="getSelectedArticle.urlToImage || defaultImage"
        alt="News Image"
        class="news-image"
      />
      <div class="news-content">
        <div class="author-date-container">
          <p class="news-author">
            Author: {{ getSelectedArticle.author || "Unknown" }}
          </p>
          <p class="news-date">
            Published: {{ formatDate(getSelectedArticle.publishedAt) }}
          </p>
        </div>
        <p class="news-description">{{ getSelectedArticle.description }}</p>
        <p class="news-content-text">{{ getSelectedArticle.content }}</p>
        <a :href="getSelectedArticle.url" target="_blank">Read more</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import defaultImage from "@/assets/images/news-default-image.png";

export default {
  data() {
    return {
      defaultImage: defaultImage,
    };
  },
  computed: {
    ...mapGetters(["getSelectedArticle"]),
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    },
  },
};
</script>

<style scoped>
.single-news-page {
  min-height: 100vh;
  padding-bottom: 60px;
}

.single-news-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.news-title {
  margin: 40px 20px 60px 20px;
}

.news-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 40px;
}

.news-content {
  font-size: 18px;
  width: 100%;
}

.news-description {
  font-weight: bold;
  margin-bottom: 10px;
}

.author-date-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  width: 100%;
}

.news-content-text {
  line-height: 1.6;
  margin-top: 30px;
  margin-bottom: 20px;
}

a {
  text-decoration: none;
  color: #007bff;
}

@media (max-width: 568px) {
  .author-date-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
  }
}
</style>
