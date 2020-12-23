/* Gate.js */
import Nav from "@/components/Nav.vue";
import WordsCloud from "@/components/WordsCloud.vue";
import LineMap from "@/components/LineMap.vue";
import Collaborator from "@/components/Collaborator.vue";
import CircleProgressbar from "@/components/CircleProgressbar.vue";

export default {
  name: "Gate",
  components: {
    Nav,
    WordsCloud,
    LineMap,
    Collaborator,
    CircleProgressbar,
  },
  data() {
    return {
      //上传学术成果：
      //验证规则：
      verificationFormRules: {
        verification_code: {
          required: true,
          message: "请输入验证码",
          trigger: "blur",
        },
      },
      uploadAchievementFormRules: {
        needed: { required: true, message: "必填", trigger: "blur" },
      },
      uploadPaperFormRules: {
        author: { required: true, message: "必填", trigger: "blur" },
        title: { required: true, message: "必填", trigger: "blur" },
        url: { required: true, message: "必填", trigger: "blur" },
      },
      uploadPatentFormRules: {
        patentID: { required: true, message: "必填", trigger: "blur" },
        title: { required: true, message: "必填", trigger: "blur" },
        applyDate: { required: true, message: "必填", trigger: "blur" },
        publishID: { required: true, message: "必填", trigger: "blur" },
        owner: { required: true, message: "必填", trigger: "blur" },
        designer: { required: true, message: "必填", trigger: "blur" },
        status: { required: true, message: "必填", trigger: "blur" },
      },
      uploadProjectFormRules: {
        author: { required: true, message: "必填", trigger: "blur" },
        company: { required: true, message: "必填", trigger: "blur" },
        title: { required: true, message: "必填", trigger: "blur" },
        scope: { required: true, message: "必填", trigger: "blur" },
      },
      hasSendEmail: false, // 判断是否已经发送过邮件
      verificationBoxVisible: true, // 验证框可见性
      verificationDialogVisible: false, // 验证弹窗可见性
      verificationErrorVisible: false, // 验证错误信息可见性
      verificationErrorInfo: "发生了一些错误...", // 验证错误信息
      // 验证表单
      verificationForm: {
        verification_code: "",
      },
      uploadAchievementDialogVisible: false, // 上传学术成果弹窗可见性
      uploadPaperForm: {},
      uploadPatentForm: {},
      uploadProjectForm: {},
      achievementType: null,
      options: [
        {
          value: "论文",
          label: "论文",
        },
        {
          value: "专利",
          label: "专利",
        },
        {
          value: "研究项目",
          label: "研究项目",
        },
      ],
      paperProgress: "0.00",
      patentProgress: "0.00",
      projectProgress: "0.00",
      biblioCount: 0,
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
      all: {
        scholarInfo: {
          _id: "5fccf74f007fd9206fae36dc",
          name: "王超",
          sort:
            "教育学;计算机网络;工程学;医学;物理学;计算机图形;信息安全;数据库技术;水利工程;电力系统;决策学;嵌入式;生态学;环境科学;管理学;仪器学;食品科学;农学;地理学;交通运输工程;化学;算法理论;分布式;云计算;软件工程;生物学;数学;纺织学;海洋科学;编译技术;经济学;矿业工程;机器学习;大数据;信息技术;民族学;仿真技术;法学",
          organization: "河海大学",
          userID: null,
        },
        isFollow: false,
        isAuth: 0,
        paperCount: 32,
        patentCount: 1,
        projectCount: 6,
        paper: {
          msg: "Search success",
          response: "success",
          info: [
            {
              _id: "5fd9866e4d9bd76e54b5dbc8",
              title: "多孔扩散器在宽浅江河中排放特性研究",
              author: "王超",
              summary: "",
              url: null,
              keywords: "扩散器;虚拟点源;掺混扩散;流动建立区;流动建成区",
              date: "",
              journal: "水利学报",
              organization: "河海大学",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fd9866f2ed54c7ff3aa3561",
              title: "污染物在土壤及地下水中迁移转化研究综述",
              author: "王超",
              summary: "",
              url: null,
              keywords: "污染物;地下水;迁移转化;数学模型",
              date: "",
              journal: "江苏力学",
              organization: "河海大学",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fd9866d2ed54c7ff3aa355e",
              title: "国外城市排水系统的发展与启示",
              author: "王文远,王超",
              summary: "",
              url: null,
              keywords:
                "国外城市;城市污水;污水厂;雨水径流;合流制;排水系统;混合污水",
              date: "",
              journal: "中国给水排水",
              organization: "河海大学",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fd9866b2ed54c7ff3aa355c",
              title: "不能再沿袭简单的工程思维了",
              author: "王超",
              summary: "",
              url: null,
              keywords:
                "工程思维;长江流域;水安全;水鸟栖息地;生物多样性;渔业资源;严重退化;水体污染;危机;生态问题",
              date: "",
              journal: "博览群书",
              organization: "中国工程院,河海大学",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fd9866e2c5d1e7971868e21",
              title: "移动Ad hoc网络现状及前景展望",
              author: "赵伟伟,王超,赵硕平",
              summary:
                "无线自组织网络(Ad hoc)是当前无线通信领域一种新的、正在发展的网络技术,它正在迅速的从军事通信渗透到民用通信领域.文中介绍了Ad hoc网络的的特点,发展现状及前景,并对其发展中遇到的困难做了简要的介绍.",
              url: null,
              keywords: "移动Ad;hoc网络;现状;前景",
              date: "2008-07-29",
              journal: "中国高新技术企业",
              organization: "河海大学",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fd986722c5d1e7971868e27",
              title: "4种化感物质对铜绿微囊藻生长及叶绿素荧光参数影响的比较",
              author: "甘小蓉,王超,杨超慧",
              summary:
                "为探究青蒿素、壬酸、没食子酸和邻苯二酚4种化学物质对铜绿微囊藻(Microcystis aeruginosa,FACHB-937)的胁迫效应,分析了同一质量浓度下4种化感物质对藻细胞生长、叶绿素a含量和叶绿素荧光参数的差异性.结果 表明:整个实验周期内,邻苯二酚处理组的铜绿微囊藻生长被显著抑制,叶绿素a含量减少了2.25％～89.7％;邻苯二酚、青蒿素和壬酸都通过降低铜绿微囊藻的叶绿素a含量、光合速率、对强光的耐受能力从而抑制其生长;没食子酸增强了铜绿微囊藻的潜在光合作用能力,但抑制了其细胞内叶绿素a的合成.",
              url: null,
              keywords: "青蒿素;壬酸;没食子酸;邻苯二酚;铜绿微囊藻",
              date: "2019-11-18",
              journal: "四川环境",
              organization:
                "河海大学浅水湖泊综合治理与资源开发教育部重点实验室,南京210098,河海大学环境学院,南京210098",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fd986712ed54c7ff3aa3565",
              title: "中国泥水盾构使用现状及若干问题",
              author: "朱伟,钱勇进,闵凡路,王璐,王超,徐超,胡涧楠",
              summary:
                "近十年来,泥水盾构隧道技术在我国应用越来越广泛,已成为大型越江海隧道和城市地铁建设不可或缺的关键技术.我国的泥水盾构技术,尤其是大直径泥水盾构工程技术不断成熟,工程的建设量和大直径盾构数量已居世界前列;然而,在泥水盾构技术快速发展中出现一些问题.在收集我国泥水盾构施工技术使用现状的同时,对施工中遇到的复杂地层、泥水舱构造、刀具过量磨损、频繁开舱作业、泥浆材料的使用及处理、盾构重复使用等特点进行梳理.结合代表性的泥水盾构工程实例,深入分析施工遇到的刀具磨损、开舱检修关键技术、泥膜闭气开挖面稳定、泥浆携渣及处理等问题,总结已有的施工经验及技术特点,明确我国泥水盾构技术发展的方向,以期推动世界泥水盾构技术的发展.",
              url: null,
              keywords:
                "泥水盾构;开挖面稳定;开舱措施;刀具磨损;盾构重复使用;泥浆处理",
              date: "2019-06-19",
              journal: "隧道建设（中英文）",
              organization:
                "河海大学环境学院,江苏 南京,210098,河海大学 岩土力学与堤坝工程教育部重点实验室,江苏 南京 210098,河海大学土木与交通学院,江苏 南京 210098",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fd9866f4d9bd76e54b5dbca",
              title: "湖泊沉积物砷生物有效性评估采样分析技术综述",
              author: "姚羽,王沛芳,王超",
              summary:
                "为了给浅水湖泊砷(As)污染状况的评估和综合治理提供技术支撑,在分析As污染物在湖泊中的赋存形态、各形态之间的转化以及As生物有效性影响因素的基础上,对比分析了传统采样技术和原位采样技术的优劣.结果表明,传统采样技术极易在样品采集和测定过程中对As产生再吸附、再溶解和再分配,无法真实地反映As的污染状况和迁移转化过程,而原位采样技术中Peeper、DET、DGT等可较好地评估湖泊As污染的生物有效性,但这类技术忽视了沉积物和上覆水的交互作用,导致累计的过程中不能对目标元素直接量化,且忽略了微生物的变化对测量的影响,所以测定过程仍需进一步优化;传统的采样技术和新型的原位测定技术各自具有明显的劣势,因此多种采样分析技术的联用可减小As污染浓度误差.",
              url: null,
              keywords:
                "湖泊沉积物;砷污染;As生物有效性;传统采样技术;原位采样技术",
              date: "2019-12-19",
              journal: "水资源保护",
              organization:
                "河海大学浅水湖泊综合治理与资源开发教育部重点实验室,江苏 南京 210098,河海大学环境学院,江苏 南京 210098",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fd9df492c5d1e7971874dfb",
              title: "水力机械多功能模型试验台循环管路系统水力设计",
              author: "郑源,李平,陈新方,王超",
              summary:
                "介绍了河海大学水力机械多功能模型试验台循环管路系统的水力设计,着重介绍了模型试验台的水力计算和试验台的多功能性.",
              url: null,
              keywords: "多功能模型试验台;循环管路系统;水泵;水轮机",
              date: "2004-01-08",
              journal: "流体机械",
              organization: "河海大学,安徽机电排灌总站",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fce076364de6402e9df76d5",
              title: "我国饮用水水源水质标准的现状及建议",
              author: "侯俊,王超,吉栋梁",
              summary:
                "饮用水水源水质标准是评价和保护水源地水环境质量的重要依据,指出了我国饮用水水源水质相关标准存在的问题,如缺乏法律保障、主管部门不明确、缺少专业标准、水质基准研究不足等;分析了《地表水环境质量标准》(GB 3838-2002)和《地下水质量标准》(GB/T 14848-93)在标准体系、指标限值、监测评价、实施保障等方面的不足,并对我国饮用水水源水质标准的制定提出了建议.",
              url: null,
              keywords: "饮用水水源;水质标准;地表水质量标准",
              date: "2007-11-26",
              journal: "中国给水排水",
              organization:
                "河海大学,浅水湖泊综合治理与资源开发教育部重点实验室,江苏,南京,210098,河海大学,环境科学与工程学院,江苏,南京,210098",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fd9866e4d9bd76e54b5dbc9",
              title: "水动力变化对鲫鱼生命活动影响试验研究",
              author: "李玉蕴,王沛芳,王超,范秀磊,王洵",
              summary:
                "为探究不同流速下鲫鱼的生理响应,以红鲫鱼(Carassius auratus Linnaeus)为研究对象,采用流速渐变环形水槽通过设置5个流速区模拟研究了不同流速条件对鲫鱼体重及酶活等指标的影响.结果 表明,鲫鱼的体重及增长率基本随流速增加而减少,而超氧化物歧化酶(SOD)、α-淀粉酶(AMY)活性和活性氧(ROS)含量基本随着水流速度增大先减小后增加.高流速区域(76.3cm/s)鲫鱼ROS、SOD、AMY含量的变化显著(P＜0.05),而其它流速区域变化较小,这表明高流速(76.3cm/s)对鲫鱼产生胁迫作用.鲫鱼流速适宜曲线研究发现36～42cm/s是鲫鱼最适宜的生存环境.研究结果可为闸坝建设后生态管理提供理论依据.",
              url: null,
              keywords: "鲫鱼;流速;生化指标;抗氧化酶;闸坝",
              date: "2020-09-15",
              journal: "四川环境",
              organization:
                "河海大学浅水湖泊综合治理与资源开发教育部重点实验室,南京210098,河海大学环境学院,南京210098",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fd9866f2ed54c7ff3aa3560",
              title: "压气条件下泥膜进气值测量试验研究",
              author: "王超,朱伟,闵凡路,钱勇进",
              summary:
                "在压气条件下,进气是泥膜透气失效的起始点.为测量并研究泥膜在气压下的进气压力值(进气值),通过自制的试验装置,在不同压气条件下对3种泥膜进行进气值测量试验.试验结果表明:1)由闭气排水与固结排水的差值可以辨别泥膜是否进气,得到泥膜进气值;2)采用泥膜特征孔径D90/2代入推导公式可近似计算泥膜进气值;3)泥膜在不同压气条件下进气值不同,增压速率越低,泥膜进气值越大;4)在较快和较慢的增压速率下存在进气值变化趋于稳定的现象,最大进气值为最小值的2倍以上.",
              url: null,
              keywords: "压气条件;泥水盾构;泥膜;进气值;测量试验;增压速率",
              date: "2019-05-17",
              journal: "隧道建设（中英文）",
              organization:
                "河海大学 岩土力学与堤坝工程教育部重点实验室,江苏 南京 210098,河海大学土木与交通学院,江苏 南京 210098,河海大学环境学院,江苏 南京,210098",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fcf7c0912f62d12a7faf457",
              title: "污染河道对沿岸地下水环境影响规律研究",
              author: "王超,李勇,包振琪",
              summary:
                "以江苏奎河为例,观测研究奎河污染物CODCr、NH+4-N、NO-3-N、Cl-入渗进入地下水中发生物理、化学及生物变化的时空分布规律,分析河道沿岸土壤对污染物的去除能力.结果表明:河床的土壤对污染物CODCr具有很高的去除率,对NH+4-N亦有较高的去除率.河道中的NO-3-N在入渗过程中虽有一定的去除率,但由于NH+4-N、NO-2-N等污染因子转化成NO-3-N,因此该浓度不一定会明显降低.Cl-是保守性污染因子,入渗过程中虽有一定的去除率,但仍对沿岸地下水环境产生影响.因此,当污染河道中污染因子是保守性物质时,必须考虑对沿岸地下水源地的影响.",
              url: null,
              keywords: "污染河道;地下水环境;现场观测;去除率",
              date: "2004-01-08",
              journal: "水科学进展",
              organization: "河海大学环境科学与工程学院,江苏,南京,210098",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fce89aa00f8a0090a696469",
              title: "生态节水型灌区建设的主要内容与关键技术",
              author: "王超,王沛芳,侯俊,钱进,饶磊,敖燕辉",
              summary:
                "针对传统灌区建设中存在的重工程和经济效益、轻生态环境的现象，以及由此造成灌区面源污染严重、水生态环境恶化的问题，在总结分析国内外灌区理论研究和建设实践的基础上，提出生态节水型灌区的建设思路、构建模式和技术体系，旨在为我国灌区节水、减污、绿色、生态、智能的科学发展提供理论依据和技术借鉴。",
              url: null,
              keywords: "灌区建设;生态节水型灌区;灌区技术体系;研究进展",
              date: "2015-11-19",
              journal: "水资源保护",
              organization:
                "河海大学浅水湖泊综合治理与资源开发教育部重点实验室，江苏南京 210098,河海大学环境学院，江苏南京 210098,河海大学机电学院,江苏常州,213022",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fd9866f2ed54c7ff3aa3562",
              title: "金属纳米材料对不同微生物聚集体的毒性研究进展",
              author: "苗令占,王沛芳,侯俊,王超,姚羽",
              summary:
                "在总结目前污水处理系统和自然水体中典型纳米材料浓度分布的基础上,分析了金属纳米材料对污水处理系统 (活性污泥和生物膜) 和自然水生态系统 (自然生物膜) 中微生物聚集体的毒性作用研究现状,提出开展金属纳米材料对自然生物膜微生物群落结构和功能特性影响的研究,通过低浓度长期暴露实验解析其对自然水生态系统的负面效应等,为纳米材料的污染防治提供理论依据.",
              url: null,
              keywords: "金属纳米材料;污水处理系统;自然水环境;微生物聚集体",
              date: "2019-05-31",
              journal: "水资源保护",
              organization:
                "河海大学浅水湖泊综合治理与资源开发教育部重点实验室,江苏 南京 210098,河海大学环境学院,江苏 南京 210098",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fdb74f544dc73224f6d9b0b",
              title: "基于 ElasticSearch 的元数据搜索与共享平台",
              author: "姜康,冯钧,唐志贤,王超",
              summary:
                "随着水利行业信息化的发展，针对海量、多源、异构数据的共享与发现成为行业研究的热点。本文设计与实现一种基于ElasticSearch的水利元数据搜索与共享平台，提出针对水利异构数据的解决方案并对海量数据建立索引，利用多租户访问控制策略，保证用户索引数据的一致性与安全性。通过Rest服务对索引资源进行封装，提供搜索与多粒度的共享方式。应用表明，平台能够保证用户准确高效地获得水利行业数据，节约了水利单位构建搜索系统的成本。",
              url: null,
              keywords: "元数据检索;多租户访问控制;分布式;RESTful服务;异构数据",
              date: "2015-03-25",
              journal: "计算机与现代化",
              organization: "河海大学计算机与信息学院,江苏 南京,211100",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fd9866e4d9bd76e54b5dbc7",
              title: "农药污染土壤的生物强化修复技术研究进展",
              author: "高寒,陈娟,王沛芳,王超",
              summary:
                "生物强化作为一种新型、高效的生物修复技术在污染环境治理中具有独特优势.针对目前土壤农药污染现状,本文介绍了土壤微生物修复方法中的生物强化技术的概念及内涵,探讨了在污染土壤环境中影响生物强化修复效率的生物及非生物因素,重点阐述了生物强化技术在4大类农药(有机氯类、有机磷类、拟除虫菊酯类杀虫剂和三嗪类除草剂)污染土壤修复中的研究进展及应用实例,并提出生物强化技术面临的问题和未来研究方向.",
              url: null,
              keywords: "农田土壤;农药污染;生物强化;修复",
              date: "2019-08-01",
              journal: "土壤",
              organization:
                "浅水湖泊综合治理与资源开发教育部重点实验室,河海大学,南京 210098",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fdb750744dc73224f6d9b35",
              title: "面向共享交换的水利混合云存储平台",
              author: "冯读庆,冯钧,唐志贤,王超",
              summary:
                "随着水利信息化的快速发展，分散存储的数据共享交换越来越频繁。针对物理集中式数据中心存储利用率低、数据交换I／O瓶颈、物理抗干扰差等问题，基于水利存储平台，设计实现一种面向共享交换的混合云存储方案。实验表明该方案能够保证数据的安全性，提高多个存储平台的综合利用率，降低水利数据共享交换过程中产生交换热点的概率。",
              url: null,
              keywords: "云存储;数据交换;数据共享;水利信息化;纠删码",
              date: "2015-01-22",
              journal: "计算机与现代化",
              organization: "河海大学计算机与信息学院,江苏 南京,211100",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fce0a1cdcc080670f9a9312",
              title: "灰色动态模型群法在河流水质预测中的应用初探",
              author: "李如忠,王超",
              summary:
                "在对原始数据序列对数变换的基础上,依据灰色系统理论,构造了由6个GM(1,1)模型组成的灰色动态模型群,并用于淮河干流枯水期氨氮浓度变化趋势预测.研究表明,灰色动态模型群法能够充分利用近期水质资料信息预测水质变化趋势;相对单个GM(1,1)模型,灰色动态模型群法能有效改善随机波动数据序列的拟合效果,提高预测精度.",
              url: null,
              keywords: "灰色预测;GM(1,1)模型;灰色动态模型群;水质预测",
              date: "2004-01-15",
              journal: "中国农村水利水电",
              organization:
                "河海大学水文水资源及环境学院,南京市,210098,合肥工业大学资源与环境工程学院,230009",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fcf82bad4926b6ff57f4967",
              title: "我国饮用水水源地保护法规体系现状及建议",
              author: "侯俊,王超,兰林,万雷鸣",
              summary:
                "科学合理的水源地保护法规体系对于保障饮用水源水质安全和人民身体健康极为重要.从国家法律、行政法规、部门规章、标准规范和地方法规等层次,对我国饮用水水源地保护法规体系现状进行了分析,指出相关法规在管理体制、水源保护区划分、水质保护目标、水源地保护措施、水源监测预警、突发事件紧急预案和公众参与等方面的问题,借鉴国外饮用水水源地保护法规体系,提出了完善我国饮用水水源地保护法规体系的建议.",
              url: null,
              keywords: "饮用水;水源地保护;法规体系;中国",
              date: "2009-04-15",
              journal: "水资源保护",
              organization:
                "河海大学浅水湖泊综合治理与资源开发教育部重点实验室,江苏,南京,210098,河海大学环境科学与工程学院,江苏,南京,210098,江苏省水利厅,江苏,南京,210029,宜兴市环境科学研究所,江苏,宜兴,214206",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fd9866f2ed54c7ff3aa3563",
              title: "太湖和洪泽湖天然有机质与重金属结合特性研究",
              author: "施玥,王沛芳,胡斌,王超,包天力,张楠楠",
              summary:
                "利用同步荧光光谱表征浅水湖泊太湖和洪泽湖中天然有机质(NOM)的组成,同时利用荧光淬灭滴定试验研究了NOM与Cu2+和Cd2+的结合特性.结果表明:两个湖泊的NOM中类蛋白质和类腐殖质组成比例存在显著的差异,太湖NOM主要由类蛋白质和类腐殖质组成,洪泽湖NOM则以类腐殖质为主;太湖和洪泽湖NOM与Cu2+和Cd2+的结合点位及结合能力存在显著差异,NOM中类腐殖质的结合点位要显著多于类蛋白质;太湖贡湖湾和梅梁湾NOM中类蛋白质与Cu2+的结合能力以及梅梁湾NOM中类蛋白质与Cd2+的结合能力强于类腐殖质,但贡湖湾NOM中类蛋白质与Cd2+的结合能力则弱于类腐殖质,而洪泽湖NOM中类蛋白质与Cu2+和Cd2+的结合能力均强于类腐殖质;太湖NOM与重金属Cu2+和Cd2+的结合能力要显著高于洪泽湖NOM.",
              url: null,
              keywords: "天然有机质;重金属;荧光光谱;荧光猝灭试验;太湖;洪泽湖",
              date: "2019-10-14",
              journal: "水资源保护",
              organization:
                "河海大学浅水湖泊综合治理与资源开发教育部重点实验室,江苏 南京 210098,河海大学环境学院,江苏 南京 210098,江苏环保产业技术研究院股份公司,江苏 南京,210036",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fd986714d9bd76e54b5dbcf",
              title: "CeO2/NaNbO3复合物的水热合成及其光催化性能的提高",
              author: "钱进,薛瑶,敖燕辉,王沛芳,王超",
              summary:
                "钙钛矿型NaNbO3由于其非线性光学、铁电、离子导电性、高声速、光催化性能和光折变等优良性能而备受关注. 在光催化反应中, 宽禁带宽度(≈ 3.24 eV)使NaNbO3具有较高的导带底(CBM)和较低的价带顶(VBM). 因此, 它表现出强烈的光氧化和光还原能力. 众所周知, 钙钛矿型光催化剂光电子激发和传输能力的增强归因于其较高的对称性. 因此, 具有高对称性的立方NaNbO3有利于电子激发和转移. 但是, 一些固有的缺点, 包括电荷分离效率低、量子产率差和光催化活性差等, 限制了其在光催化领域的实际应用. 为了解决这些问题, 一种有效的方法是与其他半导体结合, 形成具有改善光催化活性的异质结复合物. CeO2作为传统的催化剂在光催化领域得到了广泛研究. CeO2具有稳定、无毒的特点, 是一种n型半导体. 目前, 研究人员已经发现CeO2与不同半导体的耦合可以提高CeO2的光催化活性. 这归因于能级水平的适当匹配.本文通过简易水热法制备了高活性的CeO2/NaNbO3异质结复合物, 并采用X射线粉末衍射(XRD)、扫描电子显微镜(SEM)、透射电子显微镜(TEM, HRTEM)和紫外-可见漫反射光谱(DRS)等表征技术研究了所制光催化剂的物相结构、样品形貌和光学性能. 所制样品的光催化活性通过光催化降解无色抗菌环丙沙星(CIP)和染料罗丹明B(RhB)证实. 结果表明,在紫外和可见光照射, CeO2/NaNbO3复合物比纯NaNbO3具有更高的光催化活性. 此外, CeO2/NaNbO3复合物中CeO2的最佳质量比为2.0 wt%. 紫外光照射下光催化性能的显著提高是由于CeO2/NaNbO3异质结的形成不仅提高了光生电荷在界面范围内的迁移速率, 而且降低了光激发产生的电子和空穴的复合率. 可见光照射下内置电场的存在促进了电子和空穴的分离, 提高了光催化性能. 此外, 利用光致发光(PL)光谱、光电流、电化学阻抗谱和捕获实验证明了样品的光催化反应机理.捕获实验结果表明, ·OH自由基、·O2-自由基和空穴都参与了RhB的光催化降解过程. 最后, 探讨了提高光催化活性的可能机理.",
              url: null,
              keywords: "异质结;NaNbO3;CeO2;光催化",
              date: "2018-05-11",
              journal: "催化学报",
              organization:
                "河海大学环境学院浅水湖泊综合治理与资源开发教育部重点实验室,江苏南京,210098",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fcf8b53f8e0ce4cf895dc05",
              title: "河道沿岸芦苇带对氨氮的削减特性研究",
              author: "王超,王沛芳,唐劲松,杨敏",
              summary:
                "氨氮污染已成为我国江河湖库水质下降和水生态系统退化的重要因素之一.借助现场对比观测试验和理论分析的方法,研究不同季节氨氮对河流水质的影响规律,得到了雨洪初期汇流河流水质污染最为严重的结论.系统地研究了沿河岸芦苇带对氨氮的削减净化效应,得到了芦苇带吸附氨氮的主要影响因素为:芦苇生长期、水体污染物浓度、河道流速及气象条件.运用数值模拟和参数优化估算技术,确定氨氮在河道两岸有、无芦苇等植物条件下的衰减系数和削减量,分析了衰减系数的变化规律和削减量大小的影响因素,为河流水生态系统修复和水质预测预报提供科学依据.",
              url: null,
              keywords: "河岸芦苇带;氨氮;削减特性;水生态系统;水体污染",
              date: "2003-11-07",
              journal: "水科学进展",
              organization:
                "河海大学环境科学与工程学院,江苏,南京,210098,沂沐泗水利管理局,江苏,徐州,221009,盐城市水利局,江苏,盐城,224002",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fd986702ed54c7ff3aa3564",
              title: "雾天环境对高速公路车辆跟驰安全的影响",
              author: "刘兆惠,虞春滨,王超,李倩",
              summary:
                "为构建雾天高速公路车辆跟驰安全系统,针对高速公路车流特性,采用理论分析和仿真分析相结合方式,探讨了雾天环境对跟驰模型影响,并建立了行车安全标准.理论分析中,从雾天等级判定出发,通过雾情监测系统采集得到高速公路不同路段的气象信息,运用模糊聚类分析法对雾天等级进行划分,并对处于不同雾天等级的路段分别进行研究;通过重点考虑能见度对车速影响和路面湿度对摩擦系数影响,利用非线性拟合方法得出具体关系式,从而建立起雾天高速公路不同路段的跟驰安全距离模型.基于此,根据高速公路车辆运行特性,对模型适应性进行分析,并通过数据融合技术得到不同路段行驶速度和安全距离参考值,为驾驶员行驶安全提供理论依据.仿真分析中,分别利用MATLAB对气象信息进行聚类分析和Origin对非线性拟合结果进行误差分析,最后采用自适应加权平均算法和专家法得到行驶安全值.研究结果表明:雾天环境对于能见度和湿度影响相对较大,理想状态下的跟驰模型将不再适用,需及时更新车辆跟驰距离和限速值,可通过对跟驰模型进行修正来得到适应于不同雾天等级下的行车安全理论距离值.",
              url: null,
              keywords: "交通工程;交通安全;跟驰模型;非线性拟合;雾天;安全距离",
              date: "2019-09-24",
              journal: "重庆交通大学学报（自然科学版）",
              organization:
                "山东科技大学 交通学院,山东 青岛,266590,河海大学 土木与交通学院,江苏 南京,210098",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fd986732c5d1e7971868e2a",
              title: "氧化还原环境变化对河口沉积物硅影响的模拟",
              author: "朱华刚,王超,侯俊,苗令占,姚羽",
              summary:
                "氧化还原环境变化是水生态系统中普遍存在的环境现象,并可能对营养盐迁移转化产生显著影响.本文通过模拟分析好氧/缺氧状态下,典型河口沉积物硅释放及其赋存形态的差异,揭示了氧化还原环境变化对河口沉积物活性硅迁移转化的影响.研究结果表明,厌氧环境下,上覆水中溶解态硅的含量持续上升,在第30天可达4.23 mg·L-1;而好氧环境下上覆水中溶解态硅的含量维持在2.30 rng·L-1左右.其原因可能是厌氧环境下,表层沉积物中Fe/Mn氧化物发生生物还原,氧化层被逐渐破坏,促进溶解态硅的释放.另外,在短期培养过程当中,对于生物硅含量较低且其早期成岩改变程度较高的长江口沉积物而言,厌氧环境并不能有效促进沉积物生物硅的溶解.",
              url: null,
              keywords: "氧化还原变化;河口沉积物;硅释放;硅赋存形态;模拟研究",
              date: "",
              journal: "环境化学",
              organization:
                "河海大学环境学院,南京,210098,九江市水利电力规划设计院,九江,332000",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fd9e0a12c5d1e7971875111",
              title: "南水北调中线总干渠典型渠段水体自净能力研究",
              author: "王超,贾庆林,裴中平,王树磊,张爱静,尹炜",
              summary:
                "水体自净能力是影响水质指标变化的重要因素.以BOODO5降解系数作为自净能力表征,选取南水北调中线总干渠河南段程沟、方城、沙河南、兰河北、新峰、苏张等6个监测断面2015年1月至2015年7月逐月BOD5监测数据和研究渠段各节制闸的流量、水深等数据,采用稳态一维BOD5降解模型对总干渠BOD5降解系数进行拟合.结果 表明,研究渠段BOD5降解系数数值范围为0.024/d～0.054/d,与其他区域相比,总干渠的水体自净能力相对较小.研究渠段BOD5降解系数季节变化明显,1月--4月、7月的拟合k值分别为0.028 /d(p＜0.05),0.033/d(p＜0.05),0.024 /d(p＜0.05),0.039 /d(p＜0.05),0.054/d(p＜0.05);但5月、6月的拟合k值均不具有统计显著性(p＞0.05),可能是由于桥面和路面降雨径流形成了外源有机物污染输入,造成渠道BOD5浓度波动较大.总干渠自净能力受温度影响显著,BOD5降解系数基本随温度的升高而增大,温度校正系数θ值为1.039.",
              url: null,
              keywords: "自净能力;南水北调;中线总干渠;BOD5;降解系数",
              date: "2020-07-17",
              journal: "南水北调与水利科技",
              organization:
                "长江水资源保护科学研究所,武汉,430051,长江水资源保护科学研究所,武汉430051,河海大学环境学院,南京210098,南水北调中线干线工程建设管理局,北京,100038",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fcee2510ef03f04456d6ea8",
              title: "计及负荷静态特性的电力系统静态状态估计算法",
              author: "陆子刚,卫志农,孙国强,孙永辉,孙维真,王超",
              summary:
                "在常规状态估计模型的基础上，提出了考虑负荷节点静态电压特性的电力系统静态状态估计算法。该算法利用负荷幂函数模型或多项式模型，将负荷有功、无功功率等效为以节点电压幅值为变量的方程组，构建新的零注入功率量测，利用加权最小二乘法进行状态估计，在迭代计算中修正传统的雅克比矩阵以及不平衡偏差量。4节点、IEEE-39节点系统以及实际地区电网算例的仿真结果表明，该算法提高了状态估计量精度，具有较好的实用性。",
              url: null,
              keywords: "电力系统;状态估计;负荷静态特性;加权最小二乘法",
              date: "2014-02-18",
              journal: "河海大学学报（自然科学版）",
              organization:
                "河海大学可再生能源发电技术教育部工程研究中心,江苏南京,210098,浙江省电力公司,浙江杭州,310000",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fd986704d9bd76e54b5dbcc",
              title: "扰动条件对铜绿微囊藻生长及磷吸收的影响",
              author: "姚亮宇,王沛芳,任凌霄,王超,马晶杰,蒋如东",
              summary:
                "研究以铜绿微囊藻为研究对象,通过设置不同强度的水体扰动,研究了铜绿微囊藻生长状态与其对磷营养盐的吸收情况与水体扰动之间关系.结果表明,较小的水体扰动(25,100 r/min)有利于微囊藻的生长,并可提高藻类对磷的吸收效率曰较大的水体扰动(175 r/min)则对微囊藻的生长等情况产生了抑制效果,其生长状况明显较差.这可能是由于适度的扰动条件有利于环境中营养物质的均匀分布与藻类代谢产物的扩散导致,水体扰动对藻类的影响机制主要在于其影响了藻类对环境中营养盐的吸收与光合作用等.",
              url: null,
              keywords: "铜绿微囊藻;扰动;生长;磷吸收",
              date: "2018-04-02",
              journal: "环境科技",
              organization:
                "河海大学环境学院浅水湖泊综合治理与资源开发教育部重点实验室,江苏 南京,210098,江苏省水文水资源勘测局无锡分局,江苏 无锡,214000",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fd9b8e62c5d1e797186f7d1",
              title: "多目标电能质量监测器的优化配置",
              author: "卫志农,吴霜,孙国强,唐利锋,王超",
              summary:
                "针对电能质量监测器的优化配置问题，建立了以监测程度和监测器个数为指标的多目标优化配置模型。采用带精英策略的快速非支配排序遗传算法（non．domtnatedsoringgeneticalgorithm，NSGA．II），获得此多目标优化问题的Pareto最优解集。该方法能保证种群的多样性，避免传统加权求解时权值的选择和解的偏好性。最后，对Pareto最优解集的各个目标函数进行归一化处理，将最大值对应的方案作为合适的最优解。通过对2个算例进行仿真，得到了合理的电能质量监测器的配置方案，验证了该方法的可行性和有效性。",
              url: null,
              keywords:
                "电能质量监测器;优化配置;多目标进化算法;Pareto最优解;最优解处理",
              date: "2012-04-28",
              journal: "电网技术",
              organization:
                "可再生能源发电技术教育部工程研究中心河海大学,江苏省南京市,210098,浙江电力调度通信中心,浙江省杭州市,310007",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fd98b912ed54c7ff3aa40ef",
              title:
                '长江流域水环境问题研究之思考——基于流域演化"山-河-湖-海互动理论"的认识',
              author: "李长安,陈进,陈中原,王建,王超,范北林",
              summary:
                '长江水环境保护是维持长江健康生命的关键.针对由于水环境问题而引起的长江"亚健康"现状,从流域系统观出发,基于流域系统的演化"山-河-湖-海互动理论",从多学科综合研究的角度,提出了长江水环境问题在基础研究、应用研究和目标研究3个层次的研究思路,重点对人类活动和全球变化作用下长江流域山-河-湖-海相互作用及流域水环境演化规律、重大水环境问题的成因机理、流域水环境的承载能力及调控原理的研究内容和研究途径进行了论述.旨在引起人们对长江水环境问题研究的关注,推动长江水环境问题研究的开展,为新时期的治江战略制定服务.',
              url: null,
              keywords: "长江流域;水环境问题;流域环境系统",
              date: "2009-06-03",
              journal: "长江科学院院报",
              organization:
                "中国地质大学(武汉)地球科学学院,武汉430074,长江科学院,武汉,430010,华东师范大学,资源与环境学院,上海,200062,南京师范大学,地理科学学院,南京,210097,河海大学,环境学院,南京,210098",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fd986722c5d1e7971868e28",
              title: "结合阴影补偿的对象级高分辨率遥感影像多尺度变化检测",
              author: "王超,张雪红,石爱业,厉丹,申祎",
              summary:
                '阴影是遥感影像的解译标志之一,然而在高分辨率遥感影像变化检测中,阴影所产生的"伪变化"是导致错检的主要原因之一.为此,提出了一种结合阴影补偿与多尺度融合的对象级高分遥感影像变化检测方法.在面向对象的变化检测框架下,首先提取遥感影像中的地物阴影,然后对多尺度变化检测进行阴影补偿.其中,通过构建一种尺度间互信息最小化的目标函数实现了尺度参数的自适应提取.在此基础上,结合所提出的阴影补偿因子,设计了一种基于D-S证据理论的决策级多尺度融合策略,并进一步对变化强度等级进行了划分.实验证明,该方法能够较好地解决阴影所导致的错检问题,显著提高变化检测精度.',
              url: null,
              keywords: "高分辨率;遥感影像;变化检测;阴影补偿",
              date: "2018-11-05",
              journal: "通信学报",
              organization:
                "南京信息工程大学电子与信息工程学院,江苏南京,210044,南京信息工程大学地理与遥感学院,江苏南京,210044,河海大学计算机与信息学院,江苏南京,211100,徐州工程学院江苏省智慧工业控制技术重点建设实验室,江苏徐州,221000",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
            {
              _id: "5fce48e7dcc080670f9aa65e",
              title: "中国湖泊水环境基准的研究进展",
              author:
                "吴丰昌,孟伟,宋永会,刘征涛,金相灿,郑丙辉,王业耀,王圣瑞,姜霞,卢少勇,储昭升,陈艳卿,王超,华祖林,王沛芳,于志强,傅家谟",
              summary:
                '中国湖泊污染形势严峻、生态健康效应复杂,亟需适合中国区域特点的水环境基准作为加强污染控制、治理和管理的理论依据,但目前我国湖泊水环境基准的系统研究尚未开展,本文从水环境基准的意义、概念、研究历史、现状和发展趋势等几个方面对中国湖泊水环境基准研究进行了剖析回顾和展望:首先阐述了开展区域性水环境基准研究的迫切性和科学意义,揭示了"科学确定基准"的内涵;然后详细回顾了国内外湖泊水环境基准的研究历史、现状及存在的关键问题,提出了湖泊水环境基准的"三性"原则(科学性、基础性和区域性),指出环境暴露、效应识别和风险评估是基准研究的三个关键环节;最后提出中国湖泊水环境基准的研究方向和发展趋势,本文强调:阐明中国水环境的演变规律和特征,需要开展水环境污染过程和生态毒理效应研究;建立具有我国区域特点的湖泊水环境基准理论、技术和方法体系是面向国际科学前沿和解决中国环境管理重大科技需求的重要任务,它既可推动中国毒理学、生物学、生态学及环境与生物地球化学等学科的发展,又可为湖泊流域的环境管理和污染防治提供技术支撑,整体提升我国环境保护科学研究的水平和国际地位.',
              url: null,
              keywords: "湖泊;水环境基准;生态环境效应;环境管理;区域差异",
              date: "2009-02-23",
              journal: "环境科学学报",
              organization:
                "中国环境科学研究院,北京,100012,河海大学环境科学与工程系,南京,210098,中国科学院广州地球化学研究所,广州,510640",
              likes: 0,
              read: 0,
              change: false,
              sort: null,
              doi: "",
            },
          ],
        },
        patent: {
          msg: "Search success",
          response: "success",
          info: [
            {
              _id: "5fe1883d017ab446d8005c52",
              title: "一种光催化与生物净化一体式生态护岸砌块及其制备方法 ",
              summary:
                "本发明公开了一种光催化与生物净化一体式生态护岸砌块，光催化透水层、生物附着透水层和透水基体层从上向下依次首尾相互固定连接，光催化透水层表面包覆了纳米晶二氧化钛光催化薄膜层，生物附着透水层表面包裹了混凝土层，透水基体层中竖向开设若干个贯穿式的透水孔。本发明采用三层式结构，表面光催化透水层具有较好的结构强度和耐冲蚀性，并且可以在光线照射下对水体中难降解有机污染物进行光催化降解；中部的生物附着透水层具有较大的比表面积和表面粗糙度，没有阳光的直射有利于微生物的负载生长及N、P等污染物质的降解去除；底部的透水基体层具很好的结构强度，可保证高砌块服役过程中的稳定性和耐久性。 ",
              type: "发明专利 ",
              patentID: "CN201810293745.X ",
              applyDate: null,
              publishID: null,
              publicDate: null,
              mainTypeNumber: null,
              typeNumber: null,
              owner: "河海大学",
              designer: "饶磊,王沛芳,王超,蒋涛",
              address: null,
              agency: null,
              agent: null,
              code: null,
              description: null,
              status: null,
              read: null,
              change: false,
              sort: null,
            },
          ],
        },
        project: {
          msg: "Search success",
          response: "success",
          info: [
            {
              _id: "5fccdcde007fd9206fae2365",
              author: "王超",
              title: "“河口环境与生态安全评价及其调控原理”2010年年度报告",
              summary:
                "本研究围绕着计划任务开展了广泛的基础资料收集工作，包括：收集了长江中、下游至入海口范围内汉口、大通等水文站长系列的水位、流量、输沙率、含沙量等资料；收集了长江入海口典型断面历史潮位资料；收集了重大水利工程（包括三峡工程、南水北调工程以及引江济太工程等）的规划设计资料。在此基础上，围绕本年度的研究重点，对资料进行整理分析，开展了较为深入的研究工作。在过去的一年中，课题组成员主要围绕历史水利工程对长江河口区域的水质、地貌、水文特性、水生物群落等多方面的影响，通过阅读文献、收集资料、实地调研、研制试验装置等做了大量的研究工作，得到了历史水利工程对长江河口环境与生态安全的影响因素等的一些初步认识。",
              company: "河海大学",
              keywords: "长江口;生态环境;评价;调控",
              year: 2010,
              scope: null,
              plan: null,
              read: 0,
              change: false,
              sort: null,
            },
            {
              _id: "5fccebc4007fd9206fae2ec3",
              author: "王超",
              title: "“重大水利工程影响下长江口环境与生态安全”2010年度报告",
              summary:
                "本研究已取得一些阶段性重要进展：已顺利完成长江流域历史水文、泥沙资料，长江口口水环境和生物数据等的收集和整理，已完成重大水利工程的设计调度方案的收集工作，已完成长江口区域采样点的布设和部分样品的采集工作，并积极开展室内实验研究。",
              company: "河海大学",
              keywords: "长江口;大型水利工程;生态环境;生态安全",
              year: 2010,
              scope: null,
              plan: null,
              read: 0,
              change: false,
              sort: null,
            },
            {
              _id: "5fccf1d3007fd9206fae3303",
              author: "王超",
              title: "重大水利工程影响下长江口环境与生态安全2013年年度报告",
              summary:
                "(1)本年度围绕长江口及其附近海域水文要素变化历史和趋势、三维斜压流系预报、波浪预报、水盐动态过程等方面，完成了以下内容：修正了大通站流量序列，建立了东中国海环流大模型和海域三维斜压水流数学模型；优化了CDW-NF混合数值模型；研究评估了双导堤工程对长江口波浪场影响和2010-2012年河口盐渍化演变状况。 (2)本年度取得了以下进展：1、三峡蓄水后宜昌站占大通站输沙比例大幅减小，并且各粒径组占大通比例也减少； 2、三峡水库调蓄作用对下泄径流略有增强，并且三峡水库枯季有补水作用，有效抑制长江口青草沙蓄淡水库工程盐水入侵程度；3、三峡蓄水利于枯水汊发展、洪水汊萎缩，而汊道滩槽的整体将呈现冲刷趋势。 (3)通过长江口水环境现状调查和现场实验以及室内实验，结合历史资料，完成了重大水利工程作用下长江口重金属和有机物迁移转化规律研究工作，揭示了重大水利工程作用下长江口典型污染物迁移转化机理；揭示了不同时空尺度下河口区水环境演变过程的驱动机制，建立了改进的水动力学模型；以走马塘工程为例完成了“引江济太”工程对长江口水环境的影响机制研究。 (4)采用EcoPath建立水生态系统状态转换模型，分析了长江口生态系统在三峡工程运行前后的变化及其未来可能趋势；采用假设情景方法，分析了未来水沙的不同变异情势下长江口生态系统的响应。 (5)通过现状调查掌握了长江河口鱼类和甲壳类的时空分布特点；通过室内实验研究了长江口及周边海域鱼类的洄游生态学，研究了盐度、氨氮对鱼卵的影响和沉积物浸出液对虾幼体的影响试验。",
              company: "河海大学",
              keywords: "长江口;大型水利工程;生态环境;生态安全",
              year: 2010,
              scope: null,
              plan: null,
              read: 0,
              change: false,
              sort: null,
            },
            {
              _id: "5fccf230007fd9206fae333d",
              author: "王超",
              title: "重大水利工程影响下长江口环境与生态安全研究立项报告",
              summary:
                "随着长江流域水资源开发利用程度不断增强，重大水利工程建设规模迅速扩大，导致长江口入海水沙量显著减少、水质不断恶化、河口动力沉积与地貌剧变及生态系统结构和功能逐渐退化。科学地预测重大水利工程影响下河口环境与生态系统的发展趋势，评估其健康安全程度，提出科学合理的调控对策，是国家在战略层面上决策的重大需求。 拟解决的关键科学问题：长江口水沙和污染物输移过程及其对水动力、水环境和地形地貌演变的驱动机制；长江口环境与生态系统对变化条件的响应过程和适应机理；河口环境与生态安全的评估方法及调控理论。 主要研究内容：第一方面：重大水利工程影响下长江口物理与化学效应，包括长江口海域水动力过程、重大水利工程影响下河口水沙和地貌变化过程、重大水利工程影响下河口水环境变化过程与效应；第二方面：河口生态系统对变化条件的响应过程与机制，包括河口生态系统结构和功能演变过程及影响机制、河口生态系统对重大水利工程的响应过程和机理、河口生境条件改变对重要生物资源的影响；第三方面：河口环境与生态安全评价及调控理论与对策，包括河口环境与生态安全健康的评判因子和指标体系、河口环境与生态安 的临界水沙条件、河口生态系统结构和功能恢复理论、河口环境与生态安全的流域水利工程控制对策、重大水利工程影响下河口环境与生态安全系统整体模式。 With the development and utilization of water resources in the Yangtze River Basin growing degree, major water conservancy project construction scale expanding rapidly, leading to the mouth of the Yangtze River into the sea sand content was reduced significantly, worsening water quality, dynamic estuarine sedimentary and geomorphic changes and the structure and function of ecosystem degradation. Scientific prediction on the trend of major water conservancy project under the effect of estuarine environment and ecological system, evaluate its health and safety degree, some measures are put forward in a scientific and reasonable, is the major needs of the country at the strategic level decision. Key science problems: the Yangtze River sediment and pollutant transport processes and slobber on hydrodynamic, water environment and Topography Evolution driving mechanism; Yangtze River estuary environment and ecosystem response to changing conditions and adaptive mechanism; evaluation method of estuarine environment and ecological security and control theory. The main research contents: First: the impact of major water conservancy project in the Yangtze River Estuary physical and chemical effects, including the effect of water dynamic process, major water conservancy project in the Yangtze River Estuary under the estuary sediment Change process under the river slobber environment and effect and geomorphic processes, major water conservancy engineering; second aspects: response processes and mechanism of estuarine ecosystem to change conditions, including the estuarine ecosystem structure and function, evolution and influence mechanism of estuarine ecosystem on the major water conservancy engineering response process and mechanism, estuarine habitats condition change on the influence of important biological resources; Third aspects: evaluation and control theory and Countermeasure of estuarine environment and ecological security, including the estuarine environment and ecological safety and health evaluation factors and index system, estuarine environment and ecological security The critical conditions of water and sediment, estuary ecosystem structure and function theory, the estuarine environment and ecological security of river basin water conservancy engineering control measures of major water conservancy project, under the influence of environmental and ecological safety of estuary system model.",
              company: "河海大学",
              keywords: "长江口;大型水利工程;生态环境;生态安全",
              year: 2010,
              scope: null,
              plan: null,
              read: 0,
              change: false,
              sort: null,
            },
            {
              _id: "5fcdccffd4926b6ff57ef214",
              author: "王超",
              title: "“河口环境与生态安全评价及其调控原理”研究",
              summary:
                "近半个世纪，由于城市化、施肥、引水、建坝等人类活动的影响，长江口及邻近海域的氮、磷、硅比值的失衡使得甲藻类在浮游植物群落中所占比例大增，导致了硅藻比例下降，长江口海域甲藻类赤潮频繁发生，这是长江口生态系统发生恶化的强烈信号。研究流域水沙条件改变对河口硅循环过程有助于解河口生态系统的变化。 本研究基于2012-2013年度4次现场采集的水样及表层沉积物样品中各形态硅的检测结果，对河口区硅的迁移转化过程做了初步的研究。结果表明，河口淡水端溶解态硅含量持续下降。在河口区，溶解态硅的分布主要受咸淡水的物理混合过程控制。另外，生物移出及悬浮物中扰动再释放对硅的迁移也有重要影响。在调查时段内，春季水体中DSi的扰动释放与生物移出保持平衡，夏季生物移出作用明显，枯水期（秋冬两季）扰动释放作用大于生物移出作用。沉积物中各形态硅呈现出海向的递增趋势。各形态硅的分布情况与沉积环境关系密切。在流速较快的河道区域，沉积颗粒较粗，各形态硅的含量较低；而在水下三角洲区域，沉积物以细颗粒沉积物为主，各形态硅含量较高。 Nearly half a century, due to the impact of city, fertilization, water diversion, dam and other human activities, nitrogen, phosphorus, silicon ratio imbalance in the Yangtze Estuary and adjacent waters that dinoflagellates in the phytoplankton community in the proportion of large diatoms, led to a decline in the proportion of Yangtze River Estuary, the frequent occurrence of red tide dinoflagellate class, this is strong signal ecosystem deterioration of the Yangtze River estuary. The conditions of water and sediment of basin change on estuarine silicon cycling process contributes to the solution of the estuary ecosystem.Detection results of different forms of silicon based on the 2012-2013 4 field collected water samples and sediment samples in this study, the migration and transformation process of the estuary of silicon makes preliminary study. The results show that, estuarine freshwater end dissolved silicon content decreased continuously. In the estuary, the distribution of dissolved silicon is mainly controlled by physical mixing process of fresh water and salt water control. In addition, and then release the migration of silicon also have important influence disturbance creature from and suspended matter in. During the investigation period, release from disturbance and biological spring of DSi in the water balance, the summer creature from the obvious role, the dry season (two seasons) disturbance release effect than creature from the role. The morphology of silicon in the sediments showed increasing trend towards the sea. The relationship between distribution and sedimentary environment of different forms of silicon in close. In the fast flow of river region, deposition of coarse particles, content of different forms of silicon is low; while in the underwater delta, sediments with fine-grained sediments, the morphology of high silicon content.",
              company: "河海大学",
              keywords: "河口环境;生态安全评价;大型水利工程;硅循环",
              year: 2010,
              scope: null,
              plan: null,
              read: 0,
              change: false,
              sort: null,
            },
            {
              _id: "5fce0639dcc080670f9a90f2",
              author: "王超",
              title: "重大水利工程影响下长江口环境与生态安全研究",
              summary:
                "本研究内容主要为以下三个方面：（1）重大水利工程影响下长江口物理与化学效应；（2）河口生态系统对变化条件的响应过程与机制；（3）第三方面：河口环境与生态安全评价及调控理论与对策。围绕上述问题，各专题已完成以下研究内容：（1）建立了徐六泾、天生港等单站调和分析及预报模型；建立长江口及其邻近海域三维斜压流场和盐度场模型;建立东中国海—长江口平面二维嵌套潮波预报模型；建立了长江口“上游洪水—风暴潮—天文大潮”综合数学模型；复演了长江口海域大范围、长时间序列波浪过程。（2）揭示了重大水利工程对宜昌水、沙过程影响；分析了长江江湖系统对水库下游泥沙输移的影响及长江近河口段水沙输移特征；进行了长江河口水、沙、盐输移规律和机理研究。（3）分析了长江口水环境变化历史过程；确定了长江口典型污染物和时空分布特征；选择典型污染物为主要研究对象，考察水动力条件、水化学特征和生物因素等对典型污染物迁移转化规律的影响；初步探索长江口与太湖流域河网和湖泊水污染的互动机制。（4）分析了长江口1959至2010年关键时期水生态指标时空变化；建立了基于无结构网格的长江口水动力模型，并进行了计算和盐度校正。完成了长江口生态系统状态划分及其表征,达到目标；完成了状态转化机制的分析,达到目标；完成了长江口生态动力学模型的验证。（5）初步掌握长江口主要生物资源、底栖生物的群落结构特征，包括空间分布及季节变化特征；初步获得了盐度、污染物等生态因子对实验生物胚胎发育和幼体生长影响的毒理数据。（6）初步筛选了河口环境与生态安全的主控因子；得到了影响河口环境与生态安全的主要影响影响因素；开展了河口生态安全健康评价方法及理论研究，基本确立了重大水利工程影响下长江河口生态环境安全评价指标体系构建的理论依据、原则和构建方法；开展了长江口生态安全的调度模型及求解方法研究，基本建立了长江口生态安全的调度模型，并以蚁群算法对调度模型进行求解，得出了初步的调度方案。",
              company: "河海大学",
              keywords: "长江口;大型水利工程;生态环境;生态安全",
              year: 2010,
              scope: null,
              plan: null,
              read: 0,
              change: false,
              sort: null,
            },
          ],
        },
        publishYear: [
          {
            name: "2012",
            value: 1,
          },
          {
            name: "2010",
            value: 6,
          },
          {
            name: "2020",
            value: 2,
          },
          {
            name: "2009",
            value: 3,
          },
          {
            name: "2008",
            value: 1,
          },
          {
            name: "2019",
            value: 8,
          },
          {
            name: "2007",
            value: 1,
          },
          {
            name: "2018",
            value: 3,
          },
          {
            name: "2004",
            value: 3,
          },
          {
            name: "2015",
            value: 3,
          },
          {
            name: "2003",
            value: 1,
          },
          {
            name: "2014",
            value: 1,
          },
        ],
        scholarKeywords: [
          {
            name: "湖泊沉积物",
            value: 1,
          },
          {
            name: "生态节水型灌区",
            value: 1,
          },
          {
            name: "优化配置",
            value: 1,
          },
          {
            name: "洪泽湖",
            value: 1,
          },
          {
            name: "河岸芦苇带",
            value: 1,
          },
          {
            name: "壬酸",
            value: 1,
          },
          {
            name: "现状",
            value: 1,
          },
          {
            name: "自然水环境",
            value: 1,
          },
          {
            name: "氨氮",
            value: 1,
          },
          {
            name: "加权最小二乘法",
            value: 1,
          },
          {
            name: "盾构重复使用",
            value: 1,
          },
          {
            name: "重金属",
            value: 1,
          },
          {
            name: "生态安全评价",
            value: 1,
          },
          {
            name: "生态问题",
            value: 1,
          },
          {
            name: "荧光猝灭试验",
            value: 1,
          },
          {
            name: "调控",
            value: 1,
          },
          {
            name: "水体污染",
            value: 2,
          },
          {
            name: "hoc网络",
            value: 1,
          },
          {
            name: "传统采样技术",
            value: 1,
          },
          {
            name: "元数据检索",
            value: 1,
          },
          {
            name: "长江口",
            value: 5,
          },
          {
            name: "邻苯二酚",
            value: 1,
          },
          {
            name: "鲫鱼",
            value: 1,
          },
          {
            name: "多租户访问控制",
            value: 1,
          },
          {
            name: "流动建成区",
            value: 1,
          },
          {
            name: "多功能模型试验台",
            value: 1,
          },
          {
            name: "高分辨率",
            value: 1,
          },
          {
            name: "增压速率",
            value: 1,
          },
          {
            name: "数据交换",
            value: 1,
          },
          {
            name: "变化检测",
            value: 1,
          },
          {
            name: "状态估计",
            value: 1,
          },
          {
            name: "迁移转化",
            value: 1,
          },
          {
            name: "生物强化",
            value: 1,
          },
          {
            name: "扰动",
            value: 1,
          },
          {
            name: "农药污染",
            value: 1,
          },
          {
            name: "工程思维",
            value: 1,
          },
          {
            name: "湖泊",
            value: 1,
          },
          {
            name: "现场观测",
            value: 1,
          },
          {
            name: "水环境基准",
            value: 1,
          },
          {
            name: "中线总干渠",
            value: 1,
          },
          {
            name: "生态环境",
            value: 5,
          },
          {
            name: "数据共享",
            value: 1,
          },
          {
            name: "遥感影像",
            value: 1,
          },
          {
            name: "电力系统",
            value: 1,
          },
          {
            name: "污水厂",
            value: 1,
          },
          {
            name: "水泵",
            value: 1,
          },
          {
            name: "排水系统",
            value: 1,
          },
          {
            name: "生长",
            value: 1,
          },
          {
            name: "研究进展",
            value: 1,
          },
          {
            name: "泥水盾构",
            value: 2,
          },
          {
            name: "污水处理系统",
            value: 1,
          },
          {
            name: "区域差异",
            value: 1,
          },
          {
            name: "合流制",
            value: 1,
          },
          {
            name: "泥膜",
            value: 1,
          },
          {
            name: "Pareto最优解",
            value: 1,
          },
          {
            name: "青蒿素",
            value: 1,
          },
          {
            name: "异质结",
            value: 1,
          },
          {
            name: "水质标准",
            value: 1,
          },
          {
            name: "法规体系",
            value: 1,
          },
          {
            name: "开舱措施",
            value: 1,
          },
          {
            name: "水源地保护",
            value: 1,
          },
          {
            name: "BOD5",
            value: 1,
          },
          {
            name: "农田土壤",
            value: 1,
          },
          {
            name: "安全距离",
            value: 1,
          },
          {
            name: "GM(1,1)模型",
            value: 1,
          },
          {
            name: "RESTful服务",
            value: 1,
          },
          {
            name: "纠删码",
            value: 1,
          },
          {
            name: "泥浆处理",
            value: 1,
          },
          {
            name: "水轮机",
            value: 1,
          },
          {
            name: "太湖",
            value: 1,
          },
          {
            name: "硅释放",
            value: 1,
          },
          {
            name: "原位采样技术",
            value: 1,
          },
          {
            name: "跟驰模型",
            value: 1,
          },
          {
            name: "生化指标",
            value: 1,
          },
          {
            name: "生态环境效应",
            value: 1,
          },
          {
            name: "闸坝",
            value: 1,
          },
          {
            name: "微生物聚集体",
            value: 1,
          },
          {
            name: "中国",
            value: 1,
          },
          {
            name: "多目标进化算法",
            value: 1,
          },
          {
            name: "地表水质量标准",
            value: 1,
          },
          {
            name: "NaNbO3",
            value: 1,
          },
          {
            name: "数学模型",
            value: 1,
          },
          {
            name: "模拟研究",
            value: 1,
          },
          {
            name: "异构数据",
            value: 1,
          },
          {
            name: "自净能力",
            value: 1,
          },
          {
            name: "硅循环",
            value: 1,
          },
          {
            name: "国外城市",
            value: 1,
          },
          {
            name: "阴影补偿",
            value: 1,
          },
          {
            name: "水安全",
            value: 1,
          },
          {
            name: "渔业资源",
            value: 1,
          },
          {
            name: "地下水环境",
            value: 1,
          },
          {
            name: "交通安全",
            value: 1,
          },
          {
            name: "云存储",
            value: 1,
          },
          {
            name: "As生物有效性",
            value: 1,
          },
          {
            name: "河口沉积物",
            value: 1,
          },
          {
            name: "电能质量监测器",
            value: 1,
          },
          {
            name: "灌区建设",
            value: 1,
          },
          {
            name: "评价",
            value: 1,
          },
          {
            name: "掺混扩散",
            value: 1,
          },
          {
            name: "刀具磨损",
            value: 1,
          },
          {
            name: "饮用水水源",
            value: 1,
          },
          {
            name: "没食子酸",
            value: 1,
          },
          {
            name: "灰色动态模型群",
            value: 1,
          },
          {
            name: "雨水径流",
            value: 1,
          },
          {
            name: "非线性拟合",
            value: 1,
          },
          {
            name: "污染物",
            value: 1,
          },
          {
            name: "饮用水",
            value: 1,
          },
          {
            name: "移动Ad",
            value: 1,
          },
          {
            name: "荧光光谱",
            value: 1,
          },
          {
            name: "城市污水",
            value: 1,
          },
          {
            name: "硅赋存形态",
            value: 1,
          },
          {
            name: "压气条件",
            value: 1,
          },
          {
            name: "负荷静态特性",
            value: 1,
          },
          {
            name: "铜绿微囊藻",
            value: 2,
          },
          {
            name: "污染河道",
            value: 1,
          },
          {
            name: "水生态系统",
            value: 1,
          },
          {
            name: "前景",
            value: 1,
          },
          {
            name: "光催化",
            value: 1,
          },
          {
            name: "环境管理",
            value: 1,
          },
          {
            name: "南水北调",
            value: 1,
          },
          {
            name: "水利信息化",
            value: 1,
          },
          {
            name: "分布式",
            value: 1,
          },
          {
            name: "生物多样性",
            value: 1,
          },
          {
            name: "灰色预测",
            value: 1,
          },
          {
            name: "大型水利工程",
            value: 5,
          },
          {
            name: "去除率",
            value: 1,
          },
          {
            name: "交通工程",
            value: 1,
          },
          {
            name: "修复",
            value: 1,
          },
          {
            name: "水鸟栖息地",
            value: 1,
          },
          {
            name: "开挖面稳定",
            value: 1,
          },
          {
            name: "测量试验",
            value: 1,
          },
          {
            name: "砷污染",
            value: 1,
          },
          {
            name: "天然有机质",
            value: 1,
          },
          {
            name: "CeO2",
            value: 1,
          },
          {
            name: "混合污水",
            value: 1,
          },
          {
            name: "抗氧化酶",
            value: 1,
          },
          {
            name: "危机",
            value: 1,
          },
          {
            name: "严重退化",
            value: 1,
          },
          {
            name: "磷吸收",
            value: 1,
          },
          {
            name: "长江流域",
            value: 2,
          },
          {
            name: "地下水",
            value: 1,
          },
          {
            name: "进气值",
            value: 1,
          },
          {
            name: "流域环境系统",
            value: 1,
          },
          {
            name: "降解系数",
            value: 1,
          },
          {
            name: "水环境问题",
            value: 1,
          },
          {
            name: "虚拟点源",
            value: 1,
          },
          {
            name: "水质预测",
            value: 1,
          },
          {
            name: "扩散器",
            value: 1,
          },
          {
            name: "生态安全",
            value: 4,
          },
          {
            name: "流速",
            value: 1,
          },
          {
            name: "循环管路系统",
            value: 1,
          },
          {
            name: "最优解处理",
            value: 1,
          },
          {
            name: "河口环境",
            value: 1,
          },
          {
            name: "金属纳米材料",
            value: 1,
          },
          {
            name: "氧化还原变化",
            value: 1,
          },
          {
            name: "雾天",
            value: 1,
          },
          {
            name: "削减特性",
            value: 1,
          },
          {
            name: "流动建立区",
            value: 1,
          },
          {
            name: "灌区技术体系",
            value: 1,
          },
        ],
        collaborators: [
          {
            name: "陈进",
            value: 1,
          },
          {
            name: "朱伟",
            value: 2,
          },
          {
            name: "王洵",
            value: 1,
          },
          {
            name: "施玥",
            value: 1,
          },
          {
            name: "饶磊",
            value: 1,
          },
          {
            name: "尹炜",
            value: 1,
          },
          {
            name: "郑丙辉",
            value: 1,
          },
          {
            name: "华祖林",
            value: 1,
          },
          {
            name: "赵伟伟",
            value: 1,
          },
          {
            name: "孙永辉",
            value: 1,
          },
          {
            name: "陈新方",
            value: 1,
          },
          {
            name: "贾庆林",
            value: 1,
          },
          {
            name: "刘征涛",
            value: 1,
          },
          {
            name: "包天力",
            value: 1,
          },
          {
            name: "卫志农",
            value: 2,
          },
          {
            name: "李倩",
            value: 1,
          },
          {
            name: "孙国强",
            value: 2,
          },
          {
            name: "冯读庆",
            value: 1,
          },
          {
            name: "王树磊",
            value: 1,
          },
          {
            name: "张爱静",
            value: 1,
          },
          {
            name: "敖燕辉",
            value: 2,
          },
          {
            name: "孙维真",
            value: 1,
          },
          {
            name: "姚羽",
            value: 3,
          },
          {
            name: "姚亮宇",
            value: 1,
          },
          {
            name: "金相灿",
            value: 1,
          },
          {
            name: "薛瑶",
            value: 1,
          },
          {
            name: "孟伟",
            value: 1,
          },
          {
            name: "兰林",
            value: 1,
          },
          {
            name: "李长安",
            value: 1,
          },
          {
            name: "陆子刚",
            value: 1,
          },
          {
            name: "李勇",
            value: 1,
          },
          {
            name: "范秀磊",
            value: 1,
          },
          {
            name: "王文远",
            value: 1,
          },
          {
            name: "任凌霄",
            value: 1,
          },
          {
            name: "王建",
            value: 1,
          },
          {
            name: "虞春滨",
            value: 1,
          },
          {
            name: "陈娟",
            value: 1,
          },
          {
            name: "宋永会",
            value: 1,
          },
          {
            name: "姜霞",
            value: 1,
          },
          {
            name: "王业耀",
            value: 1,
          },
          {
            name: "胡涧楠",
            value: 1,
          },
          {
            name: "李玉蕴",
            value: 1,
          },
          {
            name: "刘兆惠",
            value: 1,
          },
          {
            name: "郑源",
            value: 1,
          },
          {
            name: "姜康",
            value: 1,
          },
          {
            name: "裴中平",
            value: 1,
          },
          {
            name: "赵硕平",
            value: 1,
          },
          {
            name: "冯钧",
            value: 2,
          },
          {
            name: "张楠楠",
            value: 1,
          },
          {
            name: "唐劲松",
            value: 1,
          },
          {
            name: "范北林",
            value: 1,
          },
          {
            name: "吴丰昌",
            value: 1,
          },
          {
            name: "吉栋梁",
            value: 1,
          },
          {
            name: "傅家谟",
            value: 1,
          },
          {
            name: "钱进",
            value: 2,
          },
          {
            name: "蒋如东",
            value: 1,
          },
          {
            name: "储昭升",
            value: 1,
          },
          {
            name: "厉丹",
            value: 1,
          },
          {
            name: "王圣瑞",
            value: 1,
          },
          {
            name: "胡斌",
            value: 1,
          },
          {
            name: "唐利锋",
            value: 1,
          },
          {
            name: "钱勇进",
            value: 2,
          },
          {
            name: "闵凡路",
            value: 2,
          },
          {
            name: "吴霜",
            value: 1,
          },
          {
            name: "李如忠",
            value: 1,
          },
          {
            name: "于志强",
            value: 1,
          },
          {
            name: "包振琪",
            value: 1,
          },
          {
            name: "万雷鸣",
            value: 1,
          },
          {
            name: "苗令占",
            value: 2,
          },
          {
            name: "陈中原",
            value: 1,
          },
          {
            name: "李平",
            value: 1,
          },
          {
            name: "高寒",
            value: 1,
          },
          {
            name: "王璐",
            value: 1,
          },
          {
            name: "杨敏",
            value: 1,
          },
          {
            name: "石爱业",
            value: 1,
          },
          {
            name: "张雪红",
            value: 1,
          },
          {
            name: "朱华刚",
            value: 1,
          },
          {
            name: "陈艳卿",
            value: 1,
          },
          {
            name: "甘小蓉",
            value: 1,
          },
          {
            name: "侯俊",
            value: 5,
          },
          {
            name: "申祎",
            value: 1,
          },
          {
            name: "唐志贤",
            value: 2,
          },
          {
            name: "马晶杰",
            value: 1,
          },
          {
            name: "徐超",
            value: 1,
          },
          {
            name: "王沛芳",
            value: 10,
          },
          {
            name: "卢少勇",
            value: 1,
          },
          {
            name: "杨超慧",
            value: 1,
          },
        ],
      },
    };
  },
  create() {},
  mounted() {
    const _this = this;
    this.$axios
      .get("analysis/researcher/" + _this.all.scholarInfo.scholarID, {
        headers: { token: window.localStorage.getItem("token") },
      })
      .then((res) => {
        _this.all = res.data;
      });

    this.biblioCount =
      this.all.paperCount + this.all.patentCount + this.all.projectCount;
    this.paperProgress = ((this.all.paperCount / this.biblioCount) * 100)
      .toFixed(2)
      .toString();
    this.patentProgress = ((this.all.patentCount / this.biblioCount) * 100)
      .toFixed(2)
      .toString();
    this.projectProgress = ((this.all.projectCount / this.biblioCount) * 100)
      .toFixed(2)
      .toString();

    //console.log(this.paperProgress);
    //console.log(this.patentProgress);
    //console.log(this.projectProgress);
  },
  methods: {
    // 发送验证邮件
    verification() {
      this.verificationDialogVisible = true;
      this.verificationBoxVisible = false;
      if (!this.hasSendEmail) {
        var scholarID = this.all.scholarInfo.scholarID;
        console.log(scholarID);
        var token = window.localStorage.getItem("token");
        console.log(token);

        this.$axios
          .post(
            "/user/verificatio",
            {
              params: {
                researcherID: this.all.scholarInfo.scholarID,
              },
            },
            { verification_code: this.verificationForm.verification_code },
            { headers: { token: token } }
          )
          .then((response) => {
            var msg = response.data.msg;
            console.log(msg);
            if (msg === "Send verification code successfully") {
              this.hasSendEmail = true;
              this.verificationBoxVisible = true;
            } else if (msg === "Email format error") {
              this.verificationErrorVisible = true;
              this.verificationErrorInfo = "邮箱格式错误";
              this.$message.error("邮箱格式错误");
            } else if (msg === "Unsupported mailbox") {
              this.verificationErrorVisible = true;
              this.verificationErrorInfo = "不支持您的邮箱类型";
              this.$message.error("不支持您的邮箱类型");
            } else if (msg === "please login first") {
              this.verificationErrorVisible = true;
              this.verificationErrorInfo = "请先登录";
              this.$message.error("请先登录");
            }
          })
          .catch((error) => {
            console.log(error);
            console.log("请求异常");
          });
      } else {
        this.verificationBoxVisible = true;
      }
    },
    // 发送验证码
    claim() {
      this.$refs.verificationFormRef.validate((valid) => {
        if (!valid) return;

        var scholarID = this.all.scholarInfo.scholarID;
        console.log(scholarID);
        var token = window.localStorage.getItem("token");
        console.log(token);

        this.$axios
          .post(
            "/user/claim?researcherID=" + scholarID,
            { verification_code: this.verificationForm.verification_code },
            { headers: { token: token } }
          )
          .then((response) => {
            var msg = response.data.msg;
            console.log(msg);
            if (msg === "claim successfully") {
              this.$message.success("认证成功");
              this.verificationDialogClosed();
            } else if (msg === "Wrong verification code") {
              this.$message.error("验证码错误");
            } else if (msg === "please login first") {
              this.verificationErrorVisible = true;
              this.verificationErrorInfo = "请先登录";
              this.$message.error("请先登录");
            }
          })
          .catch((error) => {
            console.log(error);
            console.log("请求异常");
          });
      });
    },
    // 关闭验证弹窗
    verificationDialogClosed() {
      this.verificationDialogVisible = false;
      this.verificationErrorVisible = false;
      // this.$refs.verificationFormRef.resetFields()
      this.verificationForm.verification_code = "";
    },
    // 上传论文
    uploadPaper() {
      this.$refs.uploadPaperFormRef.validate((valid) => {
        if (!valid) return;
        var scholarID = this.all.scholarInfo.scholarID;
        console.log(scholarID);
        var token = window.localStorage.getItem("token");
        console.log(token);

        let uploadPaperForm = {
          author: this.uploadPaperForm.author,
          title: this.uploadPaperForm.title,
          summary: this.uploadPaperForm.summary,
          url: this.uploadPaperForm.url,
          keywords: this.uploadPaperForm.keywords,
          journal: this.uploadPaperForm.journal,
          organization: this.uploadPaperForm.organization,
        };
        // console.log(uploadPaperForm)
        this.$axios
          .post("/user/paper/add?ResearcherID=" + scholarID, uploadPaperForm, {
            headers: { token: token },
          })
          .then((response) => {
            var msg = response.data.msg;
            console.log(msg);
            if (msg === "successfully") {
              this.$message.success("上传成功");
              this.achievementType = null;
              this.uploadPaperForm = {};
              this.uploadAchievementDialogVisible = false;
            } else if (msg === "You have no authority") {
              this.$message.error("您没有权限");
            } else if (msg === "please login first") {
              this.$message.error("请先登录");
            }
          })
          .catch((error) => {
            console.log(error);
            console.log("请求异常");
          });
        console.log(this.achievementType);
      });
    },
    // 上传专利
    uploadPatent() {
      this.$refs.uploadPatentFormRef.validate((valid) => {
        if (!valid) return;

        var scholarID = this.all.scholarInfo.scholarID;
        console.log(scholarID);
        var token = window.localStorage.getItem("token");
        console.log(token);

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
        };

        // console.log(uploadPatentForm)

        this.$axios
          .post(
            "/user/patent/add?ResearcherID=" + scholarID,
            uploadPatentForm,
            {
              headers: { token: token },
            }
          )
          .then((response) => {
            var msg = response.data.msg;
            console.log(msg);
            if (msg === "successfully") {
              this.$message.success("上传成功");
              this.achievementType = null;
              this.uploadPatentForm = {};
              this.uploadAchievementDialogVisible = false;
            } else if (msg === "You have no authority") {
              this.$message.error("您没有权限");
            } else if (msg === "please login first") {
              this.$message.error("请先登录");
            }
          })
          .catch((error) => {
            console.log(error);
            console.log("请求异常");
          });
      });
    },
    // 上传项目
    uploadProject() {
      this.$refs.uploadProjectFormRef.validate((valid) => {
        if (!valid) return;

        var scholarID = this.all.scholarInfo.scholarID;
        console.log(scholarID);
        var token = window.localStorage.getItem("token");
        console.log(token);

        let uploadProjectForm = {
          author: this.uploadProjectForm.author,
          title: this.uploadProjectForm.title,
          summary: this.uploadProjectForm.summary,
          company: this.uploadProjectForm.company,
          keywords: this.uploadProjectForm.keywords,
          year: this.uploadProjectForm.year,
          scope: this.uploadProjectForm.scope,
          plan: this.uploadProjectForm.plan,
        };
        // console.log(uploadProjectForm)
        this.$axios
          .post(
            "/user/project/add?ResearcherID=" + scholarID,
            uploadProjectForm,
            {
              headers: { token: token },
            }
          )
          .then((response) => {
            var msg = response.data.msg;
            console.log(msg);
            if (msg === "successfully") {
              this.$message.success("上传成功");
              this.achievementType = null;
              this.uploadProjectForm = {};
              this.uploadAchievementDialogVisible = false;
            } else if (msg === "You have no authority") {
              this.$message.error("您没有权限");
            } else if (msg === "please login first") {
              this.$message.error("请先登录");
            }
          })
          .catch((error) => {
            console.log(error);
            console.log("请求异常");
          });
      });
    },
    // 上传学术成果
    uploadAchievement() {
      if (this.achievementType === "论文") {
        this.uploadPaper();
      } else if (this.achievementType === "专利") {
        this.uploadPatent();
      } else if (this.achievementType === "研究项目") {
        this.uploadProject();
      }
    },
    pageTurnTo() {},
  },
};
