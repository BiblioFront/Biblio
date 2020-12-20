/* Home.js */
import Nav from "@/components/Nav.vue";

export default {
  name: "Home",
  data() {
    return {
      isHome: 1,
      searchOptions: [
        {
          option: "1",
          label: "全站",
        },
        {
          option: "2",
          label: "论文",
        },
        {
          option: "3",
          label: "专利",
        },
        {
          option: "4",
          label: "科研项目",
        },
        {
          option: "4",
          label: "学者",
        },
      ],
      option: "1",
      searchInput: "",
    };
  },
  components: {
    Nav,
  },
  methods: {
    route2Search() {
      this.$router.push({ path: "/search" });
    },
  },
};
