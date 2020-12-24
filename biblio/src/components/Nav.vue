<template>
  <div>
    <div class="navbar">
      <div class="nav_mainarea">
        <div id="logo">
          <span @click="route2Home()">biblio</span>
        </div>

        <div v-if="notHomePage" class="midarea">
          <div class="navcmp searchbar">
            <el-cascader
              class="search_options"
              v-model="value"
              :options="searchOptions"
              :props="{ expandTrigger: 'hover' }"
              :show-all-levels="false"
            ></el-cascader>

            <div id="option_text--divider"></div>

            <input
              class="search_text"
              type="text"
              v-model="searchInput"
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
          <div class="afterlg" v-if="isLogin">
            <el-dropdown @command="userCommand">
              <el-avatar :src="userInfo.avatar" @click.native="route2Info">
              </el-avatar>
              <el-dropdown-menu class="navcmp" slot="dropdown">
                <el-dropdown-item command="info">账号信息</el-dropdown-item>
                <el-dropdown-item command="gate" v-if="userInfo.auth"
                  >学者信息</el-dropdown-item
                >
                <el-dropdown-item command="lgout" divided
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>

            <el-dropdown @visible-change="subscribeCommand">
              <el-button class="inform" circle icon="el-icon-files"></el-button>
              <el-dropdown-menu class="navcmp" slot="dropdown">
                <el-dropdown-item
                  :command="item.scholarID"
                  v-for="item in subscribeList"
                  :key="item.scholarID"
                  divided
                >
                  <div class="subscirbeScholar">
                    <div id="avatar">
                      <img
                        src="../assets/img/scholar_avatar_default.jpg"
                        alt="scholar_avatar"
                      />
                    </div>

                    <div class="details">
                      <span id="name">{{ item.name }}</span>
                      <span id="institution" v-if="item.organization">{{
                        item.organization
                      }}</span>
                      <span id="subject" v-if="item.field">{{
                        item.field
                      }}</span>
                    </div>

                    <el-button
                      @click.native="deleteSubscirbe(item.scholarID)"
                      type="text"
                      class="message_delete"
                      icon="el-icon-error"
                      >删除</el-button
                    >
                  </div>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <el-button
                    @click="clearSubscribeList"
                    type="text"
                    class="message_deleteALL subscribe_clear"
                    icon="el-icon-delete-solid"
                    >全部删除</el-button
                  >
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <el-dropdown @visible-change="likeCommand">
              <el-button
                class="inform"
                circle
                icon="el-icon-star-off"
              ></el-button>
              <el-dropdown-menu class="navcmp" slot="dropdown">
                <el-dropdown-item
                  :command="item._id"
                  v-for="item in likeList"
                  :key="item._id"
                  divided
                >
                  <div class="likeBiblio">
                    <div class="item__above">
                      <div id="title">
                        <span>[论文]</span>
                        <span>{{ item.title }}</span>
                      </div>

                      <el-button
                        @click="deleteLike(item._id)"
                        type="text"
                        class="message_delete"
                        icon="el-icon-error"
                        >删除</el-button
                      >
                    </div>

                    <div id="author">
                      <span>{{ item.author }}</span>
                      <span v-if="item.doi">{{ item.doi }}</span>
                      <span v-if="item.year">{{ item.year }}</span>
                    </div>

                    <div id="summary" v-if="item.summary">
                      <p>
                        {{ item.summary }}
                      </p>
                    </div>
                  </div>
                </el-dropdown-item>

                <el-dropdown-item divided>
                  <el-button
                    @click="clearLike"
                    type="text"
                    class="message_deleteALL subscribe_clear"
                    icon="el-icon-delete-solid"
                    >全部删除</el-button
                  >
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <el-button
              class="inform"
              icon="el-icon-bell"
              @click="setdrawer"
              circle
            ></el-button>
          </div>

          <div class="beforelg" v-if="!isLogin">
            <span id="welcome">欢迎</span>
            <el-button @click.native="route2Login()">登录</el-button>
            <el-button @click.native="route2Register()">注册</el-button>
          </div>
        </div>
      </div>
    </div>

    <el-drawer title="information" :visible.sync="drawer" :with-header="false">
      <div class="drawer-title">
        <span id="drawer-title--circle"
          ><i class="el-icon-message-solid"></i
        ></span>

        <el-button @click.native="showForm"
          ><svg-icon name="promotion"></svg-icon>私信</el-button
        >
      </div>

      <el-table class="message_container" :data="messageData" height="85vh">
        <el-table-column property="content" label="" width="auto">
          <template slot-scope="scope">
            <el-collapse class="message_item" accordion>
              <el-avatar :size="30" :src="scope.row.avatar"></el-avatar>
              <el-collapse-item
                class="message_content"
                :title="scope.row.from"
                name="1"
              >
                <p>{{ scope.row.content }}</p>
                <p id="message_time">
                  {{ scope.row.time }}
                </p>
              </el-collapse-item>
            </el-collapse>
          </template>
        </el-table-column>
        <el-table-column property="content" label="" width="80px">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, messageData)"
              type="text"
              class="message_delete"
              icon="el-icon-error"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-button
        @click.native.prevent="deleteAll()"
        type="text"
        class="message_deleteALL"
        icon="el-icon-delete-solid"
        >全部删除</el-button
      >
    </el-drawer>

    <el-dialog title="发送私信" :visible.sync="formsee">
      <el-form :model="form">
        <el-form-item label="用户名" style="margin-left:30px">
          <el-input
            v-model="form.name"
            autocomplete="off"
            style="width:400px"
          ></el-input>
          <el-button style="margin-left:30px" @click="findUser()"
            >搜索</el-button
          >
        </el-form-item>

        <el-form-item v-if="existName">
          <p style="margin-left:30px">向 {{ form[0].name }} 发送私信：</p>
          <el-input
            type="textarea"
            style="width:90%; margin-left:40px; margin-top:10px"
            :autosize="{ minRows: 4, maxRows: 6 }"
            placeholder="请输入内容"
            v-model="textarea2"
            @input="change($event)"
          >
          </el-input>
          <br />
          <el-button @click="send_msg()" style="float:right;margin-top:25px; "
            >发送私信</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script src="../assets/js/Nav.js"></script>

<style lang="scss" scoped>
@import "../assets/css/global.css";
@import "../assets/css/navbar.css";
@import "../assets/css/message.css";
.drawer-title span {
  margin-left: 30px;
  margin-top: 50px;
}
.el-select-dropdown__item {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  font-weight: lighter !important;
  color: #707070 !important;
  letter-spacing: 2px;
}
</style>
