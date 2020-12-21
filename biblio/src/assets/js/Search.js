/* Search.js */
import Nav from "@/components/Nav.vue";

export default {
  name: "Search",
  components: {
    Nav,
  },
  data() {
    return {
      extraFound: true,
      achievementActiveType: "first",
      isEnoughResult: true,
      biblioItem: [],
    };
  },
  created() {
    this.$bus.$on("getData", (item) => {
      this.biblioItem = item;
      console.log(this.biblioItem);
    });
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
