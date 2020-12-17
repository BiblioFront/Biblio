/* Home.js */
import Nav from "@/components/Nav.vue";

export default {
  name: "Home",
  data() {
    return {
      isHome: 1,
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
