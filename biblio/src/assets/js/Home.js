/* Home.js */
import Nav from "@/components/Nav.vue";

export default {
  name: "Home",
  data() {
    return {
      searchOptions: [
        {
          value: "all",
          label: "全站",
        },
        {
          value: "paper",
          label: "论文",
          children: [
            {
              value: "paper_title",
              label: "标题",
            },
            {
              value: "paper_author",
              label: "作者",
            },
            {
              value: "paper_doi",
              label: "DOI",
            },
            {
              value: "paper_keywords",
              label: "关键词",
            },
          ],
        },
        {
          value: "patent",
          label: "专利",
          children: [
            {
              value: "patent_title",
              label: "标题",
            },
            {
              value: "patent_owner",
              label: "持有人",
            },
          ],
        },
        {
          value: "project",
          label: "科研项目",
          children: [
            {
              value: "project_title",
              label: "标题",
            },
            {
              value: "project_author",
              label: "参与者",
            },
            {
              value: "project_keywords",
              label: "关键词",
            },
          ],
        },
        {
          value: "scholar",
          label: "学者",
        },
      ],
      value: ["all"],
      searchInput: "",
      searchResult: {
        total: 0,
        paperData: {},
        patentData: {},
        projectData: {},
        scholarData: {},
      },
    };
  },
  components: {
    Nav,
  },
  methods: {
    valueExtrat() {
      switch (this.value[1]) {
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
    route2Search() {
      if (this.searchInput == "") {
        this.$message({
          customClass: "inputMessage",
          duration: 1000,
          offset: 400,
          message: "请先输入搜索内容",
        });
        console.log("Searching error: No Input!");
      } else {
        console.log("Searching '" + this.value[0] + "'...");
        if (this.value[0] == "paper") {
          this.paperSearch();
        } else if (this.value[0] == "patent") {
          this.patentSearch();
        } else if (this.value[0] == "project") {
          this.projectSearch();
        } else if (this.value[0] == "scholar") {
          this.scholarSearch();
        } else if (this.value[0] == "all") {
          this.allSearch();
        }
        console.log("Search Successful!");
        this.$router.push({
          path: "/search",
          query: { wd: this.searchInput },
        });
      }
    },
    paperSearch() {
      var searchForm = {
        field: this.valueExtrat(),
        words: this.searchInput,
        page: 1,
        category: "",
      };
      console.log(searchForm);
      const _this = this;
      this.$axios.post("/search/paper", searchForm).then((res) => {
        console.log(res.data);
        _this.searchResult.total = res.data.total;
        _this.searchResult.paperData = res.data;
        _this.$store.commit("SET_SEARCHRESULT", _this.searchResult);
      });
    },
    patentSearch() {
      var searchForm = {
        field: this.valueExtrat(),
        words: this.searchInput,
        page: 1,
      };
      //console.log(searchForm);
      const _this = this;
      this.$axios.post("/search/patent", searchForm).then((res) => {
        //console.log(res.data);
        _this.searchResult.total = res.data.total;
        _this.searchResult.patentData = res.data;
        _this.$store.commit("SET_SEARCHRESULT", _this.searchResult);
      });
    },
    projectSearch() {
      var searchForm = {
        field: this.valueExtrat(),
        words: this.searchInput,
        page: 1,
        category: "",
      };
      //console.log(searchForm);
      const _this = this;
      this.$axios.post("/search/project", searchForm).then((res) => {
        //console.log(res.data);
        _this.searchResult.total = res.data.total;
        _this.searchResult.projectData = res.data;
        _this.$store.commit("SET_SEARCHRESULT", _this.searchResult);
      });
    },
    scholarSearch() {
      var searchForm = {
        field: "name",
        words: this.searchInput,
        page: 1,
      };
      //console.log(searchForm);
      const _this = this;
      this.$axios.post("/search/researcher", searchForm).then((res) => {
        //console.log(res.data);
        _this.searchResult.total = res.data.total;
        _this.searchResult.scholarData = res.data;
        _this.$store.commit("SET_SEARCHRESULT", _this.searchResult);
      });
    },
    allSearch() {
      const _this = this;
      var total = 0;
      this.$axios
        .post("/search/paper", {
          field: "title",
          words: this.searchInput,
          page: 1,
          category: "",
        })
        .then((res) => {
          //console.log(res);
          total = res.data.total;
          _this.searchResult.paperData = res.data;
          _this.$axios
            .post("/search/project", {
              field: "title",
              words: this.searchInput,
              page: 1,
              category: "",
            })
            .then((res) => {
              //console.log(res);
              total += res.data.total;
              _this.searchResult.total = total;
              _this.searchResult.projectData = res.data;
              _this.$store.commit("SET_SEARCHRESULT", _this.searchResult);
            });
        });
      // this.$axios.post("/search/patent", searchForm).then((res) => {
      //   //console.log(res.data);
      //   total += res.data.total;
      //   var item = res.data;
      // });
    },
  },
};
