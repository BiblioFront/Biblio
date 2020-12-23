import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    userInfo: JSON.parse(localStorage.getItem("userInfo")),
    searchResult: JSON.parse(sessionStorage.getItem("searchResult")),
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      localStorage.setItem("token", token);
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
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
    REMOVE_USERINFO: (state) => {
      state.token = "";
      state.userInfo = "";
      localStorage.setItem("token", "");
      localStorage.setItem("userInfo", JSON.stringify(""));
    },
  },
  getters: {
    isLogin: (state) => {
      return state.token == "" ? false : true;
    },
    getSearchResult: (state) => {
      return state.searchResult;
    },
    getUser: (state) => {
      return state.userInfo;
    },
  },
  actions: {},
  modules: {},
});
