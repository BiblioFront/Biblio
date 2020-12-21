/* Gate.js */
import Nav from '@/components/Nav.vue'
import WordsCloud from '@/components/WordsCloud.vue'
import LineMap from '@/components/LineMap.vue'
import Collaborator from '@/components/Collaborator.vue'
import CircleProgressbar from '@/components/CircleProgressbar.vue'

export default {
  name: 'Gate',
  components: {
    Nav,
    WordsCloud,
    LineMap,
    Collaborator,
    CircleProgressbar,
  },
  data() {
    return {
      verificationFormRules: {
        verification_code: {
          required: true,
          message: '请输入验证码',
          trigger: 'blur',
        },
      },
      uploadAchievementFormRules: {
        needed: { required: true, message: '必填', trigger: 'blur' },
      },
      uploadPaperFormRules: {
        author: { required: true, message: '必填', trigger: 'blur' },
        title: { required: true, message: '必填', trigger: 'blur' },
        url: { required: true, message: '必填', trigger: 'blur' },
      },
      uploadPatentFormRules: {
        patentID: { required: true, message: '必填', trigger: 'blur' },
        title: { required: true, message: '必填', trigger: 'blur' },
        applyDate: { required: true, message: '必填', trigger: 'blur' },
        publishID: { required: true, message: '必填', trigger: 'blur' },
        owner: { required: true, message: '必填', trigger: 'blur' },
        designer: { required: true, message: '必填', trigger: 'blur' },
        status: { required: true, message: '必填', trigger: 'blur' },
      },
      uploadProjectFormRules: {
        author: { required: true, message: '必填', trigger: 'blur' },
        company: { required: true, message: '必填', trigger: 'blur' },
        title: { required: true, message: '必填', trigger: 'blur' },
        scope: { required: true, message: '必填', trigger: 'blur' },
      },
      hasSendEmail: false, // 判断是否已经发送过邮件
      verificationBoxVisible: true, // 验证框可见性
      verificationDialogVisible: false, // 验证弹窗可见性
      verificationErrorVisible: false, // 验证错误信息可见性
      verificationErrorInfo: '发生了一些错误...', // 验证错误信息
      // 验证表单
      verificationForm: {
        verification_code: '',
      },
      uploadAchievementDialogVisible: false, // 上传学术成果弹窗可见性
      uploadPaperForm: {},
      uploadPatentForm: {},
      uploadProjectForm: {},
      achievementType: null,
      options: [
        {
          value: '论文',
          label: '论文',
        },
        {
          value: '专利',
          label: '专利',
        },
        {
          value: '研究项目',
          label: '研究项目',
        },
      ],

      scholarKeywords: [
        {
          name: '十九大精神',
          value: 15000,
        },
        {
          name: '两学一做',
          value: 10081,
        },
        {
          name: '中华民族',
          value: 9386,
        },
        {
          name: '马克思主义',
          value: 7500,
        },
        {
          name: '民族复兴',
          value: 7500,
        },
        {
          name: '社会主义制度',
          value: 6500,
        },
        {
          name: '国防白皮书',
          value: 6500,
        },
        {
          name: '创新',
          value: 6000,
        },
        {
          name: '民主革命',
          value: 4500,
        },
        {
          name: '文化强国',
          value: 3800,
        },
        {
          name: '国家主权',
          value: 3000,
        },
        {
          name: '武装颠覆',
          value: 2500,
        },
      ],
      yearIndex: [
        2000,
        2001,
        2002,
        2003,
        2004,
        2001,
        2002,
        2003,
        2004,
        2001,
        2002,
        2003,
        2004,
      ],
      biblioIndex: [5, 1, 4, 3, 2, 20, 2, 3, 14, 11, 12, 10, 5],
      collaborators: [
        { value: 235, name: '视频广告' },
        { value: 274, name: '联盟广告' },
        { value: 310, name: '邮件营销' },
        { value: 335, name: '直接访问' },
        { value: 400, name: '搜索引擎' },
      ],
      all: {
        isFollow: false, // 当前用户是否关注该学者 bool
        isAuth: 0, // 当前门户的认证情况： 0表示未被认证，1表示已被认证但不是当前用户认证，2表示已被认证且被当前用户认证
        publishYear: {
          // 论文的出版年统计
          '2011': 1,
          '2010': 1,
        },
        paper: {
          // 论文信息
          msg: 'Search success',
          response: 'success',
          info: [
            {
              _id: '5fccd7df376ae34bbb980e61',
              title: '面向分布式系统访问控制的信任度量化模型',
              author: '郎波',
              summary:
                '通过引入社会学中信任的研究成果,定义了分布式系统访问控制中信任的具体语义、基本特性与上下文相关属性.针对信任的主观性、模糊性与不确定性,采用模糊数学与概率论相结合的方法,给出了信任的数学定义,建立了包括信任综合评价与信任计算的信任度量化模型.该模型综合了访问控制背景下信任相关的各种因素,符合推荐信任的衰减与增强规律.',
              url: null,
              keywords: '访问控制;信任量化表达;信任计算;分布式系统',
              date: '2011-03-24',
              journal: '通信学报',
              organization:
                '北京航空航天大学,软件开发环境国家重点实验室,北京,100083',
              likes: 0,
              read: 0,
              change: false,
              doi: '10.3969/j.issn.1000-436X.2010.12.006',
            },
            {
              _id: '5fcee2e700f8a0090a698822',
              title: '网格计算中一种基于属性的访问控制方法',
              author: '倪文婷,郎波',
              summary:
                '为了迎合目前网格计算对动态、细粒度授权的需求,针对网格资源分层式的组织结构特点,在现有的基于属性的访问控制(ABAC)模型的基础上,提出了一种针对网格资源的ABAC模型Grid_ABAC,并设计了基于XACML的Grid_ABAC实现框架,应用在GT4平台上.最后对GT4中的应用作了测试,测试结果表明授权结果与预期结果相同,且时间开销随着规模的增长并没有增长很多,在可接受范围内.证明Grid_ABAC模型在网格平台上具有一定的实用性.',
              url: null,
              keywords:
                '网格计算;Globus网格平台;基于属性的访问控制;可扩展访问控制标记语言',
              date: '2010-04-06',
              journal: '计算机应用研究',
              organization:
                '北京航空航天大学,计算机学院,软件开发环境国家重点实验室,北京,100086',
              likes: 0,
              read: 0,
              change: false,
              doi: '10.3969/j.issn.1001-3695.2010.02.082',
            },
          ],
        },
        patent: {
          // 专利信息
          msg: 'Search success',
          response: 'success',
          info: [],
        },
        project: {
          // 科研项目信息
          msg: 'Search success',
          response: 'success',
          info: [],
        },
        wordCloud: {
          // 词云统计
          信任量化表达: 1,
          基于属性的访问控制: 1,
          信任计算: 1,
          网格计算: 1,
          分布式系统: 1,
          访问控制: 1,
          可扩展访问控制标记语言: 1,
          Globus网格平台: 1,
        },
        scholarInfo: {
          // 当前门户的学者信息
          scholarID: '5fccd7df376ae34bbb980e61',
          name: '郎波',
          field: null,
          organization: '北京航空航天大学',
          userID: null,
          id: '5fdf795e35f0973eaf28b1e1',
        },
        relateScholar: {
          // 合作学者统计
          倪文婷: 1,
        },
      },
    }
  },
  methods: {
    // 发送验证邮件
    verification() {
      this.verificationDialogVisible = true
      this.verificationBoxVisible = false
      if (!this.hasSendEmail) {
        var scholarID = this.all.scholarInfo.scholarID
        console.log(scholarID)
        var token = window.localStorage.getItem('token')
        console.log(token)

        this.$axios
          .post(
            '/user/verification?researcherID=' + scholarID,
            { verification_code: this.verificationForm.verification_code },
            { headers: { token: token } }
          )
          .then((response) => {
            var msg = response.data.msg
            console.log(msg)
            if (msg === 'Send verification code successfully') {
              this.hasSendEmail = true
              this.verificationBoxVisible = true
            } else if (msg === 'Email format error') {
              this.verificationErrorVisible = true
              this.verificationErrorInfo = '邮箱格式错误'
              this.$message.error('邮箱格式错误')
            } else if (msg === 'Unsupported mailbox') {
              this.verificationErrorVisible = true
              this.verificationErrorInfo = '不支持您的邮箱类型'
              this.$message.error('不支持您的邮箱类型')
            } else if (msg === 'please login first') {
              this.verificationErrorVisible = true
              this.verificationErrorInfo = '请先登录'
              this.$message.error('请先登录')
            }
          })
          .catch((error) => {
            console.log(error)
            console.log('请求异常')
          })
      } else {
        this.verificationBoxVisible = true
      }
    },
    // 发送验证码
    claim() {
      this.$refs.verificationFormRef.validate((valid) => {
        if (!valid) return

        var scholarID = this.all.scholarInfo.scholarID
        console.log(scholarID)
        var token = window.localStorage.getItem('token')
        console.log(token)

        this.$axios
          .post(
            '/user/claim?researcherID=' + scholarID,
            { verification_code: this.verificationForm.verification_code },
            { headers: { token: token } }
          )
          .then((response) => {
            var msg = response.data.msg
            console.log(msg)
            if (msg === 'claim successfully') {
              this.$message.success('认证成功')
              this.verificationDialogClosed()
            } else if (msg === 'Wrong verification code') {
              this.$message.error('验证码错误')
            } else if (msg === 'please login first') {
              this.verificationErrorVisible = true
              this.verificationErrorInfo = '请先登录'
              this.$message.error('请先登录')
            }
          })
          .catch((error) => {
            console.log(error)
            console.log('请求异常')
          })
      })
    },
    // 关闭验证弹窗
    verificationDialogClosed() {
      this.verificationDialogVisible = false
      this.verificationErrorVisible = false
      // this.$refs.verificationFormRef.resetFields()
      this.verificationForm.verification_code = ''
    },
    // 上传论文
    uploadPaper() {
      this.$refs.uploadPaperFormRef.validate((valid) => {
        if (!valid) return
        var scholarID = this.all.scholarInfo.scholarID
        console.log(scholarID)
        var token = window.localStorage.getItem('token')
        console.log(token)

        let uploadPaperForm = {
          author: this.uploadPaperForm.author,
          title: this.uploadPaperForm.title,
          summary: this.uploadPaperForm.summary,
          url: this.uploadPaperForm.url,
          keywords: this.uploadPaperForm.keywords,
          journal: this.uploadPaperForm.journal,
          organization: this.uploadPaperForm.organization,
        }
        // console.log(uploadPaperForm)
        this.$axios
          .post('/user/paper/add?ResearcherID=' + scholarID, uploadPaperForm, {
            headers: { token: token },
          })
          .then((response) => {
            var msg = response.data.msg
            console.log(msg)
            if (msg === 'successfully') {
              this.$message.success('上传成功')
              this.achievementType = null
              this.uploadPaperForm = {}
              this.uploadAchievementDialogVisible = false
            } else if (msg === 'You have no authority') {
              this.$message.error('您没有权限')
            } else if (msg === 'please login first') {
              this.$message.error('请先登录')
            }
          })
          .catch((error) => {
            console.log(error)
            console.log('请求异常')
          })
        console.log(this.achievementType)
      })
    },
    // 上传专利
    uploadPatent() {
      this.$refs.uploadPatentFormRef.validate((valid) => {
        if (!valid) return

        var scholarID = this.all.scholarInfo.scholarID
        console.log(scholarID)
        var token = window.localStorage.getItem('token')
        console.log(token)

        let uploadPatentForm = {
          title: this.uploadPatentForm.title,
          summary: this.uploadPatentForm.summary,
          type: this.uploadPatentForm.type,
          patentID: this.uploadPatentForm.patentID,
          applyDate: this.uploadPatentForm.applyDate,
          publishID: this.uploadPatentForm.publishID,
          publicDate: this.uploadPatentForm.publicDate,
          mainTypeNumber: this.uploadPatentForm.mainTypeNumber,
          typeNumber: this.uploadPatentForm.typeNumber,
          owner: this.uploadPatentForm.owner,
          designer: this.uploadPatentForm.designer,
          address: this.uploadPatentForm.address,
          agency: this.uploadPatentForm.agency,
          agent: this.uploadPatentForm.agent,
          code: this.uploadPatentForm.code,
          description: this.uploadPatentForm.description,
          status: this.uploadPatentForm.status,
        }

        // console.log(uploadPatentForm)

        this.$axios
          .post(
            '/user/patent/add?ResearcherID=' + scholarID,
            uploadPatentForm,
            {
              headers: { token: token },
            }
          )
          .then((response) => {
            var msg = response.data.msg
            console.log(msg)
            if (msg === 'successfully') {
              this.$message.success('上传成功')
              this.achievementType = null
              this.uploadPatentForm = {}
              this.uploadAchievementDialogVisible = false
            } else if (msg === 'You have no authority') {
              this.$message.error('您没有权限')
            } else if (msg === 'please login first') {
              this.$message.error('请先登录')
            }
          })
          .catch((error) => {
            console.log(error)
            console.log('请求异常')
          })
      })
    },
    // 上传项目
    uploadProject() {
      this.$refs.uploadProjectFormRef.validate((valid) => {
        if (!valid) return

        var scholarID = this.all.scholarInfo.scholarID
        console.log(scholarID)
        var token = window.localStorage.getItem('token')
        console.log(token)

        let uploadProjectForm = {
          author: this.uploadProjectForm.author,
          title: this.uploadProjectForm.title,
          summary: this.uploadProjectForm.summary,
          company: this.uploadProjectForm.company,
          keywords: this.uploadProjectForm.keywords,
          year: this.uploadProjectForm.year,
          scope: this.uploadProjectForm.scope,
          plan: this.uploadProjectForm.plan,
        }
        // console.log(uploadProjectForm)
        this.$axios
          .post(
            '/user/project/add?ResearcherID=' + scholarID,
            uploadProjectForm,
            {
              headers: { token: token },
            }
          )
          .then((response) => {
            var msg = response.data.msg
            console.log(msg)
            if (msg === 'successfully') {
              this.$message.success('上传成功')
              this.achievementType = null
              this.uploadProjectForm = {}
              this.uploadAchievementDialogVisible = false
            } else if (msg === 'You have no authority') {
              this.$message.error('您没有权限')
            } else if (msg === 'please login first') {
              this.$message.error('请先登录')
            }
          })
          .catch((error) => {
            console.log(error)
            console.log('请求异常')
          })
      })
    },
    // 上传学术成果
    uploadAchievement() {
      if (this.achievementType === '论文') {
        this.uploadPaper()
      } else if (this.achievementType === '专利') {
        this.uploadPatent()
      } else if (this.achievementType === '研究项目') {
        this.uploadProject()
      }
    },
  },
}
