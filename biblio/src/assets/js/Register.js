export default {
  name: "Register",
  data: function() {
    return {
      registerForm: {
        username: "",
        password: "",
        email: "",
        nickname: "",
      },
      fieldRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "邮箱不能为空",
            trigger: "blur",
          },
        ],
        nickname: [
          {
            required: true,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    reset() {
      this.registerForm.username = "";
      this.$refs.registerForm.resetFields();
    },
    route2Home() {
      this.$router.push({ path: "/" });
    },
    register: function() {
      console.log(
        "Register...  [username: " +
          this.registerForm.username +
          ", password: " +
          this.registerForm.password +
          ", password: " +
          this.registerForm.password +
          ", email: " +
          this.registerForm.email +
          ", nickname: " +
          this.registerForm.nickname +
          "]"
      );

      var _this = this;
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          console.log("Register: Input Valid!");

          this.$axios
            .post("/user/register", {
              username: _this.registerForm.username,
              password: _this.registerForm.password,
              email: _this.registerForm.email,
              nickname: _this.registerForm.nickname,
            })
            .then((response) => {
              //register success
              if (response.data.msg === "register success") {
                this.$message({
                  message: "注册成功!",
                  type: "success",
                });

                //auto Login
                this.$axios
                  .post("/user/login", {
                    username: _this.registerForm.username,
                    password: _this.registerForm.password,
                  })
                  .then((response) => {
                    console.log("Register SUCCESS!");
                    _this.$store.commit("SET_TOKEN", response.data.token);
                    //get userInfo
                    _this.$axios
                      .get("/user", {
                        headers: {
                          token: window.localStorage.getItem("token"),
                        },
                      })
                      .then((response) => {
                        console.log(
                          "Pulling userInfo SUCCESSFULLY!  [token: " +
                            window.localStorage.getItem("token") +
                            "]"
                        );

                        if (response.data.information.avatar == null)
                          response.data.information.avatar =
                            "../assets/img/scholar_avatar_default.jpg";
                        _this.$store.commit(
                          "SET_USERINFO",
                          response.data.information
                        );
                      });

                    _this.$router.push("/");
                    location.reload();
                  });

                _this.$router.push("/");
              }
              //Username already exists
              else if (response.data.msg === "Username already exists") {
                console.log(
                  "Register failed! [Error: " + response.data.msg + "]"
                );

                this.$message({
                  message: "用户名已存在！",
                  type: "error",
                });
              }
              //Mailbox is already occupied
              else if (response.data.msg === "Mailbox is already occupied") {
                console.log(
                  "Register failed! [Error: " + response.data.msg + "]"
                );

                this.$message({
                  message: "用户名已存在！",
                  type: "error",
                });
              }
            })
            .catch((error) => {
              console.log("Register failed! [Error:\n" + error + "\n]");

              this.$message({
                message: "系统错误！",
                type: "error",
              });
            });
        } else console.log("Login failed! [Error: Input INVALID!]");
      });
    },
  },
};
