import { createStore } from "vuex";
import { apiGet } from "../axios";
import { API_KEY_ID } from "../shared/constants";

const state = {
  news: [],
  pageSize: 21,
  currentPage: 0,
};

const getters = {
  getNews: (state) => state.news,
};

const mutations = {
  SET_NEWS: (state, newsData) => {
    state.news = newsData.articles;
  },
  INCREMENT_PAGE(state) {
    state.currentPage++;
  },
};

const actions = {
  fetchNews: async ({ commit, state }) => {
    try {
      commit("INCREMENT_PAGE");
      const response = await apiGet(
        `/everything?q=all&pageSize=${
          state.pageSize * state.currentPage
        }&apiKey=${API_KEY_ID}`
      );
      commit("SET_NEWS", response.data);
    } catch (error) {
      console.error("Error fetching news:", error);
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
