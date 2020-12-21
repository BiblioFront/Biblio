/* Myinfo.js */
import Nav from "@/components/Nav.vue";

export default {
  name: "MyInfo",
  components: {
    Nav,
  },
    data() {
      var checkEmail = (rule, value, callback) => {
                const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
                if (!value) {
                    return callback(new Error('邮箱不能为空'))
                }
                setTimeout(() => {
                    if (mailReg.test(value)) {
                      console.log(value+" 判断邮箱格式正确");
                        this.emailright = true;
                        callback()
                    } else {
                      console.log(value);
                        callback(new Error('请输入正确的邮箱格式'))
                    }
                }, 100)
            }
      return {
        infoform: {
          username:'马保国',
          password:'123',
          email: '123@qq.com',
          nickname: 'haha',
          avator: '',
          auth: '',
          admin: false,
          token:'',
          id:'',
          verification_code:''
        },
        infoform_chan:{
          email:'',
        },
        newname:'',
        newemail:'',
        newpassword: '',
        isAuth:true,
        editname:false,
        editemail:false,
        editpassword:false,
        emailright:false,
        rules: {
            email: [
                { required: true, validator: checkEmail, trigger: 'blur' }
            ],
        },
      }
    },
    mounted: function () {
            this.$http.get('/user').then(res => {
                console.log(res);
                this.infoform = res.information;
                if(this.infoform.auth != null){
                  this.isAuth = true;
                }
            })
        },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      gotoGate(){
        this.$router.push('/gate');
      },
      goEditname(){
        console.log("editname");
        this.editname = true;
      },
      SaveEditname(){
        this.infoform.username = this.newname;
        this.editname = false;
      },
      goEditemail(){
        this.emailright = false;
        this.editemail = true;
      },
      SaveEditemail(infoform_chan){
        console.log(this.emailright+" （emairight的值")
        console.log(this.infoform_chan.email+" （email的值")
        this.$refs[infoform_chan].validate(valid =>{
          if(valid){
            this.infoform.email = this.infoform_chan.email;
            console.log("现在的email：" + this.infoform.email)
            this.editemail = false;
          }
          else{
            this.$message.error("请输入正确的邮箱格式！");
          }
        })
        // if(this.emailright == true){
          
        // }
      
      },
      goEditpassword(){
        this.editpassword = true;
      },
      Savepassword(){
        console.log(this.newpassword);
        if(this.newpassword == ""){
          this.$message.error("密码不能为空！");
        }
        else{
          this.infoform.password = this.newpassword;
          this.editpassword = false;
          this.$http.patch({url:'/user',header:{token: window.sessionStorage.getItem('token')}}, {"password":this.newpassword}).then(res =>{ //更新数据
            console.log(res);
          })
        }
        
      
      }
    }
};
