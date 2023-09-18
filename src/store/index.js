import { createStore } from "vuex";
import { apiGet } from "../axios";
import { API_KEY_ID } from "../shared/constants";

const state = {
  news: [],
  pageSize: 21,
  currentPage: 0,
  selectedCountry: "",
};

const getters = {
  getNews: (state) => state.news,
  getSelectedCountry: (state) => state.selectedCountry,
};

const mutations = {
  SET_NEWS: (state, newsData) => {
    state.news = newsData.articles;
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
      commit("SET_NEWS", response.data);
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
};

const store = createStore({
  state,
  getters,
  mutations,
  actions,
});

export default store;
