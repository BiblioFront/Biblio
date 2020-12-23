<template>
  <div class="frame">
    <div
      ref="circleProgressbar"
      :id="id"
      :class="className"
      :progress="progress"
    ></div>
    <div id="circle-background--outside">
      <div id="circle-background--inner"></div>
    </div>
  </div>
</template>
<script src="../assets/js/CircleProgressbar.js"></script>

<style scoped>
.frame,
#circleProgressbar {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  position: relative;
  z-index: 3;
}
#circle-background--outside {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #f0f0f0;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16) inset;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
#circle-background--inner {
  width: 70%;
  height: 70%;
  border-radius: 50%;
  background-color: #fff;
  z-index: 1;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}
</style>
