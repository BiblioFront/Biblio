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
      userInfo: {},
      isLogin: false,

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
      subscribeList: [{}],

      //like:
      likeList: [],
    };
  },
  mounted() {
    this.userInfo = this.$store.getters.getUser;
    this.isLogin = this.$store.getters.isLogin;
    this.subscribeCommand();
    this.likeCommand();
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
            this.subscribeList = response.data.followList;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    likeCommand() {
      this.$axios({
        method: "get",
        url: "/user/favorite/all",
        params: {},
        headers: {
          token: window.localStorage.getItem("token"),
        },
      })
        .then((response) => {
          console.log(response);
          if (response.data.msg == "successfully") {
            this.likeList = response.data.favoriteList;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteSubscirbe(item) {
      console.log(item._id);

      this.$axios
        .get("user/follow/delete?scholarID=" + item._id, {
          headers: { token: window.localStorage.getItem("token") },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      this.subscribeCommand();
    },
    deleteLike(id) {
      this.$axios({
        method: "delete",
        url: "/user/favorite/delete",
        params: {
          paperId: id,
        },
        headers: {
          token: window.localStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.data.msg == "Delete successfully") {
            this.likeCommand();
            this.$message.success("删除成功！");
          } else this.$message.error("Delete failed");
        })
        .catch((error) => {
          console.log(error);
          this.$message.error("please login first");
        });
    },
    clearSubscribeList() {
      // xyy
      this.$axios
        .get("user/follow/delete/all", {
          headers: { token: window.localStorage.getItem("token") },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      this.subscribeCommand();
    },
    clearLike() {
      this.$axios({
        method: "delete",
        url: "/user/favorite/delete/all",
        params: {},
        headers: {
          token: window.localStorage.getItem("token"),
        },
      })
        .then((response) => {
          if (response.data.msg == "Delete all successfully") {
            this.$message.success("删除成功！");
          } else this.$message.error("Delete all failed");
        })
        .catch((error) => {
          console.log(error);
          this.$message.error("please login first");
        });
    },
    deleteRow(index, rows) {
      if (rows == this.messageData) {
        this.$axios({
          method: "delete",
          url: "/user/message",
          params: {
            messageID: this.messageData[index].id,
          },
          headers: {
            token: window.localStorage.getItem("token"),
          },
        })
          .then((response) => {
            if (response.data.msg == "Delete successfully") {
              rows.splice(index, 1);
            } else this.$message.error("删除失败");
          })
          .catch((error) => {
            console.log(error);
            this.$message.error("删除失败");
          });
      }
    },
    deleteAll() {
      for (var i = this.messageData.length - 1; i >= 0; i--) {
        this.$axios({
          method: "delete",
          url: "/user/message",
          params: {
            messageID: this.messageData[i].id,
          },
          headers: {
            token: window.localStorage.getItem("token"),
          },
        })
          .then((response) => {
            if (response.data.msg == "Delete successfully") {
              this.messageData.splice(i, 1);
            } else this.$message.error("删除失败");
          })
          .catch((error) => {
            console.log(error);
            this.$message.error("删除失败");
          });
      }
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

    // setdrawer() {
    //   this.drawer = true;
    //   this.getMessage();
    // },
    setdrawer() {
      this.drawer = true;
      console.log(this.drawer);
      this.messageData = [];
      this.$axios({
        method: "get",
        url: "/user/message",
        params: {},
        headers: {
          token: window.localStorage.getItem("token"),
        },
      })
        .then((response) => {
          var messages = response.data.messageList;
          for (var i = 0; i < messages.length; i++) {
            var messageObject = {};
            messageObject.from = messages[i].sender.username;
            messageObject.time = messages[i].date;
            messageObject.id = messages[i].id;
            messageObject.content = messages[i].content;
            messageObject.avator = messages[i].sender.avator;
            this.messageData.push(messageObject);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showForm() {
      this.formsee = true;
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
          } else if (response.data.msg == "User does not exist") {
            this.$message.error("用户不存在！");
            this.existName = false;
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
    change(e) {
      this.$forceUpdate(e);
    },
  },
};
