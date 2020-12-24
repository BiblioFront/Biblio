/* Search.js */
import Nav from "@/components/Nav.vue";

export default {
  name: "Search",
  components: {
    Nav,
  },
  data() {
    return {
      extraFound: false,
      achievementActiveType: "paper",
      isEnoughResult: true,
      notScholar: true,
      pagesTotal: 0,
      resList: {
        total: this.$store.getters.getSearchResult.total,
        isAll: this.$store.getters.getSearchResult.isAll,
        hasPaper: true,
        hasPatent: true,
        hasProject: true,
        hasScholar: true,
        paperData: this.$store.getters.getSearchResult.paperData,
        patentData: this.$store.getters.getSearchResult.patentData,
        projectData: this.$store.getters.getSearchResult.projectData,
        scholarData: this.$store.getters.getSearchResult.scholarData,
      },
      filters: [{}],
      category: "",
      currentPage: Number(this.$route.query.pg),
    };
  },
  mounted: function() {
    this.initResult();
  },
  methods: {
    initResult() {
      var searchResult = this.$store.getters.getSearchResult;

      // this.resList.total = searchResult.total;
      // this.resList.isAll = searchResult.isAll;
      // this.resList.paperData = searchResult.paperData;
      // this.resList.patentData = searchResult.patentData;
      // this.resList.projectData = searchResult.projectData;
      // this.resList.scholarData = searchResult.scholarData;

      if (this.resList.total <= 10) this.isEnoughResult = false;

      if (JSON.stringify(searchResult.paperData) == "{}")
        this.resList.hasPaper = false;
      if (JSON.stringify(searchResult.patentData) == "{}")
        this.resList.hasPatent = false;
      if (JSON.stringify(searchResult.projectData) == "{}")
        this.resList.hasProject = false;
      if (JSON.stringify(searchResult.scholarData) == "{}")
        this.resList.hasScholar = false;

      if (!this.resList.hasPaper) {
        if (this.resList.hasPatent) {
          this.achievementActiveType = "patent";
          this.pagesTotal = searchResult.patentData.pages;
          this.filters = searchResult.patentData.classify;
          this.category = this.$route.query.ct;
        } else if (this.resList.hasProject) {
          this.achievementActiveType = "project";
          this.pagesTotal = searchResult.projectData.pages;
          this.filters = searchResult.projectData.classify;
          this.category = this.$route.query.ct;
        } else if (this.resList.hasScholar) {
          this.achievementActiveType = "scholar";
          this.pagesTotal = searchResult.scholarData.pages;
          this.notScholar = false;
        }
      } else {
        this.pagesTotal = searchResult.paperData.pages;
        this.filters = searchResult.paperData.classify;
        this.category = this.$route.query.ct;
      }

      if (
        JSON.stringify(searchResult.scholarData) != "{}" &&
        searchResult.scholarData.total <= 5 &&
        searchResult.isAll
      )
        this.extraFound = true;
    },
    categoryChange(label) {
      var searchResult = this.$store.getters.getSearchResult;
      var field = this.$route.query.fd;
      var type = this.$route.query.at;

      if (field == "all") {
        field = "title";
      } else {
        field = this.$search.$extract(field.split(","));
      }

      //取消选择
      if (label == this.category) {
        this.category = "";
        this.$search.$boot(
          this.$route.query.fd.split(","),
          this.$route.query.wd,
          this.$route.query.pg,
          ""
        );
      }
      //选择
      else {
        this.category = label;

        var searchForm = {};
        if (this.$route.query.at == "patent")
          searchForm = {
            field: field,
            words: this.$route.query.wd,
            page: this.$route.query.pg,
          };
        else
          searchForm = {
            field: field,
            words: this.$route.query.wd,
            page: this.$route.query.pg,
            category: this.category,
          };
        console.log(searchForm);
        const _this = this;
        this.$axios
          .post("/search/" + type, searchForm)
          .then((res) => {
            switch (type) {
              case "paper":
                searchResult.paperData = res.data;
                _this.resList.paperData = res.data;
                break;
              case "patent":
                searchResult.patentData = res.data;
                _this.resList.patentData = res.data;
                break;
              case "project":
                searchResult.projectData = res.data;
                _this.resList.projectData = res.data;
            }
            console.log(searchResult);
            _this.$store.commit("SET_SEARCHRESULT", searchResult);
          })
          .catch((error) => {
            console.log(error);

            _this.$message.error("系统错误！");
          });
      }

      this.$router.push({
        path: "/search",
        query: {
          fd: this.$route.query.fd,
          wd: this.$route.query.wd,
          ct: this.category,
          pg: this.$route.query.pg,
        },
      });

      //this.$router.go(0);
    },
    handleClick(tab) {
      if (tab.name == "paper") {
        this.notScholar = true;
        this.pagesTotal = this.resList.paperData.pages;
        this.filters = this.resList.paperData.classify;

        this.pageTurnTo("paper", 1);
      }
      if (tab.name == "patent") {
        this.notScholar = true;
        this.pagesTotal = this.resList.patentData.pages;
        this.filters = this.resList.patentData.classify;

        this.pageTurnTo("patent", 1);
      }
      if (tab.name == "project") {
        this.notScholar = true;
        this.pagesTotal = this.resList.projectData.pages;
        this.filters = this.resList.projectData.classify;

        this.pageTurnTo("project", 1);
      }
      if (tab.name == "scholar") {
        this.notScholar = false;
        this.pagesTotal = this.resList.scholarData.pages;

        this.pageTurnTo("scholar", 1);
      }
    },
    pageTurn(page) {
      this.pageTurnTo(this.$route.query.at, page);
    },
    pageTurnTo(type, page) {
      var searchResult = this.$store.getters.getSearchResult;
      var field = this.$route.query.fd;

      if (field == "all") {
        field = "title";
      } else {
        field = this.$search.$extract(field.split(","));
      }

      var searchForm = {};
      if (type == "patent")
        searchForm = {
          field: field,
          words: this.$route.query.wd,
          page: page,
        };
      else if (type == "scholar")
        searchForm = {
          field: "name",
          words: this.$route.query.wd,
          page: page,
        };
      else
        searchForm = {
          field: field,
          words: this.$route.query.wd,
          page: page,
          category: this.category,
        };

      if (type == "scholar") type = "researcher";
      //console.log(searchForm);
      const _this = this;
      this.$axios.post("/search/" + type, searchForm).then((res) => {
        switch (type) {
          case "paper":
            searchResult.paperData = res.data;
            _this.resList.paperData = res.data;
            break;
          case "patent":
            searchResult.patentData = res.data;
            _this.resList.patentData = res.data;
            break;
          case "project":
            searchResult.projectData = res.data;
            _this.resList.projectData = res.data;
            break;
          case "scholar":
            searchResult.scholarData = res.data;
            _this.resList.scholarData = res.data;
        }
        //console.log(searchResult);
        _this.$store.commit("SET_SEARCHRESULT", searchResult);
      });

      this.$router.push({
        path: "/search",
        query: {
          fd: this.$route.query.fd,
          at: this.achievementActiveType,
          wd: this.$route.query.wd,
          ct: this.category,
          pg: page,
        },
      });
    },
    route2Gate(id) {
      this.$router.push({
        path: "/gate",
        query: { id: id },
      });
    },
    route2Paper(id) {
      this.$router.push({
        path: "/paper",
        query: { id: id },
      });
    },
    route2Patent(id) {
      this.$router.push({
        path: "/patent",
        query: { id: id },
      });
    },
    route2Project(id) {
      this.$router.push({
        path: "/project",
        query: { id: id },
      });
    },
    likeActivate() {},
    relativeActivate() {},
    shareActivate() {},
  },
};
