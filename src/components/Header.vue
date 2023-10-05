<template>
  <header class="header-container">
    <div class="content-wrapper">
      <p class="header-title">News Search & Bookmark</p>
      <div class="nav-list">
        <RouterLink to="/" class="nav-link" exact-active-class="active-link"
          >Top News</RouterLink
        >
        <RouterLink
          to="/bookmarks"
          class="nav-link"
          exact-active-class="active-link"
          >Bookmarks</RouterLink
        >
      </div>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped>
.header-container {
  width: 100%;
  background-color: #343940;
  position: sticky;
  top: 0;
}
.content-wrapper {
  width: 85%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-title {
  color: #ffffff;
  font-size: 23px;
}
.nav-link {
  color: #999e9a;
  text-decoration: none;
  font-size: 18px;
  margin-left: 15px;
}
.nav-link:hover,
.active-link {
  color: #ffffff;
}

@media (max-width: 524px) {
  .header-title {
    color: #ffffff;
    font-size: 23px;
    width: 40%;
  }
  .nav-link {
    width: 100%;
    color: #999e9a;
    text-decoration: none;
    font-size: 18px;
  }
}

@media (max-width: 500px) {
  .nav-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .nav-link {
    margin: 7px;
  }
}
</style>
