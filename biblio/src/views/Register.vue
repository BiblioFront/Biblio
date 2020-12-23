<template>
  <div class="register-page">
    <div id="logo" class="cm-logo">
      <span @click="route2Home()">biblio</span>
    </div>

    <div class="register-container">
      <el-form :model="registerForm" :rules="fieldRules" ref="registerForm">
        <h2 class="reg-title"><b>注册</b></h2>

        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="registerForm.username"
            auto-complete="off"
            placeholder="用户名(用于登录)"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="registerForm.password"
            auto-complete="off"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            type="text"
            v-model="registerForm.email"
            auto-complete="off"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input
            type="email"
            v-model="registerForm.nickname"
            auto-complete="off"
            placeholder="昵称"
          ></el-input>
        </el-form-item>
        <el-form-item class="button-item" style="margin-bottom: 10px">
          <el-button type="primary" class="mainbtns" @click="reset"
            ><span>重 置</span></el-button
          >
          <el-button
            type="primary"
            class="mainbtns"
            @click="register('registerForm')"
            ><span>注 册</span></el-button
          >
        </el-form-item>
        <el-form-item class="register-item" style="margin: 0 0 0 2px;">
          <span style="color: #505458;margin-left: 238px">已有账号?</span>
          <router-link to="/login">
            <el-button id="loginbtn" type="text">去登录</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script src="../assets/js/Register.js"></script>

<style scoped>
@import "../assets/css/global.css";
@import "../assets/css/register.css";
</style>
