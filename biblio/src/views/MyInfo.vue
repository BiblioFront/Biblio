<template>
    <div class="info">
        <Nav />
        <div class="info-head">
          
            <el-card class="info-box-card">

              <el-row>
                <el-col :span="12">
                  <h2 style="color:purple; margin-bottom:25px">用户信息</h2>
                </el-col>

                <el-col :span="12">
                   <el-button round style="float:right; margin-right:10px;  color:#964BB2; border-color:#964BB2" icon="el-icon-s-shop" v-if="isAuth">个人门户</el-button>
                </el-col>
              </el-row>

              
              <el-row>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <div class="info-avatar">
                      <img src="../assets/img/scholar_avatar.jpg" alt="" />
                    </div>
                    <div class="tab-info">
                      
                          <span id="name">马保国</span>
                          <div id="verified"></div>
                          <span id="institution">混元形意太极门</span>
                          <div id="verified"></div>
                          <span id="info">年轻人要讲武德，不要搞小聪明</span>
                      
                    </div>
                  </div>
                  
                </el-col>
                <el-col :span="1">
                  <div class="grid-content bg-purple-light">
                    <el-divider direction="vertical" style="margin-left:40px; height:50px"></el-divider>
                  </div>
                </el-col>
                <el-col :span="15">
                  <div class="grid-content bg-purple-light">
                    <el-form ref="infoform" :model="infoform" :rules="rules" label-width="80px" style="width:90%;margin-left:10%">
                      
                      <el-form-item label="用户名" style="" prop="username">
                          <el-col :span="12">
                            <el-input prefix-icon="el-icon-user" v-model="infoform.username"></el-input>
                          </el-col>
                          <el-col :span="3">
                            <el-button type="text" style="margin-left: 30px">修改</el-button>
                          </el-col>
                      </el-form-item>
                      

                      <el-form-item label="用户邮箱" style="" prop="email">
                        <el-col :span="12">
                            <el-input prefix-icon="el-icon-message" v-model="infoform.email"></el-input>
                          </el-col>
                          <el-col :span="3">
                            <el-button type="text" style="margin-left: 30px">修改</el-button>
                          </el-col>
                      </el-form-item>

                      <el-form-item label="用户密码" style="" prop="password">
                        <el-col :span="12">
                            <el-input prefix-icon="el-icon-lock" v-model="infoform.password"></el-input>
                          </el-col>
                          <el-col :span="3">
                            <el-button type="text" style="margin-left: 30px">修改</el-button>
                          </el-col>
                      </el-form-item>

                    </el-form>
                  </div>
                  </el-col>
              </el-row>
                
                
                
                
                
            </el-card>
        </div>
    </div>
</template>

<script>
import Nav from "@/components/Nav.vue";

export default {
  name: "MyInfo",
  components: {
    Nav,
  },
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
          username:'',
          password:'',
          email: '',
          nickname: '',
          avator: '',
          auth: '',
          admin: false,
          token:'',
        },
        isAuth:true,
        rules: {
            // email: [
            //     { required: true, validator: checkEmail, trigger: 'blur' }
            // ],
        },
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/css/Myinfo.css";

.user_info {
    width: 100%;
    height: 105px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    margin-top: 10px;
  }

   .user_info span {
    width: 400px;
    height: 20px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    text-align: center;
    color: rgba(85, 85, 85, 1);
  }

  .info-box-card{
      width: 60%;
      margin-top:5%;
  }

  /* .tab-info{
    color: #333;
    font-weight: bold;
    margin-left: 95px;
    margin-top:10px;
  } */

  .el-divider--vertical{
    height: 180px;
  }

  

</style>

