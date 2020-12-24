<template>
  <el-container class="bibliopage">
    <el-header>
      <Nav />
    </el-header>

    <el-main class="bibliopage">
      <el-card>
        <el-form label-width="80px" :model="paper">
          <el-form-item label="论文标题">
            <el-input v-model="paper.title"></el-input>
          </el-form-item>
          <el-form-item label="组织">
            <el-input v-model="paper.organization"></el-input>
          </el-form-item>
          <el-form-item label="摘要">
            <el-input
              v-model="paper.summary"
              type="textarea"
              autosize
            ></el-input>
          </el-form-item>
          <el-form-item label="关键字">
            <el-input v-model="paper.keywords"></el-input>
          </el-form-item>
          <el-form-item label="期刊">
            <el-input v-model="paper.journal"></el-input>
          </el-form-item>
          <el-form-item label="url">
            <el-input v-model="paper.url"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">修改</el-button>
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
  name: "PaperEdit",
  components: {
    Nav,
  },
  data: function () {
    return {
      researcherID: "",
      author: "",
      paperid:"",
      paper: {
        author: "",
        title: "",
        summary: "",
        url: "",
        keywords: "",
        journal: "",
        organization: "",
      },
    };
  },
  methods: {
    onSubmit: function () {
        console.log("onsubmit");
        // console.log(this.paper.title);
        console.log(this.paper);
      if (
        this.paper.title === "" ||
        this.paper.summary === "" ||
        this.paper.url === "" ||
        this.paper.keywords === "" ||
        this.paper.journal === "" ||
        this.paper.organization === ""
      ) {
        this.$message({
          message: "请填写完整信息",
          type: "error",
        });
        return;
      }

      this.$axios({
        method: "patch",
        url: "/user/paper/change",
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          ResearcherID: this.researcherID,
          paperID:this.paperid
        },
        data: {
          author: this.author,
        //   author:this.researcherID,
          title: this.paper.title,
          summary: this.paper.summary,
          url: this.paper.url,
          keywords: this.paper.keywords,
          journal: this.paper.journal,
          organization: this.paper.organization,
        },
      })
        .then((response) => {
          console.log(response.data.msg);
          if (response.data.msg === "successfully") {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.$router.push("/paper");
          }
          else {
            this.$message({
              message:response.data.msg,
              type:"error"
            })
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onReset:function(){
        console.log("reset");
    }
  },
  created: function () {
    console.log("paper edit created!");
    this.paperID = this.$route.query.id,
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
          console.log(this.author);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    
    this.$axios({
        url:"/user/paper",
        method:'get',
        params:{
            paperID:this.paperid
        },
        headers:{
            token:window.localStorage.getItem("token")
        }
    }).then(response => {
        console.log(response.data.msg);
        if(response.data.msg === 'get paper and comment successfully')
        {
            this.paper = response.data.paper;
        }
        else {
            this.$message({
                message:"error",
                type:"error"
            });
        }
    }).catch(error => {
        console.log(error);
    });
  },
};
</script>

<style scoped>
.el-input{
    width: 800px;
}
</style>