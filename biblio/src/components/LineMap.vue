<template>
  <div class="frame">
    <p class="background">文献统计</p>
    <div ref="linemap" :id="id" :class="className"></div>
  </div>
</template>

<script src="../assets/js/LineMap.js"></script>

<style scoped>
.frame {
  width: 48%;
  height: 180px;
  background-color: #6d11b8;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16) inset;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s ease-in-out;
  -webkit-transition: 0.4s ease-in-out;
  -moz-transition: 0.4s ease-in-out;
}
.frame:hover {
  border-radius: 5px;
  background-color: #9234df;
  box-shadow: 0px 3px 6px #a248eb inset, 0px 3px 10px #50505075;
  transition: 0.2s ease-in-out;
  -webkit-transition: 0.2s ease-in-out;
  -moz-transition: 0.2s ease-in-out;
}
.background {
  width: 400px;
  height: 180px;
  position: absolute;
  font-size: 90px;
  line-height: 170px;
  text-align: center;
  letter-spacing: 10px;
  color: #fff;
  opacity: 0.1;
  user-select: none;
}
#linemap {
  width: 100%;
  height: 100%;
}
</style>
