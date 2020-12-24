/* Patent.js */
import Nav from "@/components/Nav.vue";

export default {
  name: "Patent",
  components: {
    Nav,
  },
  data: function() {
    return {
      //patentInfo:
      patentInfo: {
        _id: "",
        title: "",
        summary: "",
        type: "",
        patentID: "",
        applyDate: "",
        publishID: "",
        publicDate: "",
        mainTypeNumber: "",
        typeNumber: "",
        owner: "",
        desinger: "",
        address: "",
        agency: "",
        agent: "",
        code: "",
        description: "",
        status: "",
        read: 0,
        change: false,
        sort: "",
      },

      //patentButtons:
      referenceVisible: false,
      reference: "",
      errorVisible: false,
      error: "",
      shareVisible: false,
      share: "",
    };
  },
  created: function() {
    this.initPatentpage();
  },
  methods: {
    initPatentpage() {
      console.log(
        "Init Patent page...  [paperID: " +
          this.$route.query.id +
          ", token: " +
          window.localStorage.getItem("token") +
          "]"
      );

      const _this = this;
      this.$axios({
        method: "get",
        url: "/user/patent",
        params: {
          patentID: _this.$route.query.id,
        },
        headers: {
          token: window.localStorage.getItem("token"),
        },
      })
        .then((response) => {
          //successfully
          if (response.data.msg == "successfully") {
            console.log("Init Patent page SUCCESS！");
            _this.patentInfo = response.data.patent;

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
          } else {
            console.log(response.data.msg);
            this.$message({
              message: "您所访问的专利不存在",
              type: "error",
            });
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
  },
};
