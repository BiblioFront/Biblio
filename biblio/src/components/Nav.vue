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

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  methods: {
    route2Home() {
      this.$router.push({ path: "/" });
    },
    route2Gate() {
      this.$router.push({ path: "/gate" });
    },
  },
})
export default class Nav extends Vue {}
</script>

<style>
@import "../assets/css/global.css";
@import "../assets/css/navbar.css";
</style>
