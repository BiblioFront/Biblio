/* Nav.js */
export default {
  name: "Nav",
  props: {
    pageState: Number,
  },
  data() {
    return {
      messageData: [
        {
          content: "hi!",
          from: "user10086",
        },
      ],
      lg: 1,
      drawer: false,
      formsee: false,
      form: {
        name: "nihao",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "100px",
      labelPosition: "right",
    };
  },
  methods: {
    handleCommand(command) {
      if (command == "info") this.$router.push({ path: "/info" });
      else if (command == "gate") this.$router.push({ path: "/gate" });
      else if (command == "lgout");
    },
    route2Home() {
      this.$router.push({ path: "/" });
    },
    route2Login() {
      this.$router.push({ path: "/login" });
    },
    route2Register() {
      this.$router.push({ path: "/register" });
    },
    route2Gate() {
      this.$router.push({ path: "/gate" });
    },
    setdrawer() {
      this.drawer = true;
      console.log(this.drawer);
    },
    showForm() {
      this.formsee = true;
    },
  },
};
