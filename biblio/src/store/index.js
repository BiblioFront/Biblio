import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    researchResult: {},
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      localStorage.setItem("token", token);
    },
    SET_RESEARCHRESULT: (state, researchResult) => {
      state.researchResult = researchResult;
      sessionStorage.setItem("researchResult", JSON.stringify(researchResult));
    },
  },
  actions: {},
  modules: {},
});
