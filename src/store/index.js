import { createStore } from "vuex";
import { apiGet } from "../axios";
import { API_KEY_ID } from "../shared/constants";

const state = {
  news: [],
};

const getters = {
  getNews: (state) => state.news,
};

const mutations = {
  SET_NEWS: (state, newsData) => {
    state.news = newsData.articles;
  },
};

const actions = {
  fetchNews: async ({ commit, state }) => {
    try {
      const response = await apiGet(`/everything?q=all&apiKey=${API_KEY_ID}`);
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
