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
          <button @click="verification">我要认证</button>
          <button>关注</button>
          <button @click="uploadAchievementDialogVisible = true">
            上传成果
          </button>
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

    <el-dialog
      title="认证"
      :visible.sync="verificationDialogVisible"
      @close="verificationDialogClosed"
    >
      <div
        v-loading="!verificationBoxVisible"
        element-loading-text="正在向您的邮箱发送验证邮件"
        v-show="!verificationErrorVisible"
      >
        <transition name="el-fade-in-linear">
          <div v-show="verificationBoxVisible" class="verification-box">
            <div>
              <span>
                我们已向您的注册邮箱发送了验证码，请注意查收
              </span>
            </div>
            <el-form
              ref="verificationFormRef"
              :model="verificationForm"
              :rules="verificationFormRules"
            >
              <el-form-item prop="verification_code">
                <el-input
                  v-model="verificationForm.verification_code"
                  placeholder="验证码"
                  required
                >
                </el-input>
              </el-form-item>
            </el-form>
          </div>
        </transition>
      </div>
      <div v-show="verificationErrorVisible">
        <img src="../assets/img/error.png" width="100" alt="" />
        <span>{{ verificationErrorInfo }}</span>
      </div>

      <div slot="footer" class="dialog-footer" v-show="verificationBoxVisible">
        <el-button @click="claim">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="上传学术成果"
      :visible.sync="uploadAchievementDialogVisible"
      @close="verificationDialogClosed"
    >
      <div>
        <el-select v-model="achievementType" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div v-show="achievementType == '论文'">
        <el-form
          ref="uploadPaperFormRef"
          :model="uploadPaperForm"
          :rules="uploadPaperFormRules"
        >
          <el-form-item prop="title">
            <span>论文题目</span>
            <el-input v-model="uploadPaperForm.title" placeholder="题目">
            </el-input>
          </el-form-item>
          <el-form-item prop="author">
            <span>作者</span>
            <el-input v-model="uploadPaperForm.author" placeholder="作者">
            </el-input>
          </el-form-item>
          <el-form-item>
            <span>论文摘要</span>
            <el-input
              type="textarea"
              autosize
              v-model="uploadPaperForm.summary"
              placeholder="摘要"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="url">
            <span>论文链接</span>
            <el-input v-model="uploadPaperForm.url" placeholder="链接">
            </el-input>
          </el-form-item>
          <el-form-item>
            <span>关键词</span>
            <el-input v-model="uploadPaperForm.keywords" placeholder="关键词">
            </el-input>
          </el-form-item>
          <el-form-item>
            <span>期刊</span>
            <el-input v-model="uploadPaperForm.journal" placeholder="期刊">
            </el-input>
          </el-form-item>
          <el-form-item>
            <span>机构</span>
            <el-input v-model="uploadPaperForm.organization" placeholder="机构">
            </el-input>
          </el-form-item>
        </el-form>
      </div>

      <div v-show="achievementType == '专利'">
        <el-form
          ref="uploadPatentFormRef"
          :model="uploadPatentForm"
          :rules="uploadPatentFormRules"
        >
          <el-form-item prop="title">
            <span>专利名</span>
            <el-input v-model="uploadPatentForm.title" placeholder="专利名">
            </el-input>
          </el-form-item>
          <el-form-item prop="needed">
            <span>专利号</span>
            <el-input v-model="uploadPatentForm.patentID" placeholder="类型">
            </el-input>
          </el-form-item>
          <el-form-item prop="applyDate">
            <span>申请日期</span>
            <el-date-picker
              v-model="uploadPatentForm.applyDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="publishID">
            <span>公开号</span>
            <el-input
              v-model="uploadPatentForm.publishID"
              placeholder="专利公开号"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <span>公开日期</span>
            <el-date-picker
              v-model="uploadPatentForm.publicDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <span>主分类号</span>
            <el-input
              v-model="uploadPatentForm.mainTypeNumber"
              placeholder="主分类号"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <span>分类号</span>
            <el-input
              v-model="uploadPatentForm.typeNumber"
              placeholder="分类号"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="owner">
            <span>专利权人</span>
            <el-input v-model="uploadPatentForm.owner" placeholder="专利权人">
            </el-input>
          </el-form-item>
          <el-form-item prop="designer">
            <span>专利发明人</span>
            <el-input
              v-model="uploadPatentForm.designer"
              placeholder="专利发明人"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <span>主申请人地址</span>
            <el-input v-model="uploadPatentForm.address" placeholder="地址">
            </el-input>
          </el-form-item>
          <el-form-item>
            <span>代理机构</span>
            <el-input v-model="uploadPatentForm.agency" placeholder="代理机构">
            </el-input>
          </el-form-item>
          <el-form-item>
            <span>代理人</span>
            <el-input v-model="uploadPatentForm.agent" placeholder="代理人">
            </el-input>
          </el-form-item>
          <el-form-item>
            <span>国别、省市代码</span>
            <el-input
              v-model="uploadPatentForm.code"
              placeholder="国别;省市代码"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <span>主权项</span>
            <el-input
              type="textarea"
              autosize
              v-model="uploadPatentForm.description"
              placeholder="描述"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="status">
            <span>法律状态</span>
            <div>
              <el-radio v-model="uploadPatentForm.status" label="有权">
                有权
              </el-radio>
              <el-radio v-model="uploadPatentForm.status" label="无权">
                无权
              </el-radio>
            </div>
          </el-form-item>
        </el-form>
      </div>

      <div v-show="achievementType == '研究项目'">
        <el-form
          ref="uploadProjectFormRef"
          :model="uploadProjectForm"
          :rules="uploadProjectFormRules"
        >
          <el-form-item prop="author">
            <span>参与者</span>
            <el-input
              v-model="uploadProjectForm.author"
              placeholder="参与者，多个作者之间用‘，’隔开"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="title">
            <span>标题</span>
            <el-input v-model="uploadProjectForm.title" placeholder="标题">
            </el-input>
          </el-form-item>
          <el-form-item>
            <span>摘要</span>
            <el-input
              type="textarea"
              autosize
              v-model="uploadProjectForm.summary"
              placeholder="摘要"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="company">
            <span>工作单位</span>
            <el-input
              v-model="uploadProjectForm.company"
              placeholder="多个单位之间用‘，’隔开，且与参与者一一对相应"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <span>关键词</span>
            <el-input v-model="uploadProjectForm.keywords" placeholder="关键词">
            </el-input>
          </el-form-item>
          <el-form-item>
            <span>立项年份</span>
            <el-input
              v-model.number="uploadProjectForm.year"
              placeholder="立项年份"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="scope">
            <span>公开范围</span>
            <el-input v-model="uploadProjectForm.scope" placeholder="公开范围">
            </el-input>
          </el-form-item>
        </el-form>
      </div>

      <div slot="footer" class="dialog-footer" v-show="achievementType != null">
        <el-button @click="uploadAchievement">确 定</el-button>
      </div>
    </el-dialog>

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
@import '../assets/css/global.css';
@import '../assets/css/gate_main.css';
@import '../assets/css/achievements.css';
</style>
