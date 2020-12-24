/* Paper.js */
import Nav from "@/components/Nav.vue";

export default {
  name: "Paper",
  components: {
    Nav,
  },
  data: function() {
    return {
      //paperInfo:
      paperInfo: {
        _id: "",
        author: "",
        title: "",
        summary: "",
        url: "",
        keywords: "",
        journal: "",
        date: "",
        organization: "",
        likes: 0,
        read: 0,
        change: false,
        sort: "",
        doi: "",
      },

      //paperButtons:
      isFavorite: false,
      referenceVisible: false,
      reference: "",
      errorVisible: false,
      error: "",
      shareVisible: false,
      share: "",

      //comments:
      comments: [
        {
          commenterID: "",
          commenter: {
            username: "",
            password: "",
            email: "",
            nickname: "",
            avatar: "",
            auth: "",
            admin: false,
            token: "",
            verification_code: "",
            id: "",
          },
          paperID: "",
          content: "",
          time: "",
          id: "",
        },
      ],
      newComment: "",

      //relative:
      relativeList: [{}],
      loading: true,
    };
  },
  created: function() {
    this.initPaperpage();
  },
  methods: {
    initPaperpage() {
      console.log(
        "Init Paper page...  [paperID: " +
          this.$route.query.id +
          ", token: " +
          window.localStorage.getItem("token") +
          "]"
      );

      const _this = this;
      this.$axios({
        method: "get",
        url: "/user/paper",
        params: {
          paperID: _this.$route.query.id,
        },
        headers: {
          token: window.localStorage.getItem("token"),
        },
      })
        .then((response) => {
          //get paper and comment successfully
          if (response.data.msg == "get paper and comment successfully") {
            console.log("Init Paper page SUCCESS！");

            _this.paperInfo = response.data.paper;
            _this.comments = response.data.commentList;
            _this.isFavorite = response.data.isFavorite;

            if (
              _this.paperInfo.author &&
              _this.paperInfo.title &&
              _this.paperInfo.journal &&
              _this.paperInfo.date
            )
              _this.reference =
                _this.paperInfo.author +
                "." +
                _this.paperInfo.title +
                "[J]." +
                _this.paperInfo.journal +
                ":" +
                _this.paperInfo.date;
            else {
              _this.reference = "文献信息不全，暂时无法生成参考文献";
            }

            _this.share = window.location.href;
            _this.getRelative();
          }
          //please login first
          else if (response.data.msg == "please login first") {
            console.log(
              "Init Paper page failed!  [Error: " + response.data.msg + "]"
            );

            _this.$message.error(response.data.msg);
          }
        })
        .catch((error) => {
          console.log("Init Paper page failed!  [Error: " + error + "]");
          _this.$message.error("系统错误！");
        });
    },
    handleCommand(command) {
      if (command == "info") {
        /* 跳转至对应用户信息页 */
        console.log("userinf");
        this.$router.push("/info");
      } else if (command == "letter") {
        /* 发送私信 */
        console.log("send letter");
      }
    },
    collect: function() {
      console.log("收藏");
      var _this = this;
      this.$axios({
        method: "post",
        url: "/user/favorite?paperId=" + _this.$route.query.id,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      })
        .then((response) => {
          console.log(response.data.msg);
          if (response.data.msg === "Collected successfully") {
            this.isFavorite = true;
          } else this.isFavorite = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    discollect: function() {
      console.log("取消收藏");
      var _this = this;
      this.$axios({
        method: "delete",
        url: "/user/favorite/delete?paperId=" + _this.$route.query.id,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      })
        .then((response) => {
          console.log(response.data.msg);
          if (response.data.msg === "Delete successfully")
            this.isFavorite = false;
          else this.isFavorite = true;
        })
        .catch((error) => {
          console.log(error);
        })
        .then((response) => {
          console.log(response.msg);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    publish: function() {
      console.log("发布评论");
      console.log(this.newComment);
      var _this = this;
      if (this.newComment === "") return;
      this.$axios({
        method: "post",
        url: "/user/comment",
        params: {
          paperID: _this.$route.query.id,
        },
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          content: this.newComment,
        },
      })
        .then((response) => {
          console.log(response.data.msg);
          if (response.data.msg === "comment success") {
            this.comments.push(response.data.comment);
            this.newComment = "";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    source: function() {
      window.location.href = this.paperInfo.url;
    },
    sendErrorMsg: function() {
      if (this.error) {
        this.$message.success("您的报错信息已提交");
        this.errorVisible = false;
      } else {
        this.$message.error("您的报错信息不能为空！");
      }
    },
    getRelative() {
      //console.log(this.paperInfo.title);
      var searchForm = {
        field: "title",
        words: this.paperInfo.title,
        page: 1,
        category: "",
      };
      const _this = this;
      this.$axios.post("/search/paper", searchForm).then((res) => {
        _this.relativeList = res.data.item;
        _this.relativeList.splice(0, 1);
        //console.log(_this.relativeList);
        _this.loading = false;
      });
    },
    route2Paper(item) {
      this.$router.replace({
        path: "/paper",
        query: { id: item._id },
      });
      location.reload();
    },
  },
};
