/* Myinfo.js */
import Nav from "@/components/Nav.vue";

export default {
  name: "MyInfo",
  components: {
    Nav,
  },
  data() {
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          // console.log(value+" 判断邮箱格式正确");
          this.emailright = true;
          callback();
        } else {
          // console.log(value);
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };
    return {
      infoform: {
        username: "马保国",
        password: "123",
        email: "123@qq.com",
        nickname: "haha",
        avatar: "",
        auth: "",
        admin: false,
        token: "",
        id: "",
        verification_code: "",
      },
      password: "123456",
      infoform_chan: {
        email: "",
      },
      newname: "",
      newemail: "",
      oldpassword: "",
      newpassword: "",
      photo: "",
      isAuth: true,
      editname: false,
      editemail: false,
      editpassword: false,
      emailright: false,
      rules: {
        email: [{ required: false, validator: checkEmail, trigger: "blur" }],
      },
    };
  },
  mounted: function() {
    this.$axios({
      method: "get",
      url: "/user",
      params: {},
      headers: {
        token: window.localStorage.getItem("token"),
      },
    })
      .then((response) => {
        console.log(response);
        this.infoform = response.data.information;
      })
      .catch((error) => {
        console.log(error);
      });
    // this.$http.get('/user').then(res => {

    //     this.infoform = res.information;
    //     if(this.infoform.auth != null){
    //       this.isAuth = true;
    //     }
    // })
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    gotoGate() {
      this.$router.push("/gate");
    },
    goEditname() {
      console.log("editname");
      this.editname = true;
    },
    SaveEditname() {
      this.$axios({
        method: "patch",
        url: "/user",
        params: {},
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          username: this.newname,
        },
      })
        .then((response) => {
          console.log(response);
          if (response.data.msg == "Changed successfully") {
            this.$message.success("修改用户名成功！");
            this.infoform.username = this.newname;
            this.editname = false;
          } else {
            this.$message.error("用户名已存在，请重新修改");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    goEditemail() {
      this.emailright = false;
      this.editemail = true;
    },
    SaveEditemail(infoform_chan) {
      // console.log(this.emailright+" （emairight的值")
      // console.log(this.infoform_chan.email+" （email的值")
      this.$refs[infoform_chan].validate((valid) => {
        if (valid) {
          this.$axios({
            method: "patch",
            url: "/user",
            params: {},
            headers: {
              token: window.localStorage.getItem("token"),
            },
            data: {
              email: this.infoform_chan.email,
            },
          })
            .then((response) => {
              console.log(response);
              if (response.data.msg == "Changed successfully") {
                this.$message.success("修改邮箱成功！");
                this.infoform.password = this.newpassword;
                this.editpassword = false;
              } else {
                this.$message.error("修改邮箱失败！");
              }
            })
            .catch((error) => {
              console.log(error);
            });
          this.infoform.email = this.infoform_chan.email;
          // console.log("现在的email：" + this.infoform.email)
          this.editemail = false;
        } else {
          this.$message.error("请输入正确的邮箱格式！");
        }
      });
    },
    goEditpassword() {
      this.editpassword = true;
    },
    Savepassword() {
      console.log(this.newpassword);
      if (this.newpassword == "") {
        this.$message.error("密码不能为空！");
      }
      this.$axios({
        method: "patch",
        url: "/user/password",
        params: {},
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          oldpassword: this.oldpassword,
          newpassword: this.newpassword,
        },
      })
        .then((response) => {
          console.log(response);
          if (response.data.msg == "Changed successfully") {
            this.$message.success("修改密码成功！");
            this.infoform.password = this.newpassword;
            this.editpassword = false;
          } else if (response.data.msg == "Wrong password") {
            this.$message.error("原密码错误");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleAvatarSuccess(res) {
      var tmp = res.filepath;
      console.log(tmp);
      this.photo = tmp;
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/gif" || "image/jpeg" || "image/png" || "image/jpg";
      const isLt10M = file.size / 1024 / 1024 / 10;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt10M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return isJPG && isLt10M;
    },
    uploadAvatar(resource) {
      console.log(resource);
      let pic = resource.file;
      let fd = new FormData();
      fd.append("file", pic);
      this.$axios({
        url: "user/avatar",
        method: "patch",
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: fd,
      })
        .then((res) => {
          console.log(res);
          this.infoform.avatar = res.data.newAvatar;
        })
        .catch((err) => {
          this.$message.error("更新账户头像失败：" + err);
        });
    },
  },
};
