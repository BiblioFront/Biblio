/* Home.js */
import Nav from "@/components/Nav.vue";

export default {
  name: "Home",
  components: {
    Nav,
  },
  methods: {
    route2Search() {
      this.$router.push({ path: "/search" });
    },
  },
};
