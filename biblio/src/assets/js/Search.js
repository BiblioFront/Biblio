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
      resList: {
        total: 0,
        hasPaper: true,
        hasPatent: true,
        hasProject: true,
        paperData: {},
        patentData: {},
        projectData: {},
        scholarData: {},
      },
      filters: ["物理学", "天文学", "物理", "天文", "物", "天"],
      category: [""],
    };
  },
  mounted() {
    var searchResult = this.$store.getters.getSearchResult;

    this.resList.total = searchResult.total;
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

    if (!this.resList.hasPaper) {
      if (JSON.stringify(searchResult.patentData) != "{}")
        this.achievementActiveType = "patent";
      else if (JSON.stringify(searchResult.projectData) != "{}")
        this.achievementActiveType = "project";
    }
    console.log("reslist:" + this.resList);

    if (JSON.stringify(searchResult.scholarData) != "{}")
      this.extraFound = true;
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
