/* Paper.js */
import Nav from "@/components/Nav.vue";

export default {
  name: "Paper",
  components: {
    Nav,
  },
  methods: {
    handleCommand(command) {
      if (command == "info") {
        /* 跳转至对应用户信息页 */
      } else if (command == "letter") {
        /* 发送私信 */
      }
    },
  },
};
