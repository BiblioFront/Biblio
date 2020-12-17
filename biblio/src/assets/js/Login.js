/* Login.js */
export default {
  name: "Login",
  data() {
    return {
      loading: false,
      loginForm: {
        phone: "",
        password: "",
      },
      fieldRules: {
        phone: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      checked: false,
    };
  },
  methods: {
    login(formName) {
      var _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let userInfo = {
            phone: this.loginForm.phone,
            password: this.loginForm.password,
          };
          this.$api.login.login(userInfo).then((res) => {
            if (res.code === 400) {
              _this.$message({
                message: res.msg,
                type: "error",
              });
            } else {
              _this.$store.commit("login", res.data);
              console.log(_this.$store.state.user.username.id);
              _this.$router.push("/home");
            }
          }); //.catch(failResponse => {})
        } else {
          _this.$message({
            message: "请填写完整登录信息！",
            type: "error",
          });
        }
      });
    },
    reset() {
      this.$refs.loginForm.resetFields();
    },
    route2Home() {
      this.$router.push({ path: "/" });
    },
  },
  // destroyed:function(){
  //   if(this.loginstatus)
  //   {
  //     bus.$emit('login-event');
  //   }
  // }
};
