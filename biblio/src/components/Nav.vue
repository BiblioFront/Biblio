<template>
  <div class="navbar">
    <div id="logo" @click="route2Home()">
      <span>logo&name</span>
    </div>
    <div class="btns_area">
      <div v-if="1">
        <span>欢迎</span>
        <button>个人</button>
        <button @click="route2Gate()">机构</button>
      </div>
      <div v-else>
        <button>登录</button>
        <button>注册</button>
      </div>
    </div>
  </div>
</template>

<script src="../assets/js/Nav.js"></script>

<style>
@import "../assets/css/global.css";
@import "../assets/css/navbar.css";
</style>
