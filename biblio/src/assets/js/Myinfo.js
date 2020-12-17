/* Myinfo.js */
import Nav from "@/components/Nav.vue";

export default {
  name: "MyInfo",
  data() {
    // var checkEmail = (rule, value, callback) => {
    //     const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    //     if (!value) {
    //         return callback(new Error('邮箱不能为空'))
    //     }
    //     setTimeout(() => {
    //         if (mailReg.test(value)) {
    //             callback()
    //         } else {
    //             callback(new Error('请输入正确的邮箱格式'))
    //         }
    //     }, 100)
    // };
    return {
      infoform: {
        username: "",
        password: "",
        email: "",
        nickname: "",
        avator: "",
        auth: "",
        admin: false,
        token: "",
      },
      isAuth: true,
      rules: {
        // email: [
        //     { required: true, validator: checkEmail, trigger: 'blur' }
        // ],
      },
    };
  },
  components: {
    Nav,
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
