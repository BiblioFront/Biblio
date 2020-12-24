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
      userInfo: this.$store.getters.getUser,
      password: "123456",
      userInfo_chan: {
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
      rules: {
        email: [{ required: false, validator: checkEmail, trigger: "blur" }],
      },
    };
  },
  mounted() {
    console.log(this.userInfo);
    // .then((response) => {
    //   //console.log(response);
    // })
    // .catch((error) => {
    //   //console.log(error);
    // });

    //console.log(this.isLogin);
  },
  methods: {
    route2Gate() {
      this.$router.push({ path: "/gate", query: { id: this.userInfo.auth } });
    },
    goEditname() {
      console.log("Infopage Requsting...  [Edit nickname]");
      this.editname = true;
    },
    SaveEditname() {
      console.log(
        "Infopage Requsting...  [Nickname: " +
          this.userInfo.nickname +
          "to" +
          this.newname +
          "]"
      );

      const _this = this;
      this.$axios({
        method: "patch",
        url: "/user",
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          nickname: this.newname,
        },
      })
        .then((response) => {
          //Changed successfully
          if (response.data.msg == "Changed successfully") {
            console.log("Infopage Requst for Edit Nickname SUCCESS!");
            _this.$message.success("修改成功！");

            _this.userInfo.nickname = _this.newname;
            _this.$store.commit("SET_USERINFO", _this.userInfo);
            _this.editname = false;
          }
          //please login first
          else if (response.data.msg == "please login first") {
            console.log(
              "Infopage Requst failed! [Error: " + response.data.msg + "]"
            );

            _this.$message.error("未登录！");
          }
        })
        .catch((error) => {
          console.log("Infopage Requst failed! [Error: " + error + "]");

          _this.$message.error("系统错误！ [" + error + "]");
        });
    },
    goEditemail() {
      console.log("Infopage Requsting...  [Edit email]");
      this.editemail = true;
    },
    SaveEditemail(userInfo_chan) {
      console.log(
        "Infopage Requsting...  [Email: " +
          this.userInfo.email +
          "to" +
          this.userInfo_chan.email +
          "]"
      );

      const _this = this;
      this.$refs[userInfo_chan].validate((valid) => {
        if (valid) {
          this.$axios({
            method: "patch",
            url: "/user",
            headers: {
              token: window.localStorage.getItem("token"),
            },
            data: {
              email: _this.userInfo_chan.email,
            },
          })
            .then((response) => {
              //Changed successfully
              if (response.data.msg == "Changed successfully") {
                console.log("Infopage Requst for Email SUCCESS!");

                _this.$message.success("修改成功！");
                _this.userInfo.email = _this.userInfo_chan.email;
                _this.$store.commit("SET_USERINFO", _this.userInfo);
                _this.editemail = false;
              }
              //please login first
              else if (response.data.msg == "please login first") {
                console.log(
                  "Infopage Requst failed! [Error: " + response.data.msg + "]"
                );

                _this.$message.error("未登录！");
              }
              //Mailbox is already occupied
              else if (response.data.msg == "Mailbox is already occupied") {
                console.log(
                  "Infopage Requst failed! [Error: " + response.data.msg + "]"
                );

                _this.$message.error("邮箱被占用！");
              }
            })
            .catch((error) => {
              console.log("Infopage Requst failed! [Error: " + error + "]");

              _this.$message.error("系统错误！ [" + error + "]");
            });
        } else {
          console.log("Infopage Requst failed! [Error: invalid input]");

          this.$message.error("请输入正确的邮箱格式！");
        }
      });
    },
    goEditpassword() {
      console.log("Infopage Requsting...  [Edit password]");
      this.editpassword = true;
    },
    Savepassword() {
      console.log(
        "Infopage Requsting...  [Password changed" + this.newpassword + "]"
      );

      if (this.newpassword == "") {
        console.log("Infopage Requst failed! [Error: invalid input]");

        this.$message.error("密码不能为空！");
      }

      const _this = this;
      this.$axios({
        method: "patch",
        url: "/user/password",
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          oldpassword: _this.oldpassword,
          newpassword: _this.newpassword,
        },
      })
        .then((response) => {
          //Changed successfully
          if (response.data.msg == "Changed successfully") {
            console.log("Infopage Requst for Password SUCCESS!");

            _this.userInfo.password = _this.newpassword;
            _this.$message.success("修改成功！");

            //get userInfo
            _this.$axios
              .get("/user", {
                headers: { token: window.localStorage.getItem("token") },
              })
              .then((response) => {
                console.log(
                  "Pulling userInfo...  [token: " +
                    window.localStorage.getItem("token") +
                    "]"
                );

                if (response.data.msg == "get information successfully") {
                  console.log("UserInfo: Get Information SUCCESSFULLY");

                  if (response.data.information.avatar == null)
                    response.data.information.avatar =
                      "../assets/img/scholar_avatar_default.jpg";
                  _this.$store.commit(
                    "SET_USERINFO",
                    response.data.information
                  );
                } else if (response.data.msg == "please login first") {
                  console.log("Pull request failed!");
                }
              });

            _this.editpassword = false;
          }
          //Wrong password
          else if (response.data.msg == "Wrong password") {
            console.log(
              "Infopage Requst failed! [Error: " + response.data.msg + "]"
            );

            _this.$message.error("原密码有误！");
          }
          //please login first
          else if (response.data.msg == "please login first") {
            console.log(
              "Infopage Requst failed! [Error: " + response.data.msg + "]"
            );

            _this.$message.error("未登录！");
          }
        })
        .catch((error) => {
          console.log("Infopage Requst failed! [Error: " + error + "]");

          _this.$message.error("系统错误！ [" + error + "]");
        });
    },
    handleAvatarSuccess(res) {
      var tmp = res.filepath;
      console.log(tmp);
      this.photo = tmp;
    },
    beforeAvatarUpload(file) {
      const format =
        file.type === "image/gif" ||
        "image/jpeg" ||
        "image/png" ||
        "image/jpg" ||
        "image/bmp" ||
        "image/tif" ||
        "image/pcx" ||
        "image/tga" ||
        "image/exif" ||
        "image/fpx" ||
        "image/svg" ||
        "image/psd" ||
        "image/cdr" ||
        "image/pcd" ||
        "image/dxf" ||
        "image/ufo" ||
        "image/eps" ||
        "image/ai" ||
        "image/raw" ||
        "image/WMF" ||
        "image/webp";
      const isLt10M = file.size / 1024 / 1024 / 10;

      if (!format) {
        this.$message.error(
          "图像格式错误！\n上传头像图片格式可为jpeg,bmp,jpg,png,tif,gif,pcx,tga,exif,fpx,svg,psd,cdr,pcd,dxf,ufo,eps,ai,raw,WMF,webp"
        );
      }
      if (!isLt10M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      }
      return format && isLt10M;
    },
    uploadAvatar(resource) {
      console.log(
        "Infopage Requsting...  [Avatar: " + JSON.stringify(resource.file) + "]"
      );

      let pic = resource.file;
      let fd = new FormData();
      fd.append("file", pic);

      const _this = this;
      this.$axios({
        url: "user/avatar",
        method: "patch",
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: fd,
      })
        .then((res) => {
          if (res.data.msg == "successfully") {
            console.log("Infopage Requst for Avatar SUCCESS!");

            _this.userInfo.avatar = res.data.newAvatar;
            _this.$store.commit("SET_USERINFO", _this.userInfo);
          } else if (res.data.msg == "This file is not a photo") {
            console.log(
              "Infopage Requst failed! [Error: " + res.data.msg + "]"
            );

            _this.$message({
              message: "文件格式有误！",
              type: "error",
            });
          } else if (res.data.msg == "please login first") {
            console.log(
              "Infopage Requst failed! [Error: " + res.data.msg + "]"
            );

            _this.$message({
              message: "未登录！",
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log("Infopage Requst failed! [Error: " + error + "]");

          this.$message.error("系统错误！ [" + error + "]");
        });
    },
  },
};
