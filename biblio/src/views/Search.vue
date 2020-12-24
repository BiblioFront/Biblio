<template>
  <div class="container">
    <Nav />

    <div class="menu_above">
      <div class="prompt">
        <span>共找到</span>
        <span id="result">{{ resList.total }}</span>
        <span>个结果与 “</span>
        <span id="keyword">{{ this.$route.query.wd }}</span>
        <span>” 相关</span>
      </div>

      <div v-if="extraFound" class="extra_found_box">
        <div class="scholar_found">
          <span id="interact">您是否要寻找该学者？</span>

          <div
            class="searchpage scholar_info"
            @click="route2Gate(resList.scholarData.item[0]._id)"
          >
            <div id="avatar">
              <img
                src="../assets/img/scholar_avatar_default.jpg"
                alt="scholar_avatar"
              />
            </div>

            <div class="details">
              <span id="name">{{ resList.scholarData.item[0].name }}</span>
              <div
                id="verified"
                v-if="resList.scholarData.item[0].userID"
              ></div>
              <span
                id="institution"
                v-if="resList.scholarData.item[0].organization"
                >{{ resList.scholarData.item[0].organization }}</span
              >
              <span id="subject" v-if="resList.scholarData.item[0].sort">{{
                resList.scholarData.item[0].sort
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="searchpage main_content">
      <div id="block"></div>

      <el-radio-group
        v-if="isEnoughResult && notScholar"
        class="filters"
        v-model="category"
      >
        <el-radio-button
          v-for="item in filters"
          :label="item.sort"
          :key="item.sort"
          @click.native.prevent="categoryChange(item.sort)"
        >
          <span>{{ item.sort }}</span>
          <span>{{ item.count }}</span>
        </el-radio-button>
      </el-radio-group>

      <div class="searchpage achievements_box">
        <el-tabs v-model="achievementActiveType" @tab-click="handleClick">
          <el-tab-pane label="论文" name="paper" v-if="resList.hasPaper">
            <div
              class="achievements_item"
              v-for="item in resList.paperData.item"
              :key="item._id"
            >
              <div class="item__above">
                <div id="title" @click="route2Paper(item._id)">
                  <span>[论文]</span>
                  <span>{{ item.title }}</span>
                </div>

                <div class="item__btns_area">
                  <button @click="likeActivate">
                    <svg-icon name="like"></svg-icon>
                  </button>
                  <button @click="relativeActivate">
                    <svg-icon name="relative"></svg-icon>
                  </button>
                  <button @click="shareVisible = true">
                    <svg-icon name="share"></svg-icon>
                  </button>
                </div>
              </div>

              <div id="author">
                <span>{{ item.author }}</span>
              </div>

              <div id="summary">
                <p>
                  {{ item.summary }}
                </p>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="专利" name="patent" v-if="resList.hasPatent">
            <div
              class="achievements_item"
              v-for="item in resList.patentData.item"
              :key="item.id"
            >
              <div class="item__above" @click="route2Patent(item._id)">
                <div id="title">
                  <span>[专利]</span>
                  <span>{{ item.title }}</span>
                </div>

                <div class="item__btns_area">
                  <button><svg-icon name="like"></svg-icon></button>
                  <button><svg-icon name="relative"></svg-icon></button>
                  <button><svg-icon name="share"></svg-icon></button>
                </div>
              </div>

              <div id="author">
                <span>{{ item.owner }}</span>
              </div>

              <div id="summary">
                <p>
                  {{ item.summary }}
                </p>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane
            label="科研项目"
            name="project"
            v-if="resList.hasProject"
          >
            <div
              class="achievements_item"
              v-for="item in resList.projectData.item"
              :key="item._id"
            >
              <div class="item__above">
                <div id="title" @click="route2Project(item._id)">
                  <span>[科研项目]</span>
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
                <p>
                  {{ item.summary }}
                </p>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="学者" name="scholar" v-if="resList.hasScholar">
            <div
              class="achievements_item scholar_info"
              v-for="item in resList.scholarData.item"
              :key="item._id"
              @click="route2Gate(item._id)"
            >
              <div id="avatar">
                <img
                  src="../assets/img/scholar_avatar_default.jpg"
                  alt="scholar_avatar"
                />
              </div>

              <div class="details">
                <span id="name">{{ item.name }}</span>
                <div id="verified" v-if="item.userID"></div>
                <p id="institution" v-if="item.organization">
                  {{ item.organization }}
                </p>
                <p id="subject" v-if="item.sort">{{ item.sort }}</p>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>

        <div class="pageturn" v-if="pagesTotal > 1">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="pagesTotal * 20"
            :pager-count="11"
            :page-size="20"
            :current-page="currentPage"
            @current-change="pageTurn"
          >
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
