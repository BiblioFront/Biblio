/* Collaborator.js */
export default {
  props: {
    id: {
      type: String,
      default: "collaborator",
    },
    className: {
      type: String,
      default: "collaborator",
    },
    data: {
      type: Array,
      default: [{}],
    },
  },
  data() {
    return {
      collaborator: null,
    };
  },
  mounted() {
    this.initCollaborator();
  },
  beforeDestroy() {
    if (!this.collaborator) return;
    this.collaborator.dispose();
    this.collaborator = null;
  },
  methods: {
    initCollaborator() {
      this.collaborator = this.$echarts.init(this.$refs.collaborator);
      const option = {
        roseType: "angle",
        itemStyle: {
          color: "#9234df",
        },
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0.3, 0.7],
          },
        },
        textStyle: {
          fontFamily: "STZhongsong",
          fontSize: 14,
          color: "#707070",
          align: "center",
        },
        tooltip: {
          show: true,
          trigger: "item",
          snap: true,
          position: function(pos, params, dom, rect, size) {
            var obj = { top: "30%" };
            obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 5;
            return obj;
          },
          formatter:
            "<div class='collaboration_content'><p id='name'>{b0}</p><p id='institution'>机构</p><p id='subject'>学科</p><div id='collaboration_cutline'></div><p id='collaboration'>合作篇数：{c0}</p></div>",
          backgroundColor: "#fff",
          textStyle: {
            color: "#707070",
            fontFamily: "STZhongsong",
            fontSize: 15,
          },
        },

        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            data: this.data,
          },
        ],
      };
      this.collaborator.setOption(option);
    },
  },
};
