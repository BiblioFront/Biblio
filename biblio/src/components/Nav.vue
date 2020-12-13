<template>
<el-row>
  <div class="navbar">
    
      <el-col :span=12>
        <div id="logo" style="float:left" @click="route2Home()">
          <span style="float:left">biblio</span>
        </div>
      </el-col>
      <el-col :span=10>
        <div class="btns_area_change" style="float:right">
          <div v-if="1">
              <span style="width: 50px; height: 33px; font-size: 25px; font-family: Segoe UI; font-weight: 600; line-height: 33px; color: rgba(150, 75, 180, 1); margin-right:30px">欢迎</span>
              <el-button style="border-color:#AC97FA; color:#AC97FA">个人</el-button>
              <el-button @click="route2Gate()" style="border-color:#AC97FA; color:#AC97FA">机构</el-button>
          </div>
          <div v-else>
             <button>登录</button>
             <button>注册</button>
          </div>
        </div>
        </el-col>
        <el-col :span=2>
          <div style="margin-left:30px">
              <el-button icon="el-icon-bell" style="border-color:#D5D0F4; color:#964BB2; background-color:#D5D0F4" @click="setdrawer" circle></el-button>
          </div>
        </el-col>
    </div>

    <el-drawer
      title="用户消息"
      :visible.sync="drawer"
      :with-header="false">
      <br>
      <div class="drawer-title">
        <span style="font-size: 25px; color:rgba(150, 75, 180, 1)">用户消息</span>
        <el-button icon="el-icon-s-promotion" round style="float:right; margin-right:30px; color:#97ABFA; border-color:#97ABFA" size="medium" @click="showForm">私信</el-button>
      </div>
      
      <el-table :data="messageData" style="margin-top:30px">
        <el-table-column property="title" label="消息列表" width="230px"></el-table-column>
        <el-table-column  label="操作" width="200px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>        

    <el-dialog title="发送私信" :visible.sync="formsee">
      <el-form :model="form" :label-position="labelPosition">
        <el-form-item label="用户ID" style="margin-left:30px" >
          <el-input v-model="form.name" autocomplete="off" style="width:400px"></el-input>
          <el-button style="margin-left:30px">搜索</el-button>
        </el-form-item>
      
        <!-- <el-form-item label="活动区域" style="margin-left:15px">
          <el-input v-model="form.name" autocomplete="off" style="width:400px"></el-input>
        </el-form-item> -->
      </el-form>
    </el-dialog>



    </el-row>
</template>

<script src="../assets/js/Nav.js">
  export default {
    data() {
      return {
        drawer: false,
      };
    },
    methods:{
      setdrawer(){
        this.drawer = true;
        console.log(this.drawer);
      }
    }
  };
</script>

<style lang="scss" scoped>
@import "../assets/css/global.css";
@import "../assets/css/navbar.css";
.drawer-title span{
  
  margin-left: 30px;
  margin-top: 50px;
}
</style>
