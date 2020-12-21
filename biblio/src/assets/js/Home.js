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
    };
  },
  components: {
    Nav,
  },
  methods: {
    route2Search() {
      if (this.searchInput == "") {
        this.$message({
          customClass: "inputMessage",
          duration: 1000,
          offset: 400,
          message: "请先输入搜索内容",
        });
      } else {
        if (this.value[0] == "paper") {
          this.paperSearch();
        } else if (this.value[0] == "patent") {
          this.patentSearch();
        } else if (this.value[0] == "project") {
          this.projectSearch();
        } else if (this.value[0] == "all") {
          this.paperSearch();
        }
        this.$router.push({ path: "/search" });
      }
    },
    paperSearch() {
      var field;
      switch (this.value[1]) {
        case "paper_title":
          field = "title";
          break;
        case "paper_author":
          field = "author";
          break;
        case "paper_doi":
          field = "doi";
          break;
        case "paper_keywords":
          field = "keywords";
      }
      var searchForm = {
        field: field,
        words: this.searchInput,
        page: 1,
        category: "",
      };
      //console.log(searchForm);
      this.$axios.post("/search/paper", searchForm).then((res) => {
        //console.log(res.data);
        var item = res.data;
        this.$bus.$emit("getData", item);
      });
    },
    patentSearch() {
      var searchForm = {
        field: this.value[2],
        words: this.searchInput,
        page: 1,
      };
      this.$axios
        .post("http://localhost:8989/search/patent", searchForm)
        .then((res) => {
          console.log(res);
        });
    },
    projectSearch() {
      var searchForm = {
        field: this.value[2],
        words: this.searchInput,
        page: 1,
      };
      this.$axios
        .post("http://localhost:8989/search/project", searchForm)
        .then((res) => {
          console.log(res);
        });
    },
    handleChange(value) {
      console.log(value);
    },
  },
};
