<template>
  <el-container class="paperpage">
    <el-header>
      <Nav />
    </el-header>

    <el-main class="paperpage">
      <el-card class="detail_container">
        <div class="biblio_source">
          <el-tag>东岳论丛</el-tag>
          <el-tag type="success">平田一郎</el-tag>
          <el-tag type="info">江田岛</el-tag>
          <el-tag type="warning">听不见</el-tag>
          <el-tag type="danger">2020年11期</el-tag>
        </div>

        <div id="biblio_title">
          <h1>全球抗疫为推动构建人类命运共同体顺势塑局</h1>
        </div>

        <div class="author_info">
          <span id="author">平田一郎</span>
          <span id="institution">江田岛海军学院</span>
        </div>

        <div class="summary">
          <span>摘要:</span>
          <span id="text"
            >新冠肺炎疫情在全球的蔓延,再次证明了人类是一个休戚与共的命运共同体,昭示着人类命运共同体不仅是一种理念,更是一种实践。尽管目前还没有足够的客观条件推动人类命运共同体图景的完全实现,但全球抗疫为人类命运共同体明晰了构建框架。当前,全球抗疫可从主体、圈层、内容、路径等多个维度入手统筹设计:主体之维,要从人类命运共同体的主体到中介,协同构建;圈层之维,要从中华民族共同体到人类命运共同体,合力打造;内容之维,要从政治共同体到卫生健康共同体,全方位构建;路径之维,要从达成共识到保障机制,层层推进。</span
          >
        </div>

        <div class="keywords">
          <span>关键词:</span>
          <span id="text">人类命运共同体;实践进路;多维视角;</span>
        </div>

        <div class="biblio_doi">
          <span>DOI:</span>
          <span id="text">10.15981/j.cnki.dongyueluncong.2020.11.006</span>
        </div>

        <div>
          <span class="rowtit">专辑:</span>
          <span class="abstract-text">军事、海军、聋哑人关爱</span>
        </div>

        <div>
          <span class="rowtit">专题:</span>
          <span class="abstract-text">如何开军舰</span>
        </div>

        <div>
          <span class="rowtit">分类号:</span>
          <span class="abstract-text">DX139</span>
        </div>

        <el-divider></el-divider>

        <div class="paperpage btns_area">
          <el-button type="primary">收藏</el-button>
          <el-button type="success">引用</el-button>
          <el-button type="info">来源</el-button>
          <el-button type="primary">分享</el-button>
        </div>

        <el-divider></el-divider>

        <el-row>
          <h2 class="ref-paper">参考文献</h2>
          <li>森上下士</li>
          <li>森上下士</li>
          <li>森上下士</li>
          <li>森上下士</li>
          <li>森上下士</li>
        </el-row>
      </el-card>

      <el-card class="relative_container">
        <h2>相似文献</h2>
        <el-row>
          <el-col
            :span="4"
            v-for="(o, index) in 4"
            :key="o"
            :offset="index > 0 ? 2 : 0"
          >
            <el-card :body-style="{ padding: '0px' }">
              <img
                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                class="image"
              />
              <div style="padding: 14px">
                <span>好吃的汉堡</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </el-main>

    <el-footer>
      <div class="footer">
        <span>footer</span>
      </div>
    </el-footer>
  </el-container>
</template>

<script src="../assets/js/Paper.js"></script>

<style scoped>
@import "../assets/css/global.css";
@import "../assets/css/paper.css";
</style>
