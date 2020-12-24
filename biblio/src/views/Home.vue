<template>
  <div class="container">
    <Nav :notHomePage="0" />

    <div class="img_box">
      <div class="img__main_box">
        <div class="upper_slogen">
          {{ slogen.upper }}
        </div>

        <div class="lower_slogen">
          {{ slogen.lower }}
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

          <div id="cutline1"></div>

          <button id="advanced_search" @click="advancedSearchBox = true">
            高级搜索
          </button>
        </div>
      </div>

      <div id="cutline2"></div>

      <div class="img__msg_box">
        <span id="title">已收录文献</span>
        <div id="statistic">
          <span id="high">291</span><span id="low">901</span>
        </div>
      </div>
    </div>

    <div class="homepage main_content">
      <div class="left_box">
        <div class="box_info">
          <span id="title">热门文献</span>
          <span id="degree">热度</span>
        </div>

        <div class="left_box__content">
          <div
            class="left_box__item"
            v-for="(item, index) in hotspot.paper"
            :key="item._id"
            @click="route2Paper(item._id)"
          >
            <div id="number">
              <span>{{ index + 1 }}</span>
              <svg-icon name="hexagon"></svg-icon>
            </div>

            <div class="left_box__item--main">
              <span>{{ item.title }}</span>
              <span>{{ item.author }}</span>
            </div>

            <span id="read">{{ item.read }}</span>
          </div>
        </div>
      </div>

      <div id="cutline3"></div>

      <div class="right_box">
        <div class="box_info">
          <span id="title">热门领域</span>
        </div>

        <div class="rigth_box__content">
          <div
            class="right_box__item"
            v-for="item in hotspot.hotfield"
            :key="item.id"
          >
            <span>{{ item.name }}</span>
            <span>{{ item.heat }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <span>footer</span>
    </div>

    <el-dialog
      title="高级搜索"
      :visible.sync="advancedSearchBox"
      width="600px"
      class="advanced_search-box"
    >
      <el-form
        label-width="80px"
        :rules="advancedSearchInputRules"
        :model="advancedSearchInput"
      >
        <el-form-item label="搜索范围">
          <el-select
            v-model="advancedSearchSelectValue"
            placeholder="学术成果类型"
          >
            <el-option label="论文" value="paper"></el-option>
            <el-option label="专利" value="patent"></el-option>
            <el-option label="科研项目" value="project"></el-option>
          </el-select>
        </el-form-item>

        <el-form
          label-width="80px"
          :model="advancedSearchInput"
          :rules="advancedSearchInputRules"
          v-if="advancedSearchSelectValue == 'paper'"
        >
          <el-form
            label-width="80px"
            :inline="true"
            :model="advancedSearchInput"
          >
            <el-form-item label="标题">
              <el-input
                v-model="advancedSearchInput.paper.title"
                style="width:200px"
                placeholder="标题"
              ></el-input>
            </el-form-item>

            <el-form-item label-width="40px" label="作者">
              <el-input
                v-model="advancedSearchInput.paper.author"
                style="width:200px"
                placeholder="作者"
              ></el-input>
            </el-form-item>
          </el-form>

          <el-form
            label-width="80px"
            :inline="false"
            :rules="advancedSearchInputRules"
            :model="advancedSearchInput"
          >
            <el-form-item label="期刊名">
              <el-input
                v-model="advancedSearchInput.paper.journal"
                style="width:450px"
                placeholder="期刊名"
              ></el-input>
            </el-form-item>

            <el-form
              label-width="80px"
              :inline="true"
              status-icon=""
              :rules="advancedSearchInputRules"
              :model="advancedSearchInput"
            >
              <el-form-item label="发布年份" prop="time">
                <el-input
                  v-model.number="advancedSearchInput.paper.date.lower"
                  style="width:100px"
                  placeholder="下限"
                ></el-input>
              </el-form-item>

              <el-form-item label="" prop="time">
                <el-input
                  v-model.number="advancedSearchInput.paper.date.upper"
                  style="width:100px"
                  placeholder="上限"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-form>

          <el-form-item label="关键词">
            <el-input
              v-model="advancedSearchInput.paper.keywords"
              style="width:450px"
              placeholder="关键词"
            ></el-input>
          </el-form-item>
        </el-form>

        <el-form
          label-width="80px"
          :model="advancedSearchInput"
          v-if="advancedSearchSelectValue == 'patent'"
        >
          <el-form-item label-width="80px" label="标题">
            <el-input
              v-model="advancedSearchInput.patent.title"
              style="width:450px"
              placeholder="标题"
            ></el-input>
          </el-form-item>

          <el-form :inline="true" :model="advancedSearchInput">
            <el-form-item label-width="80px" label="设计者">
              <el-input
                v-model="advancedSearchInput.patent.designer"
                style="width:190px"
                placeholder="发明人"
              ></el-input>
            </el-form-item>
            <el-form-item label-width="60px" label="持有人">
              <el-input
                v-model="advancedSearchInput.patent.owner"
                style="width:190px"
                placeholder="持有人"
              ></el-input>
            </el-form-item>
          </el-form>

          <el-form
            label-width="80px"
            :inline="true"
            :model="advancedSearchInput"
          >
            <el-form-item label="申请年份">
              <el-input
                v-model="advancedSearchInput.patent.applyDate.lower"
                style="width:100px"
                placeholder="下限"
              ></el-input>
            </el-form-item>

            <el-form-item label="">
              <el-input
                v-model="advancedSearchInput.patent.applyDate.upper"
                style="width:100px"
                placeholder="上限"
              ></el-input>
            </el-form-item>
          </el-form>

          <el-form
            label-width="80px"
            :inline="true"
            :model="advancedSearchInput"
          >
            <el-form-item label="公开年份">
              <el-input
                v-model="advancedSearchInput.patent.publicDate.lower"
                style="width:100px"
                placeholder="下限"
              ></el-input>
            </el-form-item>

            <el-form-item label="">
              <el-input
                v-model="advancedSearchInput.patent.publicDate.upper"
                style="width:100px"
                placeholder="上限"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-form>

        <el-form
          label-width="80px"
          :model="advancedSearchInput"
          v-if="advancedSearchSelectValue == 'project'"
        >
          <el-form
            label-width="80px"
            :inline="true"
            :model="advancedSearchInput"
          >
            <el-form-item label="标题">
              <el-input
                v-model="advancedSearchInput.project.title"
                style="width:200px"
                placeholder="标题"
              ></el-input>
            </el-form-item>
            <el-form-item label-width="40px" label="作者">
              <el-input
                v-model="advancedSearchInput.project.author"
                style="width:200px"
                placeholder="作者"
              ></el-input>
            </el-form-item>
          </el-form>

          <el-form-item label="工作单位">
            <el-input
              v-model="advancedSearchInput.project.company"
              style="width:450px"
              placeholder="工作单位"
            ></el-input>
          </el-form-item>

          <el-form-item label="关键词">
            <el-input
              v-model="advancedSearchInput.project.keywords"
              style="width:450px"
              placeholder="关键词"
            ></el-input>
          </el-form-item>

          <el-form
            label-width="80px"
            :inline="true"
            :model="advancedSearchInput"
          >
            <el-form-item label="立项年份">
              <el-input
                v-model="advancedSearchInput.project.year.lower"
                style="width:100px"
                placeholder="下限"
              ></el-input>
            </el-form-item>

            <el-form-item label="">
              <el-input
                v-model="advancedSearchInput.project.year.upper"
                style="width:100px"
                placeholder="上限"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-form>

        <el-form-item>
          <el-button @click="advancedSearchBox = false">取 消</el-button>
          <el-button @click="resetAS">重 置</el-button>
          <el-button type="primary" @click="bootAS">搜 索</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
