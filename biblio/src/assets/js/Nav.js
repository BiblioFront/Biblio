/* Nav.js */
export default {
  name: "Nav",
  methods: {
    route2Home() {
      this.$router.push({ path: "/" });
    },
    route2Gate() {
      this.$router.push({ path: "/gate" });
    },
  },
};
