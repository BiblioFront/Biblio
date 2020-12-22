<template>
  <div>
    <Nav />

    <div class="info-container">
      <el-card class="info-box-card">
        <div>
          <span>管理</span>
          <el-divider></el-divider>
        </div>

        <div>
          <el-button
            @click="updateData"
            :icon="isUpdatingData ? 'el-icon-loading' : null"
            :disabled="
              isUpdatingHotField || isUpdatingHotPaper || isRebuildIndex
            "
          >
            {{ isUpdatingData === false ? "更新数据" : "更新数据中" }}
          </el-button>
          <el-button
            @click="updateHotFiled"
            :icon="isUpdatingHotField ? 'el-icon-loading' : null"
            :disabled="isUpdatingData || isUpdatingHotPaper || isRebuildIndex"
          >
            {{
              isUpdatingHotField === false ? "更新热点领域" : "更新热点领域中"
            }}
          </el-button>
          <el-button
            @click="updateHotPaper"
            :icon="isUpdatingHotPaper ? 'el-icon-loading' : null"
            :disabled="isUpdatingData || isUpdatingHotField || isRebuildIndex"
          >
            {{
              isUpdatingHotPaper === false ? "更新热门文献" : "更新热门文献中"
            }}
          </el-button>
          <el-button
            @click="rebuildIndex"
            :icon="isRebuildIndex ? 'el-icon-loading' : null"
            :disabled="
              isUpdatingData || isUpdatingHotField || isUpdatingHotPaper
            "
          >
            {{ isRebuildIndex === false ? "重建索引" : "重建索引中" }}
          </el-button>
        </div>

        <el-dialog title="数据更新" :visible.sync="updateDataDialogVisible">
          <div>
            <el-table
              v-loading="isUpdatingData"
              element-loading-text="正在进行数据更新"
            >
              <el-table-column label="ScholarID"> </el-table-column>
              <el-table-column label="Name"> </el-table-column>
              <el-table-column label="Organization"> </el-table-column>
            </el-table>
            <el-button @click="stopUpdateData">停止更新</el-button>
          </div>
        </el-dialog>

        <el-dialog title="重建索引" :visible.sync="rebuildIndexDialogVisible">
          <div>
            <el-table
              v-loading="isRebuildIndex"
              element-loading-text="正在重建索引"
            >
              <el-table-column label="PaperID"> </el-table-column>
              <el-table-column label="author"> </el-table-column>
              <el-table-column label="keywords"> </el-table-column>
            </el-table>
            <el-button @click="stopRebuildIndex">停止重建索引</el-button>
          </div>
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>

<script type="text/javascript" src="../assets/js/Admin.js"></script>

<style scoped>
@import "../assets/css/global.css";
@import "../assets/css/Admin.css";
</style>
