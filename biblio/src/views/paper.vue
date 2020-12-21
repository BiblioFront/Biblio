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
            <el-tag>{{ paper.title }}</el-tag>
            <span>{{ paper.date }}</span>
          </div>

          <div class="biblio_title">
            <h1>
              {{ paper.title }}
            </h1>
          </div>

          <div class="author_info">
            <span id="author">{{ paper.author }}</span>
            <span id="organization">{{ paper.organization }}</span>
          </div>

          <div class="summary">
            <span id="item-title">摘要</span>
            <span id="text">{{ paper.summary }}</span>
          </div>

          <div class="other_info">
            <span id="item-title">关键词</span>
            <span id="text">{{ paper.keywords }}</span>
          </div>

          <div class="other_info">
            <span id="item-title">DOI</span>
            <span id="text">{{ paper.url }}</span>
          </div>

          <div class="bibliopage btns_area">
            <el-button @click="collect" v-if="!isFavorite"
              ><svg-icon name="like"></svg-icon>收藏</el-button
            >
            <el-button @click="discollect" v-else
              ><svg-icon name="like"></svg-icon>取消收藏</el-button
            >
            <el-button @click="reference"
              ><svg-icon name="quote"></svg-icon>引用</el-button
            >
            <el-button @click="source"
              ><svg-icon name="download"></svg-icon>来源</el-button
            >
            <el-button @click="error"
              ><svg-icon name="warning"></svg-icon>报错</el-button
            >
            <el-button @click="share"
              ><svg-icon name="share"></svg-icon>分享</el-button
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

      <div class="comments_container">
        <div class="comments_header">
          <h1>250</h1>
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
        <span>footer</span>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import Nav from "@/components/Nav.vue";

export default {
  name: "Paper",
  components: {
    Nav,
  },
  data: function() {
    return {
      id: "5fccd166376ae34bbb980c42",
      isFavorite: false,
      paper: {
        _id: "5fccd17b376ae34bbb980c49",
        author: "李树娟,钟焕荣,于亮,赵军,范伟检,黄伟",
        title: "危险化学品数据库的发展现状与展望",
        summary:
          "为完善我国危险化学品数据库,充分发挥其为化学品安全管理和公众提供可靠的信息服务的作用,通过研究国外危险化学品数据库的发展现状及其特点,分析我国危险化学品数据库目前存在的问题.研究表明:国外危险化学品数据库发展较完善,其数据结构设计较合理,且信息全面、数量多;而我国危险化学品数据库建设还比较落后,存在数据结构设计简单、标准不统一、信息未能共享等问题.因此,在发展我国危险化学品数据库时,应确保数据的数量、质量和多样性,设计合理的数据结构,并实现数据共享,使其为安全评价提供可靠的数据支持.",
        url:
          "http://d.wanfangdata.com.cn/periodical/ChlQZXJpb2RpY2FsQ0hJTmV3UzIwMjAxMjAzEhJoY2NsbGh5eXkyMDIwMDEwMzQaCHNneDVrbTNz",
        keywords: "危险化学品;数据库",
        date: "2020年12月30日",
        organization: "江田岛海军学院",
      },
      comments: [
        {
          commenterID: "",
          commenter: {
            username: "森上下士",
            avator: "",
          },
          paperID: "",
          content: "我是四年级学生森上下士",
          time: "2020年12月21日",
          id: "",
        },
      ],
      newComment: "",
    };
  },
  created: function() {
    console.log("created");
    console.log(this.id);
    console.log(window.localStorage.getItem("token"));
    var _this = this;
    this.$axios({
      method: "get",
      url: "/user/paper",
      params: {
        paperID: _this.id,
      },
      headers: {
        token: window.localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.data.msg == "get paper and comment successfully") {
          console.log("get success");
          // console.log(this.paper);
          this.paper = response.data.paper;
          this.comments = response.data.commentList;
          this.isFavorite = response.data.isFavorite;
          console.log(response.data.isFavorite);
        } else console.log(response.data.msg);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    handleCommand(command) {
      if (command == "info") {
        /* 跳转至对应用户信息页 */
        console.log("userinf");
        this.$router.push("/info");
      } else if (command == "letter") {
        /* 发送私信 */
        console.log("send letter");
      }
    },
    error: function() {
      console.log("报错");
    },
    collect: function() {
      console.log("收藏");
      var _this = this;
      this.$axios({
        method: "post",
        url: "/user/favorite",
        params: {
          // paperID: "5fcece9000f8a0090a697fdb",
          paperId: _this.id,
        },
        headers: {
          token: window.localStorage.getItem("token"),
        },
      })
        .then((response) => {
          console.log(response.data.msg);
          if (response.data.msg === "Collected successfully") {
            this.isFavorite = true;
          } else this.isFavorite = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    discollect: function() {
      console.log("取消收藏");
      this.$axios({
        method: "delete",
        url: "/user/favorite/delete",
        params: {
          paperId: this.id,
        },
        headers: {
          token: window.localStorage.getItem("token"),
        },
      })
        .then((response) => {
          console.log(response.data.msg);
          if (response.data.msg === "Delete successfully")
            this.isFavorite = false;
          else this.isFavorite = true;
        })
        .catch((error) => {
          console.log(error);
        })
        .then((response) => {
          console.log(response.msg);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    publish: function() {
      console.log("发布评论");
      console.log(this.newComment);
      if (this.newComment === "") return;
      this.$axios({
        method: "post",
        url: "/user/comment",
        params: {
          paperID: this.id,
        },
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          content: this.newComment,
        },
      })
        .then((response) => {
          console.log(response.data.msg);
          if (response.data.msg === "comment success") {
            this.comments.push(response.data.comment);
            this.newComment = "";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    reference: function() {
      console.log("引用");
    },
    source: function() {
      console.log("来源");
    },
    share: function() {
      console.log("分享");
    },
  },
};
</script>

<style scoped>
@import "../assets/css/global.css";
@import "../assets/css/biblio.css";
</style>
