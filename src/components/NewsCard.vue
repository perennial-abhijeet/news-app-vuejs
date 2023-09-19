<template>
  <div class="news-card">
    <img
      class="news-image"
      :src="article.urlToImage || defaultImage"
      alt="News Image"
    />
    <div class="news-content">
      <h2 class="news-title">{{ article.title }}</h2>
      <p class="news-description">{{ article.description }}</p>
      <p class="news-author">Author: {{ article.author }}</p>
      <p class="news-date">
        Published on: {{ formatDate(article.publishedAt) }}
      </p>
      <a class="news-link" :href="article.url" target="_blank">Read more</a>
    </div>
  </div>
</template>

<script>
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
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    },
  },
};
</script>

<style scoped>
.news-card {
  width: calc(21% - 10px);
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.news-image {
  max-width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 16px;
}

.news-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.news-description {
  margin: 8px 0;
}

.news-author,
.news-date {
  color: #777;
  font-size: 0.9rem;
}

.news-link {
  margin-top: 16px;
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}
</style>
