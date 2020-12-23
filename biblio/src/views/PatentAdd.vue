<template>
  <el-container class="bibliopage">
    <el-header>
      <Nav />
    </el-header>

    <el-main class="bibliopage">
      <el-card>
        <el-form label-width="80px" :model="patent">
          <el-form-item label="专利标题">
            <el-input v-model="patent.title"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="patent.type"></el-input>
          </el-form-item>
          <el-form-item label="专利号">
            <el-input
              v-model="patent.patentID"
            ></el-input>
          </el-form-item>
          <el-form-item label="申请日期">
            <el-input v-model="patent.applyDate"></el-input>
          </el-form-item>
          <el-form-item label="发布号">
            <el-input v-model="patent.publicDate"></el-input>
          </el-form-item>
          <el-form-item label="主类型号">
            <el-input v-model="patent.mainTypeNumber"></el-input>
          </el-form-item>
          <el-form-item label="类型号">
            <el-input v-model="patent.typeNumber"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="patent.address"></el-input>
          </el-form-item>
          <el-form-item label="代码">
            <el-input v-model="patent.code"></el-input>
          </el-form-item>
          
          <el-form-item label="状态">
            <el-input v-model="patent.status"></el-input>
          </el-form-item>
          <el-form-item label="代理">
            <el-input v-model="patent.agency"></el-input>
          </el-form-item>
          <el-form-item label="代理人">
            <el-input v-model="patent.agent"></el-input>
          </el-form-item>

          <el-form-item label="描述">
            <el-input v-model="patent.description"
            type="textarea" autosize :rows="4"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="onReset">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>

    <el-footer>
      <div class="footer">
        <span>footer</span>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
import Nav from "@/components/Nav.vue";

export default {
  name: "PatentAdd",
  components: {
    Nav,
  },
  data: function () {
    return {
      researcherID: "",
      author: "",
      patent: {
        title: "",
        type: "",
        patentID: "CN201811618720.9",
        applyDate: "西门子(深圳)磁共振有限公司",
        publishID: "CN111381204A",
        publicDate: "测试",
        mainTypeNumber: "G01R33/54(2006.01) G G01 G01R G01R33",
        typeNumber:
          "G01R33/54(2006.01), A61B5/055(2006.01), G01R33/54, A61B5/055",
        address: "518057 广东省深圳市高新区中区高新中二道西门子磁共振园",
        agency: "",
        agent: "",
        code: "广东;44",
        description: "测试",
        status: "在审",
      },
    };
  },
  methods: {
    onSubmit: function () {
      console.log("onsubmit");
      // console.log(this.patent.title);
      console.log(this.patent);
      if (
        this.patent.title === "" ||
        this.patent.type === "" ||
        this.patent.patentID === "" ||
        this.patent.applyDate === "" ||
        this.patent.publishID === "" ||
        this.patent.publicDate === "" ||
        this.patent.mainTypeNumber === '' ||
        this.patent.typeNumber === '' ||
        this.patent.address === '' ||
        // this.agency === '' ||
        // this.agent === '' ||
        this.code === '' ||
        this.description === '' ||
        this.status === ''
      ) {
        this.$message({
          message: "请填写完整信息",
          type: "error",
        });
        return;
      }

      this.$axios({
        method: "post",
        url: "/user/patent/add",
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          ResearcherID: this.researcherID,
        },
        data: {
          title: this.patent.title,
          type:this.patent.type,
          patentID:this.patent.patentID,
          applyDate:this.patent.applyDate,
          publishID:this.patent.publishID,
          publicDate:this.patent.publicDate,
          mainTypeNumber:this.patent.mainTypeNumber,
          typeNumber:this.patent.typeNumber,
          address:this.patent.address,
          agency:this.patent.address,
          agent:this.patent.agent,
          code :this.patent.code,
          description:this.patent.description,
          status:this.patent.status
        },
      })
        .then((response) => {
          console.log(response.data.msg);
          if (response.data.msg === "successfully") {
            this.$message({
              message: "添加成功",
              type: "success",
            });
            this.$router.push("/patent");
          }
          else {
            this.$message({
              message:response.data.msg,
              type:"error"
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onReset: function () {
      console.log("reset");
    },
  },
  created: function () {
    this.$axios({
      method: "get",
      url: "/user",
      headers: {
        token: window.localStorage.getItem("token"),
      },
    })
      .then((response) => {
        console.log(response.data.msg);
        if (response.data.msg === "get information successfully") {
          this.researcherID = response.data.information.id;
          this.author = response.data.information.username;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.el-input {
  width: 800px;
}
</style>