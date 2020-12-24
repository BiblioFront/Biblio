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
            <el-button
              class="gatebtn"
              icon="el-icon-s-shop"
              v-if="userInfo.auth"
              @click="route2Gate()"
              >个人门户</el-button
            >
          </el-col>
        </el-row>

        <div class="info--main-content">
          <div class="info-table">
            <el-upload
              action="/user"
              name="avatar"
              style="width: 100px; height: 100px"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :http-request="uploadAvatar"
              :before-upload="beforeAvatarUpload"
              accept="image/*"
            >
              <div v-if="!userInfo.avatar" class="info-avatar">暂无</div>
              <el-image
                v-if="userInfo.avatar"
                style="width: 100px; height: 100px; border-radius: 50%;"
                :src="userInfo.avatar"
                class="avatar"
              ></el-image>
            </el-upload>
            <span id="avatar_tip">点击修改头像</span>
          </div>

          <el-divider direction="vertical" style="height:200px;"></el-divider>

          <el-form
            ref="userInfo"
            :model="userInfo"
            :rules="rules"
            label-width="80px"
            style="width:60%;margin-left:2vw;"
          >
            <el-form-item label="昵称" style="" prop="username">
              <el-col :span="18">
                <el-input
                  prefix-icon="el-icon-user"
                  v-model="userInfo.username"
                  :disabled="true"
                ></el-input>
              </el-col>
              <el-col :span="6">
                <el-button
                  type="text"
                  style="margin-left: 30px"
                  @click="goEditname()"
                  >修改</el-button
                >
              </el-col>
            </el-form-item>

            <el-form-item label="用户邮箱" style="" prop="email">
              <el-col :span="18">
                <el-input
                  prefix-icon="el-icon-message"
                  v-model="userInfo.email"
                  :disabled="true"
                ></el-input>
              </el-col>
              <el-col :span="6">
                <el-button
                  type="text"
                  style="margin-left: 30px"
                  @click="goEditemail()"
                  >修改</el-button
                >
              </el-col>
            </el-form-item>

            <el-form-item label="用户密码" style="" prop="password">
              <el-col :span="18">
                <el-input
                  prefix-icon="el-icon-lock"
                  v-model="userInfo.password"
                  :disabled="true"
                  type="password"
                ></el-input>
              </el-col>
              <el-col :span="6">
                <el-button
                  type="text"
                  style="margin-left: 30px"
                  @click="goEditpassword()"
                  >修改</el-button
                >
              </el-col>
            </el-form-item>
          </el-form>

          <el-dialog title="修改用户名" :visible.sync="editname">
            <el-form :model="userInfo">
              <el-form-item label="新昵称" style="margin-left:30px">
                <el-input
                  v-model="newname"
                  autocomplete="off"
                  style="width:400px"
                  placeholder="请输入新昵称"
                ></el-input>
                <el-button style="margin-left:30px" @click="SaveEditname()"
                  >保存修改</el-button
                >
              </el-form-item>
            </el-form>
          </el-dialog>

          <el-dialog title="修改邮箱" :visible.sync="editemail">
            <el-form ref="userInfo_chan" :model="userInfo_chan" :rules="rules">
              <el-form-item
                label="输入新邮箱"
                style="margin-left:30px"
                prop="email"
              >
                <el-input
                  v-model="userInfo_chan.email"
                  autocomplete="off"
                  style="width:280px"
                  placeholder="请输入新邮箱"
                ></el-input>
                <el-button
                  style="margin-left:30px"
                  @click="SaveEditemail('userInfo_chan')"
                  size="medium"
                  >保存修改</el-button
                >
              </el-form-item>
            </el-form>
          </el-dialog>

          <el-dialog title="修改密码" :visible.sync="editpassword">
            <el-form ref="userInfo" :model="userInfo">
              <el-form-item label="输入原密码" style="margin-left:30px">
                <el-input
                  v-model="oldpassword"
                  autocomplete="off"
                  style="width:400px"
                  placeholder="请输入新密码"
                  show-password
                ></el-input>
              </el-form-item>
              <el-form-item label="输入新密码" style="margin-left:30px">
                <el-input
                  v-model="newpassword"
                  autocomplete="off"
                  style="width:400px"
                  placeholder="请输入新密码"
                  show-password
                ></el-input>
                <el-button style="margin-left:30px" @click="Savepassword()"
                  >保存修改</el-button
                >
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script src="../assets/js/Myinfo.js"></script>

<style scoped>
@import "../assets/css/global.css";
@import "../assets/css/myinfo.css";
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
