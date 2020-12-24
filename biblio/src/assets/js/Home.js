/* Home.js */
import Nav from "@/components/Nav.vue";

export default {
  name: "Home",
  components: {
    Nav,
  },
  data() {
    return {
      //SearchParams:
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

      //advancedSearchParams:
      advancedSearchSelectValue: "paper",
      advancedSearchBox: false,
      advancedSearchInput: {
        paper: {
          title: "",
          author: "",
          journal: "",
          date: {
            upper: 2020,
            lower: 1900,
          },
          keywords: "",
        },
        patent: {
          title: "",
          designer: "",
          owner: "",
          applyDate: {
            upper: 2020,
            lower: 1900,
          },
          publicDate: {
            upper: 2020,
            lower: 1900,
          },
        },
        project: {
          title: "",
          author: "",
          company: "",
          keywords: "",
          year: {
            upper: 2020,
            lower: 1900,
          },
        },
      },

      //searchResult:
      searchResult: {
        total: 0,
        isAll: false,
        paperData: {},
        patentData: {},
        projectData: {},
        scholarData: {},
      },

      //hotspot:
      hotspot: {},

      //slogen:
      slogen: {
        upper: "Accelerating research discovery to shape a better future",
        lower: "Today's research, tomorrow's innovation",
      },
    };
  },
  mounted() {
    this.initHomepage();
  },
  methods: {
    initHomepage() {
      //init Hotsspot
      console.log("Pulling Request...  [Hotspot]");

      const _this = this;
      this.$axios
        .get("analysis/index")
        .then((res) => {
          //success
          if (res.data.msg == "success") {
            console.log("Pulling Hotspot SUCCESS! ");

            _this.hotspot = res.data;
          }
          //failed
          else if (res.data.msg == "failed") {
            console.log("Pulling Hotspot Failed! [Error: other error]");

            _this.hotspot = {};
            _this.$message.error("发生了一些错误！");
          }
        })
        .catch((error) => {
          console.log(
            "Pulling Hotspot Failed! [Error: system error... " + error + "]"
          );

          _this.hotspot = {};
          _this.$message.error("发生了一些错误！");
        });
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
        this.$search.$boot(this.value, this.searchInput, 1, "");
      }
    },
    resetAS() {
      console.log("Home Action: Reset advanced search.");
      const paperDefault = {
        title: "",
        author: "",
        journal: "",
        date: {
          upper: 2020,
          lower: 1900,
        },
        keywords: "",
      };
      const patentDefault = {
        title: "",
        designer: "",
        owner: "",
        applyDate: {
          upper: 2020,
          lower: 1900,
        },
        publicDate: {
          upper: 2020,
          lower: 1900,
        },
      };
      const projectDefault = {
        title: "",
        author: "",
        company: "",
        keywords: "",
        year: {
          upper: 2020,
          lower: 1900,
        },
      };
      const _this = this;

      var isModified = true;
      switch (this.advancedSearchSelectValue) {
        case "paper":
          if (
            JSON.stringify(_this.advancedSearchInput.paper) ==
            JSON.stringify(paperDefault)
          )
            isModified = false;
          break;
        case "patent":
          if (
            JSON.stringify(_this.advancedSearchInput.patent) ==
            JSON.stringify(patentDefault)
          )
            isModified = false;
          break;
        case "project":
          if (
            JSON.stringify(_this.advancedSearchInput.project) ==
            JSON.stringify(projectDefault)
          )
            isModified = false;
      }

      console.log(
        "Current advancedSearchInput.paper:" +
          JSON.stringify(_this.advancedSearchInput.paper)
      );
      console.log(
        "Current advancedSearchInput.patent:" +
          JSON.stringify(_this.advancedSearchInput.patent)
      );
      console.log(
        "Current advancedSearchInput.project:" +
          JSON.stringify(_this.advancedSearchInput.project)
      );
      if (isModified) {
        this.$confirm("", "您确定要重置填写的信息吗？", {
          center: true,
          confirmButtonText: "确认重置",
          cancelButtonText: "取 消",
          callback: (action) => {
            if (action == "confirm") {
              switch (this.advancedSearchSelectValue) {
                case "paper":
                  _this.advancedSearchInput.paper = paperDefault;
                  break;
                case "patent":
                  _this.advancedSearchInput.patent = patentDefault;
                  break;
                case "project":
                  _this.advancedSearchInput.project = projectDefault;
              }
            }
            console.log("Home Action: Reset advanced search SUCCESS!");
            this.$message({
              type: "info",
              message: "信息已重置",
            });
          },
        });
      } else {
        console.log(
          "[isModified:" +
            isModified +
            "] AS warning: No modifications were detected!"
        );
      }
    },
    bootAS() {
      const _this = this;
      var adsForm = {};

      switch (this.advancedSearchSelectValue) {
        case "paper":
          adsForm = {
            title: _this.advancedSearchInput.paper.title,
            author: _this.advancedSearchInput.paper.author,
            journal: _this.advancedSearchInput.paper.journal,
            keyword: _this.advancedSearchInput.paper.keywords,
            year_l: _this.advancedSearchInput.paper.date.lower,
            year_h: _this.advancedSearchInput.paper.date.upper,
            page: 1,
            category: "",
          };
          _this.$axios.post("/search/adSearchPaper", adsForm).then((res) => {
            _this.searchResult.total = res.data.total;
            _this.searchResult.isAll = false;
            _this.searchResult.paperData = res.data;

            _this.$store.commit("SET_SEARCHRESULT", _this.searchResult);
          });
          break;
        case "patent":
          adsForm = {
            title: _this.advancedSearchInput.patent.title,
            designer: _this.advancedSearchInput.patent.designer,
            owner: _this.advancedSearchInput.patent.owner,
            applyYear_l: _this.advancedSearchInput.patent.applyDate.lower,
            applyYear_h: _this.advancedSearchInput.patent.applyDate.upper,
            publicYear_l: _this.advancedSearchInput.patent.publicYear.lower,
            publicYear_h: _this.advancedSearchInput.patent.publicYear.upper,
            page: 1,
            category: "",
          };
          _this.$axios.post("//search/adSearchPatent", adsForm).then((res) => {
            _this.searchResult.total = res.data.total;
            _this.searchResult.isAll = false;
            _this.searchResult.patentData = res.data;

            _this.$store.commit("SET_SEARCHRESULT", _this.searchResult);
          });
          break;
        case "project":
          adsForm = {
            title: _this.advancedSearchInput.project.title,
            author: _this.advancedSearchInput.project.author,
            company: _this.advancedSearchInput.project.company,
            keyword: _this.advancedSearchInput.project.keywords,
            year_l: _this.advancedSearchInput.project.date.upper,
            year_h: _this.advancedSearchInput.project.date.lower,
            page: 1,
            category: "",
          };
          _this.$axios.post("/search/adSearchProject", adsForm).then((res) => {
            _this.searchResult.total = res.data.total;
            _this.searchResult.isAll = false;
            _this.searchResult.projectData = res.data;

            _this.$store.commit("SET_SEARCHRESULT", _this.searchResult);
          });
      }
      this.advancedSearchBox = false;

      var fd = ["ads", this.advancedSearchSelectValue];

      this.$router.push({
        path: "/search",
        query: {
          fd: fd.join(","),
          at: "",
          wd: JSON.stringify(adsForm),
          ct: "",
          pg: 1,
        },
      });
    },
    route2Paper(id) {
      this.$router.push({
        path: "/paper",
        query: {
          id: id,
        },
      });
    },
  },
};
