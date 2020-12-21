/* Nav.js */
export default {
  name: "Nav",
  props: {
    notHomePage: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      infoform: {
        username:'',
        password:'',
        email: '',
        nickname: '',
        avator: '',
        auth: '',
        admin: false,
        token:'',
        id:'',
        verification_code:''
      },
      searchOptions: [
        {
          value: "all",
          label: "全站",
        },
        {
          value: "paper",
          label: "论文",
          children: [
            {
              value: "paper_title",
              label: "标题",
            },
            {
              value: "paper_author",
              label: "作者",
            },
            {
              value: "paper_doi",
              label: "DOI",
            },
            {
              value: "paper_keywords",
              label: "关键词",
            },
          ],
        },
        {
          value: "patent",
          label: "专利",
          children: [
            {
              value: "patent_title",
              label: "标题",
            },
            {
              value: "patent_owner",
              label: "持有人",
            },
          ],
        },
        {
          value: "project",
          label: "科研项目",
          children: [
            {
              value: "project_title",
              label: "标题",
            },
            {
              value: "project_author",
              label: "参与者",
            },
            {
              value: "project_keywords",
              label: "关键词",
            },
          ],
        },
        {
          value: "scholar",
          label: "学者",
        },
      ],
      value: ["all"],
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
  mounted: function () {
    this.$axios({
      method:'get',
      url:'/user',
      params:{
        
      },
      headers: {
        token: window.localStorage.getItem("token"),
      },
    }).then(response => {
      console.log(response);
      this.infoform = response.data.information;
    }).catch(error => {
      console.log(error);
    })
  },
  methods: {
    handleCommand(command) {
      if (command == "info") this.$router.push({ path: "/info" });
      else if (command == "gate") this.$router.push({ path: "/gate" });
      else if (command == "lgout") {
          window.localStorage.clear();
          this.$router.push({ path: "/login" });
      }
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
