/* CircleProgressbar.js */
export default {
  props: {
    id: {
      type: String,
      default: "circleProgressbar",
    },
    className: {
      type: String,
      default: "circleProgressbar",
    },
    title: {
      type: String,
      default: "进度",
    },
    progress: {
      type: String,
      default: "0.00",
    },
  },
  data() {
    return {
      collaborator: null,
    };
  },
  mounted() {
    this.initProgressbar();
  },
  beforeDestroy() {
    if (!this.circleProgressbar) return;
    this.circleProgressbar.dispose();
    this.circleProgressbar = null;
  },
  methods: {
    initProgressbar() {
      this.circleProgressbar = this.$echarts.init(this.$refs.circleProgressbar);
      console.log(this.progress);
      console.log(parseFloat(this.progress));
      var percent = parseFloat(this.progress);
      console.log(percent);
      const option = {
        title: {
          show: true,
          text: this.title + "\n" + this.progress + "%",
          x: "center",
          y: "center",
          textStyle: {
            fontSize: 16,
            color: "rgba(85, 85, 85, 1)",
            fontWeight: "lighter",
            fontFamily: "STZhongsong",
            lineHeight: 22,
          },
        },
        series: {
          name: "",
          type: "pie",
          radius: ["70%", "100%"],
          avoidLabelOverlap: true,
          hoverAnimation: false,
          label: {
            show: false,
            position: "center",
            emphasis: {
              show: false,
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            {
              value: percent,
              name: "",
              itemStyle: {
                color: "#9234df",
              },
              emphasis: {
                itemStyle: {
                  color: "#a248eb",
                },
              },
            },
            {
              value: 100.0 - percent,
              name: "",
              itemStyle: {
                color: "transparent",
              },
            },
          ],
          animationDuration: function() {
            return percent * 10;
          },
          animationEasing: "exponentialInOut",
        },
      };
      this.circleProgressbar.setOption(option);
    },
  },
};
