import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    searchResult: JSON.parse(sessionStorage.getItem("searchResult")),
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      localStorage.setItem("token", token);
    },
    SET_SEARCHRESULT: (state, searchResult) => {
      state.searchResult = searchResult;
      sessionStorage.setItem("searchResult", JSON.stringify(searchResult));
    },
    RESET_SEARCHRESULT: (state) => {
      state.searchResult = {};
      sessionStorage.setItem(
        "searchResult",
        JSON.stringify(state.searchResult)
      );
    },
  },
  getters: {
    getSearchResult: (state) => {
      return state.searchResult;
    },
  },
  actions: {},
  modules: {},
});
