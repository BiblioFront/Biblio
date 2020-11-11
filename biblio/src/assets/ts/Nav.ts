/* Nav.ts */
import { Options, Vue } from "vue-class-component";

@Options({
  methods: {
    route2Gate() {
      this.$router.push({ path: "/gate" });
    },
  },
})
export default class Nav extends Vue {}
