<template>
  <div class="container">
    <Nav :notHomePage="0" />

    <div class="img_box">
      <div class="img__main_box">
        <div class="upper_slogen">
          THIS IS A SMALLER POSTER.
        </div>

        <div class="lower_slogen">
          this is a larger poster.
        </div>

        <div class="searchdiv">
          <div class="searchbar">
            <el-cascader
              class="search_options"
              v-model="value"
              :options="searchOptions"
              :props="{ expandTrigger: 'hover' }"
              :show-all-levels="false"
            ></el-cascader>

            <div id="option_text--divider"></div>

            <input
              class="search_text"
              type="text"
              v-model="searchInput"
              placeholder="输入搜索内容..."
            />

            <div class="search_btn">
              <button @click="route2Search()">
                <svg-icon name="search"></svg-icon>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="cutline2"></div>

      <div class="img__msg_box">
        <span id="title">已收录文献</span>
        <div id="statistic">
          <span id="high">146</span><span id="low">146</span>
        </div>
      </div>
    </div>

    <div class="homepage main_content">
      <div class="left_box">
        <div class="box_info">
          <span id="title">热门领域</span>
          <span id="degree">热度</span>
        </div>

        <div class="left_box__content">
          <div class="left_box__item">
            <span>1</span>
            <span>啊！海军</span>
            <span>300000000</span>
          </div>
          <div class="left_box__item">
            <span>2</span>
            <span>啊！海军</span>
            <span>0</span>
          </div>
          <div class="left_box__item">
            <span>3</span>
            <span>啊！海军</span>
            <span>30</span>
          </div>
          <div class="left_box__item">
            <span>4</span>
            <span>啊！海军</span>
            <span>300</span>
          </div>
          <div class="left_box__item">
            <span>5</span>
            <span>啊！海军</span>
            <span>3000</span>
          </div>
          <div class="left_box__item">
            <span>6</span>
            <span>啊！海军</span>
            <span>30000</span>
          </div>
          <div class="left_box__item">
            <span>7</span>
            <span>啊！海军</span>
            <span>3000000</span>
          </div>
          <div class="left_box__item">
            <span>8</span>
            <span>啊！海军</span>
            <span>30000000</span>
          </div>
          <div class="left_box__item">
            <span>9</span>
            <span>啊！海军</span>
            <span>300000000</span>
          </div>
          <div class="left_box__item">
            <span>10</span>
            <span>啊！海军</span>
            <span>3000W</span>
          </div>
        </div>
      </div>

      <div id="cutline3"></div>

      <div class="right_box">
        <div class="box_info">
          <span id="title">最新动态</span>
        </div>

        <div class="rigth_box__content">
          <div class="right_box__inner paper_box">
            <div class="inner_header">
              <span id="inner_title">期刊论文</span>
              <button class="more_btn">
                <svg-icon name="more"></svg-icon>
              </button>
            </div>

            <div class="inner_content">
              <div class="inner_item">
                <div id="linesign"></div>
                <span>啊！海军</span>
              </div>
              <div class="inner_item">
                <div id="linesign"></div>
                <span>啊！海军</span>
              </div>
              <div class="inner_item">
                <div id="linesign"></div>
                <span>啊！海军</span>
              </div>
              <div class="inner_item">
                <div id="linesign"></div>
                <span>啊！海军</span>
              </div>
            </div>
          </div>
          <div class="right_box__inner research_box">
            <div class="inner_header">
              <span id="inner_title">科研专利</span>
              <button class="more_btn">
                <svg-icon name="more"></svg-icon>
              </button>
            </div>
            <div class="inner_content">
              <div class="inner_item">
                <div id="linesign"></div>
                <span>啊！海军</span>
              </div>
              <div class="inner_item">
                <div id="linesign"></div>
                <span>啊！海军</span>
              </div>
              <div class="inner_item">
                <div id="linesign"></div>
                <span>啊！海军</span>
              </div>
              <div class="inner_item">
                <div id="linesign"></div>
                <span>啊！海军</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <span>footer</span>
    </div>
  </div>
</template>

<script src="../assets/js/Home.js"></script>

<style scoped>
@import "../assets/css/global.css";
@import "../assets/css/home.css";
.el-select-dropdown__item {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  font-weight: lighter !important;
  color: #707070 !important;
  letter-spacing: 2px;
}
</style>
