<template>
  <el-container class="bibliopage">
    <el-header>
      <Nav />
    </el-header>

    <el-main class="bibliopage">
      <div class="bibliopage_main">
        <div class="detail_container">
          <div class="biblio_source">
            <span>科研项目</span>
            <span>></span>
            <el-tag>{{ project.title }}</el-tag>
            <span>立项于{{ project.year }}年</span>
          </div>

          <div class="biblio_title">
            <h1>
              {{ project.title }}
            </h1>
          </div>

          <div class="author_info">
            <span id="author">{{ project.author }}</span>
            <span id="company">{{ project.company }}</span>
          </div>

          <div class="summary">
            <span id="item-title">摘要</span>
            <span id="text">{{ project.summary }}</span>
          </div>

          <div class="other_info">
            <span id="item-title">关键词</span>
            <span id="text">{{ project.keywords }}</span>
          </div>

          <div class="other_info">
            <span id="item-title">公开范围</span>
            <span id="text">{{ project.scope }}</span>
          </div>

          <div class="other_info">
            <span id="item-title">所属计划</span>
            <span id="text">{{ project.plan }}</span>
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
          <h2>相似科研项目</h2>

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
  </el-container>
</template>

<script>
import Nav from "@/components/Nav.vue";

export default {
  name: "Project",
  components: {
    Nav,
  },
  data: function() {
    return {
      id: "5fccd1cf376ae34bbb980c74",
      project: {
        _id: "",
        author: "王修田,李金山,夏冬明,姜秀萍",
        title: "基于模型的地震并行与交互处理技术研究最终报告",
        summary:
          "本研究以射线理论、波动理论以及绕射理论为基础，以正反演实时检验分析为工具，重点研发了炮集域海水鸣震等强规则干扰波的压制技术、炮集域叠前偏移速度分析技术、地震波速反演技术、地震模型建立技术、炮集域叠前时间/深度偏移技术、成像道集生成与后处理技术、多次波的模拟检验与剔除技术、多次波的多域联合压制技术、地震同相轴多域检测技术以及各种相关的并行与交互处理技术，形成了一套具有自主知识产权的“基于模型的地震勘探数据处理系统（Model Based Processing，简称MBP）V2.0”。 MBP V2.0系统集交互与并行运算于一体，可同时在混合操作系统（Unix和Linux）、不同CPU架构的微机群、工作站/服务器等集群环境下运行。该系统现已含有150余个主要功能模块组合，其中Basic Processing应用板块主要包含：观测系统的定义，SEGY-MBP数据格式转换，炮集记录的重抽样、嵌入、相对振幅控制、炮（道）能量均衡，炮集记录的频谱分析、带通滤波/反褶积处理，固定频率信号压制，野值噪音压制，初至噪音及废道与废炮切除处理，强相干噪音交互剔除，海水鸣震等多次波追踪识别与压制，基于双界面模型的多次波追踪压制，基于叠加速度曲线/低速能量扫描的多次波压制，基于有效波偏移速度的多次波压制，高速异常多次波的压制，以及静校正与反静校等功能模块组合；Image Processing应用板块主要包含：偏移速度谱生成与分析、基于速度成像剖面的偏移速度误差分析、基于速度成像道集的偏移速度误差分析，浅层速度结构的波动方程反演，层控块体速度模型和网格化速度模型的交互建立，炮集域叠前时间/深度偏移成像处理，共绕射点成像道集处理，以及基于地震剖面/模型的残余多次波追踪识别与地震剖面的时深转换、深时转换、能量均衡、频谱分析、带通滤波/反褶积处理等功能模块组合；Model Testing应用板块，主要包含多域地震同相轴检测、基于所建模型的炮集记录的模拟、海水鸣震的模拟、自激自收剖面的模拟和垂向入射剖面的模拟等功能模块组合。此外，系统配有各种图像显示、图形输出以及并行作业运行状态检测、进程查杀与信息浏览等功能模块；通过LAN_Resource功能板块用户可实现系统对局域网计算机节点资源的加载、卸载和配置管理。 该系统推出了“叠前时间偏移”、“叠前深度偏移”和“叠前深度+时间偏移”三套处理模式，在海水鸣震等多次波的多域联合压制、叠前深度+时间偏移速度分析、变偏移孔径叠前时间/深度偏移、地震模型检验和多域地震同相轴检测等多方面具有显著特色。",
        company:
          "中国海洋大学,中国海洋大学,中国海洋大学,中国海洋大学,中国海洋大学",
        keywords:
          "基于模型的地震数据处理;并行与交互处理技术;多次波压制;偏移速度分析;地震交互建模;叠前偏移成像;多域地震同相轴检测;即时地震模拟检验",
        year: 2006,
        scope: "公开",
        plan: "国家高技术研究发展计划",
        read: 0,
        change: false,
        sort: null,
      },
    };
  },
  methods: {},
  created: function() {
    console.log("project");
    var _this = this;
    this.id = this.$route.query.id;
    this.$axios({
      method: "get",
      url: "/user/project",
      params: {
        // projectID:this.id
        projectID: _this.$route.query.id,
      },
      headers: {
        token: window.localStorage.getItem("token"),
      },
    })
      .then((response) => {
        console.log(response.data.msg);
        if (response.data.msg === "successfully") {
          console.log("get success");
          this.project = response.data.project;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
@import "../assets/css/global.css";
@import "../assets/css/biblio.css";
</style>
