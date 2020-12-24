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
            <el-tag v-if="patentInfo.code">{{ patentInfo.code }}</el-tag>
            <span v-if="patentInfo.publicDate">{{
              patentInfo.publicDate
            }}</span>
          </div>

          <div class="biblio_title">
            <h1>
              {{ patentInfo.title }}
            </h1>
          </div>

          <div class="author_info">
            <span id="author" style="font-weight: bold;">{{
              patentInfo.desinger
            }}</span>
            <span id="author">{{ patentInfo.owner }}</span>
            <span id="agency">{{ patentInfo.agency }}</span>
          </div>

          <div class="summary" v-if="patentInfo.description">
            <span id="item-title">摘要</span>
            <span id="text">{{ patentInfo.summary }}</span>
          </div>
          <div class="summary" v-if="patentInfo.description">
            <span id="item-title">描述</span>
            <span id="text">{{ patentInfo.description }}</span>
          </div>

          <div class="other_info" v-if="patentInfo.type">
            <span id="item-title">类型</span>
            <span id="text">{{ patentInfo.type }}</span>
          </div>

          <div class="other_info" v-if="patentInfo.status">
            <span id="item-title">状态</span>
            <span id="text">{{ patentInfo.status }}</span>
          </div>

          <div class="bibliopage btns_area">
            <el-button
              ><svg-icon
                name="quote"
                @click="referenceVisible = true"
              ></svg-icon
              >引用</el-button
            >
            <el-button
              ><svg-icon name="warning" @click="errorVisible = true"></svg-icon
              >报错</el-button
            >
            <el-button
              ><svg-icon name="share" @click="shareVisible = true"></svg-icon
              >分享</el-button
            >
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
        <span
          >©2020 Biblio
          (京)-经营性-2017-0020京公网安备11000002000001号京ICP证030173号</span
        >
      </div>
    </el-footer>

    <el-dialog title="引用" :visible.sync="referenceVisible" width="50%">
      <span style="font-size: 14px; color: #c0c0c0;">复制以引用</span>
      <el-input
        placeholder="复制以引用"
        v-model="reference"
        style="margin-top: 10px;"
      ></el-input>
    </el-dialog>

    <el-dialog title="文献有误？" :visible.sync="errorVisible" width="50%">
      <span style="font-size: 14px; color: #555;"
        >请输入报错信息，以方便管理员进行审核</span
      >
      <el-input
        type="textarea"
        placeholder="报错信息"
        v-model="error"
        style="margin-top: 10px;"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="errorVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendErrorMsg">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="分享" :visible.sync="shareVisible" width="50%">
      <span style="font-size: 14px; color: #c0c0c0;"
        >复制并粘贴给你的好友吧！</span
      >
      <el-input v-model="share" style="margin-top: 10px;"></el-input>
    </el-dialog>
  </el-container>
</template>

<script src="../assets/js/Patent.js"></script>

<style scoped>
@import "../assets/css/global.css";
@import "../assets/css/biblio.css";
</style>
