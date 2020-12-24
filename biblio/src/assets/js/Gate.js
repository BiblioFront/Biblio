/* Gate.js */
import Nav from "@/components/Nav.vue";
import WordsCloud from "@/components/WordsCloud.vue";
import LineMap from "@/components/LineMap.vue";
import Collaborator from "@/components/Collaborator.vue";
import CircleProgressbar from "@/components/CircleProgressbar.vue";

export default {
  name: "Gate",
  components: {
    Nav,
    WordsCloud,
    LineMap,
    Collaborator,
    CircleProgressbar,
  },
  data() {
    return {
      //上传学术成果：
      //验证规则：
      verificationFormRules: {
        verification_code: {
          required: true,
          message: "请输入验证码",
          trigger: "blur",
        },
      },
      uploadAchievementFormRules: {
        needed: { required: true, message: "必填", trigger: "blur" },
      },
      uploadPaperFormRules: {
        author: { required: true, message: "必填", trigger: "blur" },
        title: { required: true, message: "必填", trigger: "blur" },
        url: { required: true, message: "必填", trigger: "blur" },
      },
      uploadPatentFormRules: {
        patentID: { required: true, message: "必填", trigger: "blur" },
        title: { required: true, message: "必填", trigger: "blur" },
        applyDate: { required: true, message: "必填", trigger: "blur" },
        publishID: { required: true, message: "必填", trigger: "blur" },
        owner: { required: true, message: "必填", trigger: "blur" },
        designer: { required: true, message: "必填", trigger: "blur" },
        status: { required: true, message: "必填", trigger: "blur" },
      },
      uploadProjectFormRules: {
        author: { required: true, message: "必填", trigger: "blur" },
        company: { required: true, message: "必填", trigger: "blur" },
        title: { required: true, message: "必填", trigger: "blur" },
        scope: { required: true, message: "必填", trigger: "blur" },
      },
      hasSendEmail: false, // 判断是否已经发送过邮件
      verificationBoxVisible: true, // 验证框可见性
      verificationDialogVisible: false, // 验证弹窗可见性
      verificationErrorVisible: false, // 验证错误信息可见性
      verificationErrorInfo: "发生了一些错误...", // 验证错误信息
      // 验证表单
      verificationForm: {
        verification_code: "",
      },
      uploadAchievementDialogVisible: false, // 上传学术成果弹窗可见性
      uploadPaperForm: {},
      uploadPatentForm: {},
      uploadProjectForm: {},
      achievementType: null,
      options: [
        {
          value: "论文",
          label: "论文",
        },
        {
          value: "专利",
          label: "专利",
        },
        {
          value: "研究项目",
          label: "研究项目",
        },
      ],

      //scholar Info
      paperProgress: "0.00",
      patentProgress: "0.00",
      projectProgress: "0.00",
      biblioCount: 0,
      yearIndex: [],
      biblioIndex: [],
      resList: {},
    };
  },
  created() {
    const _this = this;

    this.$axios
      .get("analysis/researcher/" + _this.$route.query.id, {
        headers: { token: window.localStorage.getItem("token") },
      })
      .then((res) => {
        _this.resList = res.data;

        _this.biblioCount =
          res.data.paperCount + res.data.patentCount + res.data.projectCount;
        _this.paperProgress = ((res.data.paperCount / _this.biblioCount) * 100)
          .toFixed(2)
          .toString();
        _this.patentProgress = (
          (res.data.patentCount / _this.biblioCount) *
          100
        )
          .toFixed(2)
          .toString();
        _this.projectProgress = (
          (res.data.projectCount / _this.biblioCount) *
          100
        )
          .toFixed(2)
          .toString();

        var linemapArr = res.data.publishYear;
        var compare = function(obj1, obj2) {
          var val1 = obj1.name;
          var val2 = obj2.name;
          if (val1 < val2) {
            return -1;
          } else if (val1 > val2) {
            return 1;
          } else {
            return 0;
          }
        };

        linemapArr.sort(compare);

        var i = 0;
        var year = linemapArr[0].name;
        while (year != linemapArr[linemapArr.length - 1].name) {
          if (linemapArr[i].name == year) {
            _this.yearIndex.push(linemapArr[i].name);
            _this.biblioIndex.push(linemapArr[i].value);
            i++;
          } else {
            _this.yearIndex.push(year);
            _this.biblioIndex.push(0);
          }
          year++;
        }

        _this.$store.commit("SET_SCHOLARINFO", res.data);
      });
  },
  mounted() {
    var scholarInfo = this.$store.getters.getScholarInfo;
    this.resList = scholarInfo;
  },
  beforeDestroy() {
    this.$store.commit("REMOVE_SCHOLARINFO");
  },
  methods: {
    initGate() {
      const _this = this;
      this.$axios
        .get("analysis/researcher/" + _this.$route.query.id, {
          headers: { token: window.localStorage.getItem("token") },
        })
        .then((res) => {
          _this.resList = res.data;
          _this.biblioCount =
            res.data.paperCount + res.data.patentCount + res.data.projectCount;
          // console.log(res.data.paperCount);
          // console.log(res.data.patentCount);
          // console.log(res.data.patentCount);
          // console.log(_this.biblioCount);
        });
    },
    // 发送验证邮件
    verification() {
      this.verificationDialogVisible = true;
      this.verificationBoxVisible = false;
      if (!this.hasSendEmail) {
        var scholarID = this.resList.scholarInfo.scholarID;
        console.log(scholarID);
        var token = window.localStorage.getItem("token");
        console.log(token);

        this.$axios
          .get(
            "/user/verification?researcherID=" +
              this.resList.scholarInfo.scholarID,
            {
              headers: { token: token },
            }
          )
          .then((response) => {
            var msg = response.data.msg;
            console.log(msg);
            if (msg === "Send verification code successfully") {
              this.hasSendEmail = true;
              this.verificationBoxVisible = true;
            } else if (msg === "Email format error") {
              this.verificationErrorVisible = true;
              this.verificationErrorInfo = "邮箱格式错误";
              this.$message.error("邮箱格式错误");
            } else if (msg === "Unsupported mailbox") {
              this.verificationErrorVisible = true;
              this.verificationErrorInfo = "不支持您的邮箱类型";
              this.$message.error("不支持您的邮箱类型");
            } else if (msg === "please login first") {
              this.verificationErrorVisible = true;
              this.verificationErrorInfo = "请先登录";
              this.$message.error("请先登录");
            }
          })
          .catch((error) => {
            console.log(error);
            console.log("请求异常");
          });
      } else {
        this.verificationBoxVisible = true;
      }
    },
    // 发送验证码
    claim() {
      this.$refs.verificationFormRef.validate((valid) => {
        if (!valid) return;

        var scholarID = this.resList.scholarInfo._id;
        console.log(scholarID);
        var token = window.localStorage.getItem("token");
        console.log(token);

        this.$axios
          .get(
            "/user/claim?researcherID=" +
              scholarID +
              "&verification_code=" +
              this.verificationForm.verification_code,
            {
              headers: { token: token },
            }
          )
          .then((response) => {
            var msg = response.data.msg;
            console.log(msg);
            if (msg === "claim successfully") {
              this.$message.success("认证成功");
              this.verificationDialogClosed();
            } else if (msg === "Wrong verification code") {
              this.$message.error("验证码错误");
            } else if (msg === "please login first") {
              this.verificationErrorVisible = true;
              this.verificationErrorInfo = "请先登录";
              this.$message.error("请先登录");
            }
          })
          .catch((error) => {
            console.log(error);
            console.log("请求异常");
          });
      });
    },
    // 关闭验证弹窗
    verificationDialogClosed() {
      this.verificationDialogVisible = false;
      this.verificationErrorVisible = false;
      // this.$refs.verificationFormRef.resetFields()
      this.verificationForm.verification_code = "";
    },
    //关注
    follow() {
      // xyy
      var token = window.localStorage.getItem("token");
      console.log(token);
      var _id = this.resList.scholarInfo._id;
      console.log(_id);
      this.$axios({
        methods: "get",
        url: "user/follow?scholarID=" + _id,
        headers: { token: token },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      // this.$axios({
      //     methods: "post",
      //     url: "user/follow?scholarID=" + _id,
      //     headers: {
      //         token: token,
      //     },
      // }).then((response) => {
      //     console.log(response)
      // }).catch((error) => {
      //     console.log(error)
      // });
    },
    deleteFollow() {},
    // 上传论文
    uploadPaper() {
      this.$refs.uploadPaperFormRef.validate((valid) => {
        if (!valid) return;
        var scholarID = this.resList.scholarInfo._id;
        console.log(scholarID);
        var token = window.localStorage.getItem("token");
        console.log(token);

        let uploadPaperForm = {
          author: this.uploadPaperForm.author,
          title: this.uploadPaperForm.title,
          summary: this.uploadPaperForm.summary,
          url: this.uploadPaperForm.url,
          keywords: this.uploadPaperForm.keywords,
          journal: this.uploadPaperForm.journal,
          organization: this.uploadPaperForm.organization,
        };
        // console.log(uploadPaperForm)
        this.$axios
          .post("/user/paper/add?ResearcherID=" + scholarID, uploadPaperForm, {
            headers: { token: token },
          })
          .then((response) => {
            var msg = response.data.msg;
            console.log(msg);
            if (msg === "successfully") {
              this.$message.success("上传成功");
              this.achievementType = null;
              this.uploadPaperForm = {};
              this.uploadAchievementDialogVisible = false;
            } else if (msg === "You have no authority") {
              this.$message.error("您没有权限");
            } else if (msg === "please login first") {
              this.$message.error("请先登录");
            }
          })
          .catch((error) => {
            console.log(error);
            console.log("请求异常");
          });
        console.log(this.achievementType);
      });
    },
    // 上传专利
    uploadPatent() {
      this.$refs.uploadPatentFormRef.validate((valid) => {
        if (!valid) return;

        var scholarID = this.resList.scholarInfo.scholarID;
        console.log(scholarID);
        var token = window.localStorage.getItem("token");
        console.log(token);

        let uploadPatentForm = {
          title: this.uploadPatentForm.title,
          summary: this.uploadPatentForm.summary,
          type: this.uploadPatentForm.type,
          patentID: this.uploadPatentForm.patentID,
          applyDate: this.uploadPatentForm.applyDate,
          publishID: this.uploadPatentForm.publishID,
          publicDate: this.uploadPatentForm.publicDate,
          mainTypeNumber: this.uploadPatentForm.mainTypeNumber,
          typeNumber: this.uploadPatentForm.typeNumber,
          owner: this.uploadPatentForm.owner,
          designer: this.uploadPatentForm.designer,
          address: this.uploadPatentForm.address,
          agency: this.uploadPatentForm.agency,
          agent: this.uploadPatentForm.agent,
          code: this.uploadPatentForm.code,
          description: this.uploadPatentForm.description,
          status: this.uploadPatentForm.status,
        };

        // console.log(uploadPatentForm)

        this.$axios
          .post(
            "/user/patent/add?ResearcherID=" + scholarID,
            uploadPatentForm,
            {
              headers: { token: token },
            }
          )
          .then((response) => {
            var msg = response.data.msg;
            console.log(msg);
            if (msg === "successfully") {
              this.$message.success("上传成功");
              this.achievementType = null;
              this.uploadPatentForm = {};
              this.uploadAchievementDialogVisible = false;
            } else if (msg === "You have no authority") {
              this.$message.error("您没有权限");
            } else if (msg === "please login first") {
              this.$message.error("请先登录");
            }
          })
          .catch((error) => {
            console.log(error);
            console.log("请求异常");
          });
      });
    },
    // 上传项目
    uploadProject() {
      this.$refs.uploadProjectFormRef.validate((valid) => {
        if (!valid) return;

        var scholarID = this.resList.scholarInfo.scholarID;
        console.log(scholarID);
        var token = window.localStorage.getItem("token");
        console.log(token);

        let uploadProjectForm = {
          author: this.uploadProjectForm.author,
          title: this.uploadProjectForm.title,
          summary: this.uploadProjectForm.summary,
          company: this.uploadProjectForm.company,
          keywords: this.uploadProjectForm.keywords,
          year: this.uploadProjectForm.year,
          scope: this.uploadProjectForm.scope,
          plan: this.uploadProjectForm.plan,
        };
        // console.log(uploadProjectForm)
        this.$axios
          .post(
            "/user/project/add?ResearcherID=" + scholarID,
            uploadProjectForm,
            {
              headers: { token: token },
            }
          )
          .then((response) => {
            var msg = response.data.msg;
            console.log(msg);
            if (msg === "successfully") {
              this.$message.success("上传成功");
              this.achievementType = null;
              this.uploadProjectForm = {};
              this.uploadAchievementDialogVisible = false;
            } else if (msg === "You have no authority") {
              this.$message.error("您没有权限");
            } else if (msg === "please login first") {
              this.$message.error("请先登录");
            }
          })
          .catch((error) => {
            console.log(error);
            console.log("请求异常");
          });
      });
    },
    // 上传学术成果
    uploadAchievement() {
      if (this.achievementType === "论文") {
        this.uploadPaper();
      } else if (this.achievementType === "专利") {
        this.uploadPatent();
      } else if (this.achievementType === "研究项目") {
        this.uploadProject();
      }
    },
    route2Paper(id) {
      this.$router.push({
        path: "/paper",
        query: { id: id },
      });
    },
    route2Patent(id) {
      this.$router.push({
        path: "/patent",
        query: { id: id },
      });
    },
    route2Project(id) {
      this.$router.push({
        path: "/project",
        query: { id: id },
      });
    },
  },
};
