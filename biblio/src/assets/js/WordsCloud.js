/* WordsCloud.js */
import "echarts-wordcloud";

export default {
  props: {
    id: {
      type: String,
      default: "wordscloud",
    },
    className: {
      type: String,
      default: "wordscloud",
    },
    data: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      wordscloud: null,
    };
  },
  mounted() {
    this.initWordsCloud();
  },
  beforeDestroy() {
    if (!this.wordscloud) return;
    this.wordscloud.dispose();
    this.wordscloud = null;
  },
  methods: {
    initWordsCloud() {
      this.wordscloud = this.$echarts.init(this.$refs.wordscloud);
      const option = {
        tooltip: {
          pointFormat: "{series.name}: <b>共{point.percentage:.d}篇</b>",
          textStyle: {
            fontFamily: "STZhongsong",
            fontSize: 14,
            color: "#fff",
          },
        },
        series: [
          {
            type: "wordCloud",
            gridSize: 5,
            sizeRange: [15, 40],
            rotationRange: [0, 0],
            textStyle: {
              normal: {
                fontFamily: "STZhongsong",
                fontWeight: "bold",
                color: function() {
                  return (
                    "hsl(" +
                    Math.round(Math.random() * (300 - 250) + 250) +
                    ", " +
                    Math.round(Math.random() * (80 - 40) + 40) +
                    "%, " +
                    Math.round(Math.random() * (100 - 60) + 60) +
                    "%)"
                  );
                },
              },
            },
            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
            // Default to be put in the center and has 75% x 80% size.
            left: "center",
            top: "center",

            data: this.data,
          },
        ],
      };
      this.wordscloud.setOption(option);
    },
  },
};
