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
            <el-tag>{{patent.title}}</el-tag>
            <span>{{patent.publicDate}}</span>
          </div>

          <div class="biblio_title">
            <h1>
              {{patent.title}}
            </h1>
          </div>

          <div class="author_info">
            <span id="author" style="font-weight: bold;"
              >{{patent.desinger}}</span
            >
            <span id="author">{{patent.owner}}</span>
            <span id="agency">{{patent.agency}}</span>
          </div>

          <div class="summary">
            <span id="item-title">摘要</span>
            <span id="text"
              >{{patent.summary}}</span
            >
          </div>
          <div class="summary">
            <span id="item-title">描述</span>
            <span id="text"
              >{{patent.description}}</span
            >
          </div>

          <div class="other_info">
            <span id="item-title">类型</span>
            <span id="text">{{patent.type}}</span>
          </div>

          <div class="other_info">
            <span id="item-title">状态</span>
            <span id="text">{{patent.status}}</span>
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

<script>
import Nav from "@/components/Nav.vue";

export default {
  name:'Patent',
  components:{
    Nav
  },
  data:function(){
    return {
      id:"5fccd1a1376ae34bbb980c58",
      patent:{
        _id:"",
        title:"基于二维快速自旋回波的磁共振成像方法和装置",
        summary:"",
        type:"发明专利",
        patentID:'CN201811618720.9',
        applyDate:'西门子(深圳)磁共振有限公司',
        publishID:"CN111381204A",
        publicDate:"王玉宇,翁得河,周堃,张乐",
        mainTypeNumber:"G01R33/54(2006.01) G G01 G01R G01R33",
        typeNumber:"G01R33/54(2006.01), A61B5/055(2006.01), G01R33/54, A61B5/055",
        owner:"王玉宇,翁得河,周堃,张乐",
        desinger:"森上下士",
        address:"518057 广东省深圳市高新区中区高新中二道西门子磁共振园",
        agency:"",
        agent:"",
        code : '广东;44',
        description:"",
        status:"在审",
        read:0,
        change:false,
        sort:null
      }
    }
  },
  created:function(){
    var _this = this;
    this.$axios({
      method: "get",
      url: "/user/patent",
      params: {
        patentID: _this.id,
      },
      headers: {
        token: window.localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.data.patent !== undefined) {
          console.log("get success");
          _this.patent = response.data.patent;
        } else {
          console.log(response.data.msg);
          this.$message({
            message:"您所访问的专利不存在",
            type:"error"
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods:{
    
  }
}
</script>
<style scoped>
@import "../assets/css/global.css";
@import "../assets/css/biblio.css";
</style>
