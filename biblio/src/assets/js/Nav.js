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
      //userInfo:
      userInfo: this.$store.getters.getUser,
      defaultAvatar: "../assets/img/scholar_avatar_default.jpg",
      isLogin: this.$store.getters.isLogin,

      //searchParams:
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
      searchResult: {
        total: 0,
        isAll: false,
        paperData: {},
        patentData: {},
        projectData: {},
        scholarData: {},
      },

      //messageParams:
      messageData: [],
      form: [
        {
          name: "",
          avatar: "",
          id: "",
        },
      ],
      drawer: false,
      formsee: false,
      existName: false,

      //subscribe:
      subscribeList: [
        {
          scholarID: "2",
          name: "Li",
          field: "IT",
          origanization: "buaa",
          id: 2,
        },
      ],

      //like:
      likeList: [
        {
          author: "Li",
          title: "new2022",
          summary:
            "goodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgoodgood",
          url: "IT",
          keywords: null,
          year: 2022,
          likes: 0,
          read: 0,
          change: false,
          id: 1,
          doi: "Li",
        },
      ],
    };
  },
  mounted() {
    this.$axios({
      method: "get",
      url: "/user/message",
      params: {},
      headers: {
        token: window.localStorage.getItem("token"),
      },
    });
    // .then((response) => {
    //   //console.log(response);
    // })
    // .catch((error) => {
    //   //console.log(error);
    // });

    //console.log(this.isLogin);
  },
  methods: {
    userCommand(command) {
      if (command == "info") this.route2Info();
      else if (command == "gate") this.route2Gate();
      else if (command == "lgout") {
        this.$store.commit("REMOVE_USERINFO");
        this.$router.push({ path: "/" });
        this.$router.go(0);
      }
    },
    subscribeCommand() {
      // xyy
      this.$axios({
        method: "get",
        url: "user/follow/all",
        headers: {
          token: window.localStorage.getItem("token"),
        },
      })
        .then((response) => {
          console.log(response);
          if (response.data.msg == "successfully") {
            this.subscribeList = response.data.favoriteList;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    likeCommand() {},
    deleteSubscirbe() {
      // xyy
      // this.$axios({
      //     method: "delete",
      //     url:"user/follow/delete/" + scholarID,
      //     headers:{
      //         token:window.localStorage.getItem("token"),
      //     },
      // })
      this.$axios
        .delete(
          //这个地方应该从参数传点什么让我知道我该删哪个
          "user/follow/delete?=scholarID" + this,
          { headers: { token: window.sessionStorage.getItem("token") } }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteLike() {},
    clearSubscribeList() {
      // xyy
      this.$axios
        .delete("user/follow/delete/all", {
          headers: { token: window.sessionStorage.getItem("token") },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    clearLike() {},
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
    route2Info() {
      this.$router.push({
        path: "/info",
        query: {
          id: this.userInfo.id,
        },
      });
    },
    route2Gate() {
      this.$router.push({
        path: "/gate",
        query: {
          id: this.userInfo.auth,
        },
      });
    },
    route2Search() {
      if (this.searchInput == "") {
        this.$message({
          customClass: "inputMessage--navcmp",
          duration: 1000,
          offset: 80,
          message: "请先输入搜索内容",
        });
        console.log("Searching error: No Input!");
      } else {
        this.$search.$boot(this.value, this.searchInput, 1, "");
      }
    },
    setdrawer() {
      this.drawer = true;
      this.getMessage();
    },
    showForm() {
      this.formsee = true;
    },
    findUser() {
      this.$axios({
        method: "get",
        url: "/user/search",
        params: {
          username: this.form.name,
        },
        headers: {
          token: window.localStorage.getItem("token"),
        },
      })
        .then((response) => {
          console.log(response);
          if (response.data.msg == "Search successfully") {
            this.form[0].name = response.data.user.username;
            this.form[0].avatar = response.data.user.avatar;
            this.form[0].id = response.data.user.id;
            console.log(this.form);
            this.existName = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    send_msg() {
      this.$axios({
        method: "post",
        url: "/user/message",
        params: {},
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          receiveID: this.form[0].id,
          content: this.textarea2,
        },
      })
        .then((response) => {
          console.log(response);
          if (response.data.msg == "Send successfully") {
            this.$message.success("发送成功！");
            this.formsee = false;
          } else {
            this.$message.error("发送失败");
            this.formsee = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getMessage() {
      console.log("User Requsting...  \nPulling message list...");

      const _this = this;
      this.$axios
        .get("/user/message", {
          headers: { token: window.localStorage.getItem("token") },
        })
        .then((res) => {
          const msg = res.data.msg;
          //Get message successfully
          if (msg === "Get message successfully") {
            console.log("Pull message list SUCCESS!");

            _this.messageData = res.data.messageList;
          }
          //please login first
          else if (msg === "please login first") {
            console.log("Pull message list failed! [Error: " + msg + "]");

            _this.$message.error("未登录！");
          }
        });
    },
    change(e) {
      this.$forceUpdate(e);
    },
  },
};
