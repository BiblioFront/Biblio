/* Home.js */
import Nav from "@/components/Nav.vue";

export default {
  name: "Home",
  components: {
    Nav,
  },
  data() {
    var validateTime = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("年份不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("年份必须为数字"));
        } else {
          if (value < 1900 || value > 2020) {
            callback(new Error("请输入正确的年份"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
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
            upper: "",
            lower: "",
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
      advancedSearchInputRules: {
        time: [
          {
            validator: validateTime,
            trigger: "blur",
          },
        ],
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
        upper: "This is upper slogen",
        lower: "THIS IS LOWER SLOGEN",
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
      this.advancedSearchBox = false;
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
