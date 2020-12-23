export default {
  name: "Login",
  data: function() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      fieldRules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      loginMsg: "",
      checked: false,
      loading: false,
    };
  },
  methods: {
    route2Home() {
      this.$router.push({ path: "/" });
    },
    login: function() {
      console.log(
        "Login...  [username: " +
          this.loginForm.username +
          ", password: " +
          this.loginForm.password +
          "]"
      );

      const _this = this;
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log("Login: Input Valid!");

          this.$axios
            .post("/user/login", _this.loginForm)
            .then((response) => {
              _this.loginMsg = response.data.msg;
              //login success
              if (_this.loginMsg == "login success") {
                console.log("Login SUCCESS!");
                _this.$store.commit("SET_TOKEN", response.data.token);
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

                _this.$router.push("/");
              }
              //User does not exist
              else if (_this.loginMsg == "User does not exist") {
                console.log("Login failed! [Error: " + _this.loginMsg + "]");

                _this.$message({
                  message: "用户名不存在！",
                  type: "error",
                });
              }
              //wrong password
              else if (_this.loginMsg == "wrong password") {
                console.log("Login failed! [Error: " + _this.loginMsg + "]");

                _this.$message({
                  message: "密码错误！",
                  type: "error",
                });
              }
            })
            .catch((error) => {
              console.log("Login failed! [Error:\n" + error + "\n]");

              this.$message({
                message: "系统错误！",
                type: "error",
              });
            });
        } else console.log("Login failed! [Error: Input INVALID!]");
      });
    },
    reset: function() {
      this.loginForm.username = "";
      this.loginForm.password = "";
    },
  },
};
