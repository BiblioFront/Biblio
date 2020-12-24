<template>
  <el-container class="bibliopage">
    <el-header>
      <Nav />
    </el-header>

    <el-main class="bibliopage">
      <div class="bibliopage_main">
        <div class="detail_container">
          <div class="biblio_source">
            <span>论文</span>
            <span>></span>
            <el-tag v-if="paperInfo.journal"
              >《{{ paperInfo.journal }}》</el-tag
            >
            <span v-if="paperInfo.date">{{ paperInfo.date }}</span>
          </div>

          <div class="biblio_title">
            <h1>
              {{ paperInfo.title }}
            </h1>
          </div>

          <div class="author_info">
            <span id="author">{{ paperInfo.author }}</span>
            <span id="organization">{{ paperInfo.organization }}</span>
          </div>

          <div class="summary" v-if="paperInfo.summary">
            <span id="item-title">摘要</span>
            <span id="text">{{ paperInfo.summary }}</span>
          </div>

          <div class="other_info" v-if="paperInfo.keywords">
            <span id="item-title">关键词</span>
            <span id="text">{{ paperInfo.keywords }}</span>
          </div>

          <div class="other_info" v-if="paperInfo.doi">
            <span id="item-title">DOI</span>
            <span id="text">{{ paperInfo.doi }}</span>
          </div>

          <div class="bibliopage btns_area">
            <el-button @click="collect" v-if="!isFavorite"
              ><svg-icon name="like"></svg-icon>收藏</el-button
            >
            <el-button @click="discollect" v-else
              ><svg-icon name="like"></svg-icon>取消收藏</el-button
            >
            <el-button @click="referenceVisible = true"
              ><svg-icon name="quote"></svg-icon>引用</el-button
            >
            <el-button @click="source"
              ><svg-icon name="download"></svg-icon>来源</el-button
            >
            <el-button @click="errorVisible = true"
              ><svg-icon name="warning"></svg-icon>报错</el-button
            >
            <el-button @click="shareVisible = true"
              ><svg-icon name="share"></svg-icon>分享</el-button
            >
          </div>
        </div>

        <el-divider></el-divider>

        <div class="relative_container">
          <h2>相似文献</h2>

          <div class="relative_content" v-loading="loading">
            <div
              class="relative_item"
              v-for="item in relativeList"
              :key="item._id"
            >
              <div class="item__above">
                <div id="title" @click="route2Paper(item)">
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
                <span>{{ item.journal }}</span>
                <span v-if="item.read">{{ item.read }}阅读</span>
                <span v-if="item.like">{{ item.like }}收藏</span>
              </div>

              <div id="summary">
                <p>{{ item.summary }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="comments_container">
        <div class="comments_header">
          <h1>{{ comments.length }}</h1>
          <h1>评论</h1>
        </div>

        <el-divider></el-divider>

        <div class="comments_main">
          <div class="comments_send">
            <el-avatar :size="40">me</el-avatar>
            <div class="textarea_container">
              <textarea name="comment" v-model="newComment"></textarea>
              <button type="submit" class="comments_submit" @click="publish">
                发表评论
              </button>
            </div>
          </div>

          <div class="comments_content">
            <div
              class="comments_item"
              v-for="comment in comments"
              :key="comment.id"
            >
              <el-dropdown @command="handleCommand" :hide-on-click="false">
                <span class="el-dropdown-link">
                  <el-avatar :size="40"
                    ><img :src="comment.commenter.avator"
                  /></el-avatar>
                </span>
                <el-dropdown-menu class="from_user" slot="dropdown">
                  <el-dropdown-item disabled>{{
                    comment.commenter.username
                  }}</el-dropdown-item>
                  <el-dropdown-item command="info" divided
                    ><svg-icon name="user"></svg-icon>用户信息</el-dropdown-item
                  >
                  <el-dropdown-item command="letter"
                    ><svg-icon name="promotion"></svg-icon
                    >私信</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>

              <div class="text_container">
                <p class="text_content">
                  {{ comment.content }}
                </p>

                <p class="comment_time">{{ comment.time }}</p>
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

<script src="../assets/js/Paper.js"></script>

<style scoped>
@import "../assets/css/global.css";
@import "../assets/css/biblio.css";
</style>
