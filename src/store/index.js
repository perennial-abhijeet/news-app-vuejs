import { createStore } from "vuex";
import CryptoJS from "crypto-js";
import { apiGet } from "../axios";
import { API_KEY_ID } from "../shared/constants";

function createUniqueId(item) {
  const author = item.author || "Unknown";
  const title = item.title;

  // Combine author and title
  const combinedString = `${author}-${title}`;

  // Create a hash of the combined string
  const hash = CryptoJS.SHA256(combinedString).toString(CryptoJS.enc.Hex);

  return hash;
}

const state = {
  news: [],
  pageSize: 21,
  currentPage: 0,
  selectedCountry: "",
  selectedArticle: null,
};

const getters = {
  getNews: (state) => state.news,
  getSelectedCountry: (state) => state.selectedCountry,
  getSelectedArticle: (state) => state.selectedArticle,
};

const mutations = {
  SET_NEWS: (state, newsData) => {
    state.news = newsData;
  },
  INCREMENT_PAGE(state) {
    state.currentPage++;
  },
  RESET_PAGE(state) {
    state.currentPage = 0;
  },
  SET_SELECTED_COUNTRY: (state, countryCode) => {
    state.selectedCountry = countryCode;
  },
  SET_SELECTED_ARTICLE(state, article) {
    state.selectedArticle = article;
    localStorage.setItem("selectedArticle", JSON.stringify(article));
  },
};

const actions = {
  fetchNews: async ({ commit, state }) => {
    try {
      commit("INCREMENT_PAGE");
      const response = await apiGet(
        `/top-headlines?${
          state.selectedCountry === ""
            ? "q=all"
            : "country=" + state.selectedCountry
        }&pageSize=${state.pageSize * state.currentPage}&apiKey=${API_KEY_ID}`
      );
      const dataWithId = response.data.articles.map((item) => {
        let id = createUniqueId(item);
        return { id: id, ...item };
      });
      commit("SET_NEWS", dataWithId);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  },
  resetPage: async ({ commit }) => {
    try {
      commit("RESET_PAGE");
    } catch (error) {
      console.error("Error resetting the page:", error);
    }
  },
  selectArticle({ commit }, article) {
    commit("SET_SELECTED_ARTICLE", article);
  },
  loadSelectedArticle({ commit }) {
    const selectedArticle = JSON.parse(localStorage.getItem("selectedArticle"));
    if (selectedArticle) {
      commit("SET_SELECTED_ARTICLE", selectedArticle);
    }
  },
};

const store = createStore({
  state,
  getters,
  mutations,
  actions,
});

export default store;
