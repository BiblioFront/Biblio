<template>
  <el-container style="height: 800px; border: 1px solid #eee">
    <el-aside style="width: 240px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>文章目录</span>
        </div>
        <div v-for="o in 4" :key="o" class="text item">这么小声还想开军舰</div>
      </el-card>
    </el-aside>
    <el-main>
      <el-row>
        <el-card>
          <el-row>
            <el-tag>东岳论丛</el-tag>
            <el-tag type="success">平田一郎</el-tag>
            <el-tag type="info">江田岛</el-tag>
            <el-tag type="warning">听不见</el-tag>
            <el-tag type="danger">2020年11期</el-tag>
          </el-row>

          <el-row>
            <span class="wx-tit"
              ><h1>全球抗疫为推动构建人类命运共同体顺势塑局</h1></span
            >
            <h3 class="author">平田一郎</h3>
            <h3 class="author">江田岛海军学院</h3>
          </el-row>

          <el-row >
              <div class="link">
              <el-col :span="2">
            <el-link href="https://element.eleme.io" target="_blank"
              >导出</el-link
            ></el-col>
            <el-col :span="2">
            <el-link type="primary">收藏</el-link></el-col>
            <el-col :span="2">
            <el-link type="success">分享</el-link></el-col>
            <el-col :span="2">
            <el-link type="info">打印</el-link></el-col>
            </div>
          </el-row>

          <el-row>
            <span class="rowtit">摘要:</span>
            <span class="abstract-text"
              >新冠肺炎疫情在全球的蔓延,再次证明了人类是一个休戚与共的命运共同体,昭示着人类命运共同体不仅是一种理念,更是一种实践。尽管目前还没有足够的客观条件推动人类命运共同体图景的完全实现,但全球抗疫为人类命运共同体明晰了构建框架。当前,全球抗疫可从主体、圈层、内容、路径等多个维度入手统筹设计:主体之维,要从人类命运共同体的主体到中介,协同构建;圈层之维,要从中华民族共同体到人类命运共同体,合力打造;内容之维,要从政治共同体到卫生健康共同体,全方位构建;路径之维,要从达成共识到保障机制,层层推进。</span
            >
          </el-row>

          <el-row>
            <span class="rowtit">关键词:</span>
            <span class="abstract-text">人类命运共同体;实践进路;多维视角;</span>
          </el-row>


          <el-row v-for="(o) in 100" :key="o"> 正文 </el-row>
        </el-card>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "PaperDetail",
  data: function () {
    return {};
  },
};
</script>

<style scoped>
.el-main {
  background-color: #e9eef3;
  line-height: 40px;
}

.catalog-list {
  padding: 0 5% 30px 8%;
  border-bottom: 1px solid #e2e2e2;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 240px;
}
.author {
  padding: 0;
  margin-right: 10px;
  line-height: 27px;
  text-align: center;
  font-size: 14px;
  font-weight: normal;
  text-emphasis-color: blue;
  color: blue;
}

.rowtit {
  display: inline-block;
  vertical-align: middle;
  padding-right: 5px;
  line-height: 26px;
  font-weight: bold;
}

.abstract-text {
  display: inline;
  color: #666;
  line-height: 26px;
  font-weight: normal;
  text-align: justify;
}
.wx-tit {
  text-align: center;
}

.ref-paper {
  padding-top: 20px;
  height: 32px;
  font-size: 18px;
  line-height: 32px;
  font-family: "Microsoft YaHei", "微软雅黑";
  color: #333;
  border-bottom: 2px solid #e3e3e3;
}

.ref-item {
  border-bottom: 1px solid #eee;
  text-align: left;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.link {
  position: relative;
  z-index: 2;
  float: none;
  width: 94%;
  margin-left: 30px;
  margin-top: 10px;
  line-height: 18px;
  text-align: right;
}
</style>