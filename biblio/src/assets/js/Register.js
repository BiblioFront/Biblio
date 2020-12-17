/* Register.js */
export default {
  name: "Register",
  data() {
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        if (value !== "") {
          var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if (!reg.test(value)) {
            callback(new Error("邮箱不合法"));
          }
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.password2 !== "") {
          this.$refs.registerForm.validateField("password2");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        console.log(value);
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        console.log(value);
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        name: "",
        password: "",
        password2: "",
        email: "",
      },
      password2: "",
      fieldRules: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            validator: validatePass,
            // message: '请输入密码',
            trigger: "blur",
          },
        ],
        password2: [
          {
            required: true,
            validator: validatePass2,
            // message: '请再次填写密码',
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            validator: validateEmail,
            // message: '请输入正确完整的邮箱号',
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    register(formName) {
      var _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          delete this.registerForm.password2;
          let userInfo = this.registerForm;
          console.log(this.registerForm);
          this.$api.login.register(userInfo).then((res) => {
            if (res.code !== 200) {
              _this.$message({
                message: res.msg,
                type: "error",
              });
            } else {
              _this.$router.push("/login");
            }
          }); //.catch(failResponse => {})
        } else {
          _this.$message({
            message: "请正确填写注册信息！",
            type: "error",
          });
        }
      });
    },
    reset() {
      this.$refs.registerForm.resetFields();
    },
    route2Home() {
      this.$router.push({ path: "/" });
    },
  },
};
