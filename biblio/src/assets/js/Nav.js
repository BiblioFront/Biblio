/* Nav.js */
export default {
  name: "Nav",
  props: {
    notHomePage: {
      type: Number,
      default: 1,
    },
    inheritSearchResult: {},
  },
  data() {
    return {
      //searchParams:
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
      searchInput: this.$route.query.wd,
      searchResult: this.inheritSearchResult,

      //userParams:
      infoform: {
        username: "",
        password: "",
        email: "",
        nickname: "",
        avator: "",
        auth: "",
        admin: false,
        token: "",
        id: "",
        verification_code: "",
      },

      //messageParams:
      messageData: [
        {
          from: "user10086",
          time: "2020.12.19 16:05",
          content: "hi!",
        },
        {
          from: "user10087",
          time: "2020.12.19 16:07",
          content:
            "hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!",
        },
        {
          from: "user10086",
          time: "2020.12.19 16:05",
          content: "hi!",
        },
        {
          from: "user10086",
          time: "2020.12.19 16:05",
          content: "hi!",
        },
        {
          from: "user10086",
          time: "2020.12.19 16:05",
          content: "hi!",
        },
        {
          from: "user10086",
          time: "2020.12.19 16:05",
          content: "hi!",
        },
        {
          from: "user10086",
          time: "2020.12.19 16:05",
          content: "hi!",
        },
        {
          from: "user10086",
          time: "2020.12.19 16:05",
          content: "hi!",
        },
      ],
      lg: 1,
      drawer: false,
      formsee: false,
      form: {
        name: "nihao",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "100px",
      labelPosition: "right",
    };
  },
  mounted() {
    this.$axios({
      method: "get",
      url: "/user",
      params: {},
      headers: {
        token: window.localStorage.getItem("token"),
      },
    })
      .then((response) => {
        console.log(response);
        this.infoform = response.data.information;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    handleCommand(command) {
      if (command == "info") this.$router.push({ path: "/info" });
      else if (command == "gate") this.$router.push({ path: "/gate" });
      else if (command == "lgout") {
        window.localStorage.clear();
        this.$router.push({ path: "/login" });
      }
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    deleteAll() {
      this.messageData.splice();
    },
    route2Home() {
      this.$router.push({ path: "/" });
    },
    route2Login() {
      this.$router.push({ path: "/login" });
    },
    route2Register() {
      this.$router.push({ path: "/register" });
    },
    route2Gate() {
      this.$router.push({ path: "/gate" });
    },
    setdrawer() {
      this.drawer = true;
      console.log(this.drawer);
    },
    showForm() {
      this.formsee = true;
    },
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
          customClass: "inputMessage--navcmp",
          duration: 1000,
          offset: 80,
          message: "请先输入搜索内容",
        });
        console.log("Searching error: No Input!");
      } else {
        console.log("Searching '" + this.value + "'...");
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
      //console.log(searchForm);
      const _this = this;
      this.$axios.get("/search/paper", searchForm).then((res) => {
        //console.log(res.data);
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
      this.$axios.get("/search/patent", searchForm).then((res) => {
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
      this.$axios.get("/search/project", searchForm).then((res) => {
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
      console.log(searchForm);
      const _this = this;
      this.$axios.get("/search/researcher", searchForm).then((res) => {
        console.log(res.data);
        _this.searchResult.total = res.data.total;
        _this.searchResult.scholarData = res.data;
        _this.$store.commit("SET_SEARCHRESULT", _this.searchResult);
      });
    },
    allSearch() {
      var searchForm = {
        field: "title",
        words: this.searchInput,
        page: 1,
        category: "",
      };
      //console.log(searchForm);
      const _this = this;
      var total = 0;
      this.$axios.get("/search/paper", searchForm).then((res) => {
        //console.log(res);
        total = res.data.total;
        _this.searchResult.paperData = res.data;
        _this.$axios.get("/search/project", searchForm).then((res) => {
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
