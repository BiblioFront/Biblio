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
        total: 0,
        isAll: false,
        hasPaper: true,
        hasPatent: true,
        hasProject: true,
        hasScholar: true,
        paperData: {},
        patentData: {},
        projectData: {},
        scholarData: {},
      },
      filters: [""],
      category: [""],
    };
  },
  mounted() {
    this.$nextTick(() => {
      var searchResult = this.$store.getters.getSearchResult;

      this.resList.total = searchResult.total;
      this.resList.isAll = searchResult.isAll;
      this.resList.paperData = searchResult.paperData;
      this.resList.patentData = searchResult.patentData;
      this.resList.projectData = searchResult.projectData;
      this.resList.scholarData = searchResult.scholarData;

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
        } else if (this.resList.hasProject) {
          this.achievementActiveType = "project";
          this.pagesTotal = searchResult.projectData.pages;
          this.filters = searchResult.projectData.classify;
        } else if (this.resList.hasScholar) {
          this.achievementActiveType = "scholar";
          this.pagesTotal = searchResult.scholarData.pages;
          this.notScholar = false;
        }
      } else {
        this.pagesTotal = searchResult.paperData.pages;
        this.filters = searchResult.paperData.classify;
      }

      if (
        JSON.stringify(searchResult.scholarData) != "{}" &&
        searchResult.scholarData.total <= 5 &&
        searchResult.isAll
      )
        this.extraFound = true;
    });
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
    handleChange(val) {
      console.log(val);
    },
    handleClick(tab) {
      if (tab.name == "paper") {
        this.notScholar = true;
        this.pagesTotal = this.resList.paperData.pages;
        this.filters = this.resList.paperData.classify;
      }
      if (tab.name == "patent") {
        this.notScholar = true;
        this.pagesTotal = this.resList.patentData.pages;
        this.filters = this.resList.patentData.classify;
      }
      if (tab.name == "project") {
        this.notScholar = true;
        this.pagesTotal = this.resList.projectData.pages;
        this.filters = this.resList.projectData.classify;
      }
      if (tab.name == "scholar") {
        this.notScholar = false;
        this.pagesTotal = this.resList.scholarData.pages;
      }
    },
    pageTurnTo(page) {
      const searchField = this.$route.query.fd;
      const searchInput = this.$route.query.wd;
      this.$search.$boot(searchField, searchInput, page, this.category);
    },
    route2Gate(id) {
      this.$router.push({
        path: "/gate",
        query: { id: id },
      });
    },
    route2Page(id) {
      console.log(id);
      this.$router.push({
        path: "/paper",
        query: { id: id },
      });
    },
  },
};
