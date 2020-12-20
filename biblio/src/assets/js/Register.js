export default {
  name:"Register",
  data:function(){
    return {
      registerForm:{
        username:"",
        password:"",
        email:"",
        nickname:""
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
            // validator: validatePass,
            message: '密码不能为空',
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            // validator: validateEmail,
            message: '邮箱不能为空',
            trigger: "blur",
          },
        ],
        nickname: [
          {
            required: true,
            // validator: validateEmail,
            // message: '请输入正确完整的邮箱号',
            trigger: "blur",
          },
        ],
      },
    }
  },
  methods:{
    reset() {
      this.registerForm.username = "";
      this.$refs.registerForm.resetFields();
    },
    route2Home() {
      this.$router.push({ path: "/" });
    },
    register:function() {
      console.log("register");
      console.log(this.registerForm.username);
      console.log(this.registerForm.password);
      console.log(this.registerForm.email);
      console.log(this.registerForm.nickname);
      var _this = this;
      this.$refs.registerForm.validate(valid => {
        if(valid) {
          console.log("验证通过");
          this.$axios.post('/user/register',{
            username:_this.registerForm.username,
            password:_this.registerForm.password,
            email:_this.registerForm.email,
            nickname:_this.registerForm.nickname
          }).then(response => {
            // if(response.msg === )
            console.log(response.msg);
          }).catch(error => {
            console.log(error);
          });
        }
        else console.log("验证失败");
      })
    }
  }
}