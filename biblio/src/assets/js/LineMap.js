/* LineMap.js */
export default {
  props: {
    id: {
      type: String,
      default: "linemap",
    },
    className: {
      type: String,
      default: "linemap",
    },
    data: {
      type: Array,
      default: [
        {
          year: 0,
          value: 0,
        },
      ],
    },
  },
  data() {
    return {
      linemap: null,
    };
  },
  mounted() {
    this.initLineMap();
  },
  beforeDestroy() {
    if (!this.linemap) return;
    this.linemap.dispose();
    this.linemap = null;
  },
  methods: {
    initLineMap() {
      this.linemap = this.$echarts.init(this.$refs.linemap);
      const option = {
        grid: {
          top: 35,
          left: 45,
          right: 45,
          height: 100,
        },
        xAxis: {
          type: "category",
          data: this.data.year,
          boundaryGap: true,
          axisLine: {
            symbol: "pin",
            symbolSize: [17, 17],
            lineStyle: {
              width: 1,
              color: "#ac97fa",
              opacity: 0.5,
            },
          },
          axisTick: {
            show: false,
            alignWithLabel: true,
          },
          axisLabel: {
            show: true,
            rotate: 40,
            fontFamily: "STZhongsong",
            fontSize: 12,
            color: "rgba(255,255,255,0.7)",
          },
        },
        yAxis: {
          type: "value",
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "none",
            snap: true,
            label: {
              show: true,
              fontFamily: "STZhongsong",
              fontSize: 14,
              color: "#fff",
              align: "center",
              backgroundColor: "#505050",
              shadowBlur: 0,
            },
          },
          textStyle: {
            fontFamily: "STZhongsong",
            fontSize: 14,
            color: "#fff",
          },
        },
        series: [
          {
            type: "line",
            name: "发文数",
            data: this.data.value,
            itemStyle: {
              color: "#f0eff8",
            },
            lineStyle: {
              color: "#f0eff8",
              opacity: 0.8,
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#f0eff8",
                  },
                  {
                    offset: 1,
                    color: "#f0eff811",
                  },
                ],
              },
            },
          },
        ],
      };
      this.linemap.setOption(option);
    },
  },
};
