<template>
  <el-container class="bibliopage">
    <el-header>
      <Nav />
    </el-header>

    <el-main class="bibliopage">
      <el-card>
        <el-form label-width="80px" :model="project">
          <el-form-item label="项目标题">
            <el-input v-model="project.title"></el-input>
          </el-form-item>
          <el-form-item label="摘要">
            <el-input
              v-model="project.summary"
              type="textarea"
              autosize
            ></el-input>
          </el-form-item>
          <el-form-item label="公司">
            <el-input v-model="project.company"></el-input>
          </el-form-item>
          <el-form-item label="关键字">
            <el-input v-model="project.keywords"></el-input>
          </el-form-item>
          <el-form-item label="年份">
            <el-input v-model="project.year"></el-input>
          </el-form-item>
          <el-form-item label="所属计划">
            <el-input v-model="project.plan"></el-input>
          </el-form-item>
          <el-form-item label="是否公开">
            <el-input v-model="project.scope"></el-input>
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
  name: "ProjectEdit",
  components: {
    Nav,
  },
  data: function () {
    return {
      researcherID: "",
      author: "",
      projectid: "",
      project: {
        author: "",
        title: "",
        summary: "",
        company: "",
        keywords: "",
        year: "",
        scope: "",
        plan: "",
      },
    };
  },
  created: function () {
    this.projectid = this.$route.query.id;
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
    this.$axios({
      method: "get",
      url: "/user/project",
      params: {
        projectID: this.projectid,
      },
      headers: {
        token: window.localStorage.getItem("token"),
      },
    })
      .then((response) => {
        console.log(response.data.msg);
        if (response.data.msg === "successfully") {
          console.log("get success");
          this.project = response.data.project;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    onSubmit: function () {
      console.log("onsubmit");
      // console.log(this.project.title);
      console.log(this.project);
      if (
        this.project.title === "" ||
        this.project.summary === "" ||
        this.project.keywords === "" ||
        this.project.year === "" ||
        this.project.scope === "" ||
        this.project.plan === ""
      ) {
        this.$message({
          message: "请填写完整信息",
          type: "error",
        });
        return;
      }

      this.$axios({
        method: "patch",
        url: "/user/project/change",
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          ResearcherID: this.researcherID,
          projectID:this.projectid
        },
        data: {
          author: this.author,
          title: this.project.title,
          summary: this.project.summary,
          company:this.project.company,
          keywords: this.project.keywords,
          year: this.project.year,
          scope: this.project.scope,
          plan: this.project.plan,
        },
      })
        .then((response) => {
          console.log(response.data.msg);
          if (response.data.msg === "successfully") {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.$router.push("/project");
          } else {
            this.$message({
              message: response.data.msg,
              type: "error",
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
};
</script>
<style scoped>
</style>