<template>
  <el-container class="bibliopage">
    <el-header>
      <Nav />
    </el-header>

    <el-main class="bibliopage">
      <div class="bibliopage_main">
        <div class="detail_container">
          <div class="biblio_source">
            <span>专利</span>
            <span>></span>
            <el-tag>这里是期刊名</el-tag>
            <span>xxxx年xx月xx日（线上发表日期）</span>
          </div>

          <div class="biblio_title">
            <h1>
              全球抗疫为推动构建人类命运共同体顺势塑局全球抗疫为推动构建人类命运共同体顺势塑局全球抗疫为推动构建
            </h1>
          </div>

          <div class="author_info">
            <span id="author" style="font-weight: bold;"
              >平田一郎（发明人）</span
            >
            <span id="author">平田一郎（代理人）</span>
            <span id="agency">江田岛海军学院</span>
          </div>

          <div class="summary">
            <span id="item-title">摘要</span>
            <span id="text"
              >新冠肺炎疫情在全球的蔓延,再次证明了人类是一个休戚与共的命运共同体,昭示着人类命运共同体不仅是一种理念,更是一种实践。尽管目前还没有足够的客观条件推动人类命运共同体图景的完全实现,但全球抗疫为人类命运共同体明晰了构建框架。当前,全球抗疫可从主体、圈层、内容、路径等多个维度入手统筹设计:主体之维,要从人类命运共同体的主体到中介,协同构建;圈层之维,要从中华民族共同体到人类命运共同体,合力打造;内容之维,要从政治共同体到卫生健康共同体,全方位构建;路径之维,要从达成共识到保障机制,层层推进。</span
            >
          </div>

          <div class="other_info">
            <span id="item-title">关键词</span>
            <span id="text">人类命运共同体;实践进路;多维视角;</span>
          </div>

          <div class="other_info">
            <span id="item-title">DOI</span>
            <span id="text">10.15981/j.cnki.dongyueluncong.2020.11.006</span>
          </div>

          <div class="bibliopage btns_area">
            <el-button><svg-icon name="like"></svg-icon>收藏</el-button>
            <el-button><svg-icon name="quote"></svg-icon>引用</el-button>
            <el-button><svg-icon name="download"></svg-icon>来源</el-button>
            <el-button><svg-icon name="warning"></svg-icon>报错</el-button>
            <el-button><svg-icon name="share"></svg-icon>分享</el-button>
          </div>
        </div>

        <el-divider></el-divider>

        <div class="relative_container">
          <h2>相似文献</h2>

          <div class="relative_content">
            <div class="relative_item">
              <div class="item__above">
                <div id="title">
                  <span>[论文]</span>
                  <span>闪电五连鞭</span>
                </div>

                <div class="item__btns_area">
                  <button><svg-icon name="like"></svg-icon></button>
                  <button><svg-icon name="relative"></svg-icon></button>
                  <button><svg-icon name="share"></svg-icon></button>
                </div>
              </div>

              <div id="summary">
                <p>
                  二战时期，二战时期，二战时期，二战时期，二战时期，二战时期，二战时期，二战时期，二战时期，二战时日本的军国主义海军非常强大，在当时盛极一时，昭和9年四月，江田岛海军兵学校将培育优秀的海军航空士官，这一批士官参加了袭击珍珠港的一批士官参加了袭击珍珠港的一批士官参加了袭击珍珠港的一批士官参加了袭击珍珠港的一批士官参加了袭击珍珠港的一批士官参加了袭击珍珠港的一批士官参加了袭击珍珠港的
                </p>
              </div>

              <div id="author">
                <span
                  >马保国1 马保国2 马保国3 马保国4 马保国5 马保国6
                  马保国6马保国6马保国6马保国6</span
                >
                <div id="time">
                  <span>发布时间：</span>
                  <span>xxxx年xx月xx日</span>
                </div>
              </div>
            </div>
          </div>

          <div class="relative_content">
            <div class="relative_item">
              <div class="item__above">
                <div id="title">
                  <span>[论文]</span>
                  <span>闪电五连鞭</span>
                </div>

                <div class="item__btns_area">
                  <button><svg-icon name="like"></svg-icon></button>
                  <button><svg-icon name="relative"></svg-icon></button>
                  <button><svg-icon name="share"></svg-icon></button>
                </div>
              </div>

              <div id="summary">
                <p>
                  二战时期，二战时期，二战时期，二战时期，二战时期，二战时期，二战时期，二战时期，二战时期，二战时日本的军国主义海军非常强大，在当时盛极一时，昭和9年四月，江田岛海军兵学校将培育优秀的海军航空士官，这一批士官参加了袭击珍珠港的一批士官参加了袭击珍珠港的一批士官参加了袭击珍珠港的一批士官参加了袭击珍珠港的一批士官参加了袭击珍珠港的一批士官参加了袭击珍珠港的一批士官参加了袭击珍珠港的
                </p>
              </div>

              <div id="author">
                <span
                  >马保国1 马保国2 马保国3 马保国4 马保国5 马保国6
                  马保国6马保国6马保国6马保国6</span
                >
                <div id="time">
                  <span>发布时间：</span>
                  <span>xxxx年xx月xx日</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-main>

    <el-footer>
      <div class="footer">
        <span>footer</span>
      </div>
    </el-footer>
  </el-container>
</template>

<script src="../assets/js/Patent.js"></script>

<style scoped>
@import "../assets/css/global.css";
@import "../assets/css/biblio.css";
</style>
