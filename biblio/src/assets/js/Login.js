export default {
  name: "Login",
  data: function () {
    return {
      loginForm: {
        phone: "",
        password: "",
      },
      fieldRules: {
        phone: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      checked: false,
      loading: false,
    };
  },
  methods: {
    route2Home() {
      this.$router.push({ path: "/" });
    },
    login: function () {
      console.log("登录");
      console.log(this.loginForm.phone);
      console.log(this.loginForm.password);
      var _this = this;
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log("valid!");
          this.$axios.post('/user/login', {
            username: _this.loginForm.phone,
            password: _this.loginForm.password
          }).then(response => {
            if (response.data.msg === "login success") {
              this.$message({
                message: '恭喜你，登录成功',
                type: 'success'
              });
              window.localStorage.setItem("token", response.data.token);
              // window.localStorage.clear();
              _this.$router.push('/');
            }
            else 
            {
              console.log("login fail");
              this.$message({
                message:'发生甚么事了，登录失败',
                type: 'error'
              });
            }
          }).catch(error => {
            console.log(error);
            console.log("请求异常");
            this.$message({
              message:'发生甚么事了，登录失败',
              type: 'error'
            });
          })
        } else console.log("invalid!");
      });
    },
    reset: function () {
      // console.log("重置");
      this.loginForm.phone = "";
      this.loginForm.password = "";
    },
  },
};