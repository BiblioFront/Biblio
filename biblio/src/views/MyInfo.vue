<template>
  <div>
    <Nav />

    <div class="info-container">
      <el-card class="info-box-card">
        <el-row>
          <el-col :span="12">
            <h2 style="color:purple;margin-bottom:25px">用户信息</h2>
          </el-col>

          <el-col :span="12">
            <el-button class="gatebtn" icon="el-icon-s-shop" v-if="isAuth" @click="gotoGate()"
              >个人门户</el-button
            >
          </el-col>
        </el-row>

        <div class="info--main-content">
          <div class="info-table">
            <div class="info-avatar">
              <img src="../assets/img/scholar_avatar.jpg" alt="" />
            </div>
            <span id="avatar_tip">点击修改头像</span>
            <span id="name">马保国</span>
          </div>

          <el-divider direction="vertical" style="height:200px;"></el-divider>

          <el-form
            ref="infoform"
            :model="infoform"
            :rules="rules"
            label-width="80px"
            style="width:60%;margin-left:2vw;"
          >
            <el-form-item label="用户名" style="" prop="username">
              <el-col :span="18">
                <el-input
                  prefix-icon="el-icon-user"
                  v-model="infoform.username" :disabled="true"
                ></el-input>
              </el-col>
              <el-col :span="6">
                <el-button type="text" style="margin-left: 30px" @click="goEditname()"
                  >修改</el-button>
              </el-col>
            </el-form-item>

            <el-form-item label="用户邮箱" style="" prop="email">
              <el-col :span="18">
                <el-input
                  prefix-icon="el-icon-message"
                  v-model="infoform.email" :disabled="true"
                ></el-input>
              </el-col>
              <el-col :span="6">
                <el-button type="text" style="margin-left: 30px" @click="goEditemail()"
                  >修改</el-button
                >
              </el-col>
            </el-form-item>

            <el-form-item label="用户密码" style="" prop="password">
              <el-col :span="18">
                <el-input
                  prefix-icon="el-icon-lock"
                  v-model="infoform.password" :disabled="true" type="password"
                ></el-input>
              </el-col>
              <el-col :span="6">
                <el-button type="text" style="margin-left: 30px" @click="goEditpassword()"
                  >修改</el-button
                >
              </el-col>
            </el-form-item>
          </el-form>


          <el-dialog title="修改用户名" :visible.sync="editname">
            <el-form :model="infoform" >
              <el-form-item label="新昵称" style="margin-left:30px" >
                <el-input v-model="newname" autocomplete="off" style="width:400px" placeholder="请输入新昵称"></el-input>
                <el-button style="margin-left:30px" @click="SaveEditname()">保存修改</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>

          <el-dialog title="修改邮箱" :visible.sync="editemail" >
            <el-form ref="infoform_chan" :model="infoform_chan" :rules="rules">
              <el-form-item label="输入新邮箱" style="margin-left:30px" prop="email">
                <el-input v-model="infoform_chan.email" autocomplete="off" style="width:280px" placeholder="请输入新邮箱"></el-input>
                <el-button style="margin-left:30px" @click="SaveEditemail('infoform_chan')" size="medium" >保存修改</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>

          <el-dialog title="修改密码" :visible.sync="editpassword" >
            <el-form ref="infoform" :model="infoform" >
              <el-form-item label="输入新密码" style="margin-left:30px">
                <el-input v-model="newpassword" autocomplete="off" style="width:400px" placeholder="请输入新密码" show-password></el-input>
                <el-button style="margin-left:30px" @click="Savepassword()">保存修改</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>

        </div>
      </el-card>
    </div>
  </div>
</template>

<script type="text/javascript" src="../assets/js/Myinfo.js">
</script>

<style scoped>
@import "../assets/css/global.css";
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
.el-divider--vertical {
  height: 180px;
}
</style>
