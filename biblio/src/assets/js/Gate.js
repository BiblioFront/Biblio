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
      scholarKeywords: [
        {
          name: "十九大精神",
          value: 15000,
        },
        {
          name: "两学一做",
          value: 10081,
        },
        {
          name: "中华民族",
          value: 9386,
        },
        {
          name: "马克思主义",
          value: 7500,
        },
        {
          name: "民族复兴",
          value: 7500,
        },
        {
          name: "社会主义制度",
          value: 6500,
        },
        {
          name: "国防白皮书",
          value: 6500,
        },
        {
          name: "创新",
          value: 6000,
        },
        {
          name: "民主革命",
          value: 4500,
        },
        {
          name: "文化强国",
          value: 3800,
        },
        {
          name: "国家主权",
          value: 3000,
        },
        {
          name: "武装颠覆",
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
        { value: 235, name: "视频广告" },
        { value: 274, name: "联盟广告" },
        { value: 310, name: "邮件营销" },
        { value: 335, name: "直接访问" },
        { value: 400, name: "搜索引擎" },
      ],
    };
  },
};
