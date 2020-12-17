<template>
  <div>
    <div class="navbar">
      <div id="logo">
        <span @click="route2Home()">biblio</span>
      </div>

      <div v-if="!pageState" class="midarea">
        <div class="navcmp searchbar">
          <input
            class="search_text"
            type="text"
            placeholder="输入搜索内容..."
          />
          <div class="search_btn">
            <button @click="route2Search()">
              <svg-icon name="search"></svg-icon>
            </button>
          </div>
        </div>
      </div>

      <div class="navcmp btns_area">
        <div class="afterlg" v-if="lg == 1">
          <el-dropdown @command="handleCommand">
            <el-avatar>个人</el-avatar>
            <el-dropdown-menu class="navcmp" slot="dropdown">
              <el-dropdown-item command="info">账号信息</el-dropdown-item>
              <el-dropdown-item command="gate">学者信息</el-dropdown-item>
              <el-dropdown-item command="lgout" divided
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>

          <el-button
            class="inform"
            icon="el-icon-bell"
            @click="setdrawer"
            circle
          ></el-button>
        </div>

        <div class="beforelg" v-else-if="lg == 0">
          <span id="welcome">欢迎</span>
          <el-button @click.native="route2Login()">登录</el-button>
          <el-button @click.native="route2Register()">注册</el-button>
        </div>
      </div>
    </div>

    <el-drawer title="information" :visible.sync="drawer" :with-header="false">
      <div class="drawer-title">
        <span id="drawer-title--circle"
          ><i class="el-icon-message-solid"></i
        ></span>

        <el-button icon="el-icon-s-promotion" @click.native="showForm"
          >私信</el-button
        >
      </div>

      <el-table :data="messageData" style="font-size:12px;">
        <el-table-column property="content" label="" width="auto">
          <template slot-scope="scope">
            <el-avatar :size="30">user</el-avatar>
            <span style="margin-left: 10px">{{ scope.row.from }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>

    <el-dialog title="发送私信" :visible.sync="formsee">
      <el-form :model="form" :label-position="labelPosition">
        <el-form-item label="用户ID" style="margin-left:30px">
          <el-input
            v-model="form.name"
            autocomplete="off"
            style="width:400px"
          ></el-input>
          <el-button style="margin-left:30px">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script src="../assets/js/Nav.js"></script>

<style lang="scss" scoped>
@import "../assets/css/global.css";
@import "../assets/css/navbar.css";
.drawer-title span {
  margin-left: 30px;
  margin-top: 50px;
}
</style>
