<template>
  <div class="container">
    <Nav />

    <div class="menu_above">
      <div class="prompt">
        <span>共找到</span>
        <span id="result">{{ biblioItem.total }}</span>
        <span>个结果与 “</span>
        <span id="keyword">{{ biblioItem.total }}</span>
        <span>” 相关</span>
      </div>

      <div v-if="extraFound" class="extra_found_box">
        <div class="scholar_found">
          <span id="interact">您是否要寻找该学者？</span>

          <div class="searchpage scholar_info">
            <div id="avatar">
              <img
                src="../assets/img/scholar_avatar.jpg"
                alt="scholar_avatar"
              />
            </div>

            <div class="details">
              <span id="name">马保国</span>
              <div id="verified"></div>
              <span id="institution">混元形意太极门</span>
              <span id="subject">学科：掌门人</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="searchpage main_content">
      <div id="block"></div>

      <div v-if="isEnoughResult" class="filters">
        <el-collapse @change="handleChange">
          <el-collapse-item title="一致性 Consistency" name="1">
            <div>
              与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
            </div>
            <div>
              在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
            </div>
          </el-collapse-item>
          <el-collapse-item title="反馈 Feedback" name="2">
            <div>
              控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
            </div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>
          <el-collapse-item title="效率 Efficiency" name="3">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>
              清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
            </div>
            <div>
              帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
            </div>
          </el-collapse-item>
          <el-collapse-item title="可控 Controllability" name="4">
            <div>
              用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
            </div>
            <div>
              结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>

      <div class="searchpage achievements_box">
        <el-tabs v-model="achievementActiveType" @tab-click="handleClick">
          <el-tab-pane label="论文" name="first">
            <div
              class="achievements_item"
              v-for="item in biblioItem.item"
              :key="item.id"
            >
              <div class="item__above">
                <div id="title">
                  <span>[论文]</span>
                  <span>{{ item.title }}</span>
                </div>

                <div class="item__btns_area">
                  <button><svg-icon name="like"></svg-icon></button>
                  <button><svg-icon name="relative"></svg-icon></button>
                  <button><svg-icon name="share"></svg-icon></button>
                </div>
              </div>

              <div id="author">
                <span>{{ item.author }}</span>
              </div>

              <div id="summary">
                <button>摘要</button>
                <p>
                  {{ item.summary }}
                </p>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="专利" name="second"></el-tab-pane>
          <el-tab-pane label="科研项目" name="third"></el-tab-pane>
        </el-tabs>

        <div class="pageturn">
          <el-pagination layout="prev, pager, next" :total="1000">
          </el-pagination>
        </div>
      </div>
    </div>

    <div class="footer">
      <span>footer</span>
    </div>
  </div>
</template>

<script src="../assets/js/Search.js"></script>

<style scoped>
@import "../assets/css/global.css";
@import "../assets/css/search.css";
@import "../assets/css/achievements.css";
</style>
