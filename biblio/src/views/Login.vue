<template>
  <div class="login-page">
    <div id="logo" class="cm-logo">
      <span @click="route2Home()">biblio</span>
    </div>

    <div class="login-container">
      <el-form
        :model="loginForm"
        ref="loginForm"
        :rules="fieldRules"
        label-position="left"
        label-width="0px"
      >
        <h2 class="login-title"><b>登录</b></h2>
        <el-form-item prop="phone">
          <el-input
            type="text"
            v-model="loginForm.phone"
            auto-complete="off"
            placeholder="手机号/邮箱号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            auto-complete="off"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="button-item" style="margin-bottom: 10px">
          <el-button
            class="mainbtns"
            type="primary"
            @click.native.prevent="reset"
            >重 置</el-button
          >
          <el-button
            class="mainbtns"
            type="primary"
            @click.native.prevent="login('loginForm')"
            :loading="loading"
            >登 录</el-button
          >
        </el-form-item>
        <el-form-item class="register-item" style="margin: 0 0 0 2px;">
          <el-checkbox
            class="login_remember"
            v-model="checked"
            label-position="left"
            ><span>记住密码</span>
          </el-checkbox>
          <span style="color: #505458;margin-left: 130px">还没有账号?</span>
          <router-link to="/register">
            <el-button id="regbtn" type="text">立即注册</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script src="../assets/js/Login.js"></script>

<style scoped>
@import "../assets/css/global.css";
@import "../assets/css/login.css";
</style>
