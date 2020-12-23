/* Base.js */
import Vue from "vue";
import axios from "axios";
import router from "./router";
import store from "./store";

const search = new Vue();
axios.defaults.baseURL = "http://localhost:8989/";

Vue.prototype.$search = {
  searchResult: {
    total: 0,
    isAll: false,
    paperData: {},
    patentData: {},
    projectData: {},
    scholarData: {},
  },
  $extract(field) {
    switch (field[1]) {
      case "paper_title":
        return "title";
      case "paper_author":
        return "author";
      case "paper_doi":
        return "doi";
      case "paper_keywords":
        return "keywords";
      case "patent_title":
        return "title";
      case "patent_owner":
        return "owner";
      case "project_title":
        return "title";
      case "project_author":
        return "author";
      case "project_keywords":
        return "keywords";
    }
  },
  $post(method, field, input, page, category) {
    var searchForm = {
      field: this.$extract(field),
      words: input,
      page: page,
      category: category,
    };
    //console.log(method);
    const _this = this;
    axios.post("/search/" + method, searchForm).then((res) => {
      _this.searchResult.total = res.data.total;

      switch (method) {
        case "paper":
          _this.searchResult.paperData = res.data;
          break;
        case "patent":
          _this.searchResult.patentData = res.data;
          break;
        case "project":
          _this.searchResult.projectData = res.data;
      }
      console.log(_this.searchResult);
      store.commit("SET_SEARCHRESULT", _this.searchResult);
    });
  },
  $scholar(field, input, page) {
    var searchForm = {
      field: field,
      words: input,
      page: page,
    };
    const _this = this;
    axios.post("/search/researcher", searchForm).then((res) => {
      _this.searchResult.total = res.data.total;
      _this.searchResult.scholarData = res.data;
      store.commit("SET_SEARCHRESULT", _this.searchResult);
    });
  },
  $all(input) {
    const _this = this;
    var total = 0;
    axios
      .post("/search/paper", {
        field: "title",
        words: input,
        page: 1,
        category: "",
      })
      .then((res) => {
        if (res.data.msg != "The search got no item.") {
          total = res.data.total;
          _this.searchResult.paperData = res.data;
        }
        axios
          .post("/search/patent", {
            field: "title",
            words: input,
            page: 1,
          })
          .then((res) => {
            if (res.data.msg != "The search got no item.") {
              total += res.data.total;
              _this.searchResult.patentData = res.data;
            }
            axios
              .post("/search/project", {
                field: "title",
                words: input,
                page: 1,
                category: "",
              })
              .then((res) => {
                if (res.data.msg != "The search got no item.") {
                  total += res.data.total;
                  _this.searchResult.projectData = res.data;
                }
                axios
                  .post("/search/researcher", {
                    field: "name",
                    words: input,
                    page: 1,
                  })
                  .then((res) => {
                    if (res.data.msg != "The search got no item.") {
                      total += res.data.total;
                      _this.searchResult.scholarData = res.data;
                    }
                    _this.searchResult.total = total;
                    _this.searchResult.isAll = true;
                    store.commit("SET_SEARCHRESULT", _this.searchResult);
                  });
              });
          });
      });
  },
  $boot(field, input, page, category) {
    console.log("Search booting '" + field + "'...");
    if (field[0] == "paper") {
      this.$post("paper", field, input, page, category);
    } else if (field[0] == "patent") {
      this.$post("patent", field, input, page, category);
    } else if (field[0] == "project") {
      this.$post("project", field, input, page, category);
    } else if (field[0] == "scholar") {
      this.$scholar("scholar", field, input, page);
    } else if (field[0] == "all") {
      this.$all(input);
    }
    console.log(
      "Search routing '" +
        "/search?fd=" +
        field +
        "&wd=" +
        input +
        "&pg=" +
        page
    );
    router.push({
      path: "/search",
      query: {
        fd: field,
        wd: input,
        pg: page,
      },
    });
  },
};

export default search;
