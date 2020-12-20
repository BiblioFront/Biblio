<template>
  <div class="container">
    <Nav />

    <div class="gatepage main_content">
      <div class="scholar_info_box">
        <div class="scholar_avatar">
          <img src="../assets/img/scholar_avatar_default.jpg" alt="学者头像" />
        </div>

        <div class="gatepage scholar_info">
          <div>
            <span id="name">马保国</span>
            <svg-icon name="verify"></svg-icon>
          </div>

          <span id="institution">混元形意太极门</span>
          <span id="subject">学科：掌门人</span>
        </div>

        <div class="scholar_btns_area">
          <button>我要认证</button>
          <button>关注</button>
        </div>
      </div>

      <div class="research_info">
        <div class="achievements statisticbar">
          <CircleProgressbar title="论文" />
          <CircleProgressbar title="专利" />
          <CircleProgressbar title="科研项目" />

          <div class="statistic_table">
            <span>总篇数</span>
            <span>被引数</span>
            <span>3</span>
            <span>500k</span>
          </div>
        </div>

        <div class="achievements">
          <WordsCloud :data="scholarKeywords" />
          <LineMap :yearIndex="yearIndex" :biblioIndex="biblioIndex" />
        </div>

        <Collaborator :data="collaborators" />
      </div>
    </div>

    <div class="achievements_box">
      <div id="filter_bar">
        <div class="filter_bar__item">
          <ul>
            <li>
              <span>全部年份</span>
              <div id="cutline"></div>
            </li>
            <li>
              <span>全部类型</span>
              <div id="cutline"></div>
            </li>
          </ul>
        </div>

        <div class="filter_bar__item">
          <ul>
            <li>
              <span>被引量</span>
              <div id="cutline"></div>
            </li>
            <li>
              <span>发表时间</span>
              <div id="cutline"></div>
            </li>
          </ul>
        </div>
      </div>

      <div class="achievements_content">
        <div class="achievements_item">
          <div class="item__above">
            <div id="title">
              <span>[学术期刊]</span>
              <span>闪电五连鞭</span>
            </div>

            <div class="item__btns_area">
              <button><svg-icon name="like"></svg-icon></button>
              <button><svg-icon name="relative"></svg-icon></button>
              <button><svg-icon name="share"></svg-icon></button>
            </div>
          </div>

          <div id="author">
            <span
              >马保国1 马保国2 马保国3 马保国4 马保国5 马保国6
              马保国6马保国6马保国6马保国6</span
            >
            <span>《这是出处》</span>
            <span>被引量: 100k</span>
          </div>

          <div id="summary">
            <button>摘要</button>
            <p>
              二战时期，二战时期，二战时期，二战时期，二战时期，二战时期，二战时期，二战时期，二战时期，二战时日本的军国主义海军非常强大，在当时盛极一时，昭和9年四月，江田岛海军兵学校将培育优秀的海军航空士官，这一批士官参加了袭击珍珠港的一批士官参加了袭击珍珠港的一批士官参加了袭击珍珠港的一批士官参加了袭击珍珠港的一批士官参加了袭击珍珠港的一批士官参加了袭击珍珠港的一批士官参加了袭击珍珠港的
            </p>
          </div>
        </div>
        <div class="achievements_item">
          <div class="item__above">
            <div id="title">
              <span>[学术期刊]</span>
              <span
                >健身房的年轻后生不讲武德偷袭马老师，把马保国老师的眼睛给蹭了一下</span
              >
            </div>

            <div class="item__btns_area">
              <button>收藏</button>
              <button>相关文章</button>
              <button>分享</button>
            </div>
          </div>

          <div id="author">
            <span>马保国 90kg年轻人 80kg年轻人</span>
            <span>《这是出处》</span>
            <span>被引量: 1000w</span>
          </div>

          <div id="summary">
            <button>摘要</button>
            <p>
              二战时期，二战时期，二战时期，二战时期，二战时期，二战时期，二战时期，二战时期，二战时期，二战时日本的军国主义海军非常强大，在当时盛极一时，昭和9年四月，江田岛海军兵学校将培育优秀的海军航空士官，这一批士官参加了袭击珍珠港的一批士官参加了袭击珍珠港的一批士官参加了袭击珍珠港的一批士官参加了袭击珍珠港的一批士官参加了袭击珍珠港的一批士官参加了袭击珍珠港的一批士官参加了袭击珍珠港的
            </p>
          </div>
        </div>
      </div>

      <div class="pageturn">
        <span>&#60; 1 2 3 4 5 6 7 ... 50 &#62;</span>
      </div>
    </div>

    <div class="footer">
      <span>footer</span>
    </div>
  </div>
</template>

<script src="../assets/js/Gate.js"></script>

<style scoped>
@import "../assets/css/global.css";
@import "../assets/css/gate_main.css";
@import "../assets/css/achievements.css";
</style>
