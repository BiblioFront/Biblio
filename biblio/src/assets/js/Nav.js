/* Nav.js */
export default {
  name: "Nav",
  props: {
    pageState: Number,
  },
  data() {
    return {
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
          label: "学者",
        },
      ],
      option: "1",
      searchInput: "",
      messageData: [
        {
          from: "user10086",
          time: "2020.12.19 16:05",
          content: "hi!",
        },
        {
          from: "user10087",
          time: "2020.12.19 16:07",
          content:
            "hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!hi!",
        },
        {
          from: "user10086",
          time: "2020.12.19 16:05",
          content: "hi!",
        },
        {
          from: "user10086",
          time: "2020.12.19 16:05",
          content: "hi!",
        },
        {
          from: "user10086",
          time: "2020.12.19 16:05",
          content: "hi!",
        },
        {
          from: "user10086",
          time: "2020.12.19 16:05",
          content: "hi!",
        },
        {
          from: "user10086",
          time: "2020.12.19 16:05",
          content: "hi!",
        },
        {
          from: "user10086",
          time: "2020.12.19 16:05",
          content: "hi!",
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
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    deleteAll() {
      this.messageData.splice();
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
