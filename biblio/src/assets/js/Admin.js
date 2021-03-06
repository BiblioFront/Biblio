/* Myinfo.js */
import Nav from '@/components/Nav.vue'

export default {
  name: 'MyInfo',
  components: {
    Nav,
  },
  data() {
    return {
      isUpdatingData: false,
      isUpdatingHotField: false,
      isUpdatingHotPaper: false,
      isRebuildIndex: false,
      updateDataDialogVisible: false,
      rebuildIndexDialogVisible: false,
    }
  },
  methods: {
    getRandom(value) {
      return value
    },
    updateData() {
      if (!this.isUpdatingData) {
        this.isUpdatingData = true
        this.updateTimeOutLoading = window.setTimeout(() => {
          this.isUpdatingData = false
          this.updateDataDialogVisible = false
          this.$message.success('数据更新成功')
        }, 500000)
      } else {
        this.updateDataDialogVisible = true
      }
    },
    stopUpdateData() {
      this.isUpdatingData = false
      this.updateDataDialogVisible = false
      window.clearTimeout(this.updateTimeOutLoading)
      this.$message('已停止数据更新')
    },
    updateHotFiled() {
      if (this.isUpdatingHotField) return
      this.isUpdatingHotField = true
      this.$axios({
        method: 'get',
        url: '/analysis/update/hotfield',
        params: {},
        headers: {},
      })
        .then((response) => {
          var msg = response.data.msg
          console.log(msg)
          if (msg === 'success') {
            this.$message.success('热点领域更新成功')
          } else {
            this.$message.error('热点领域更新失败')
          }
          this.isUpdatingHotField = false
        })
        .catch((error) => {
          this.isUpdatingHotField = false
          console.log(error)
        })
    },
    updateHotPaper() {
      if (this.isUpdatingHotPaper) return
      this.isUpdatingHotPaper = true
      this.$axios({
        method: 'get',
        url: '/analysis/update/hotpaper',
        params: {},
        headers: {},
      })
        .then((response) => {
          var msg = response.data.msg
          console.log(msg)
          if (msg === 'success') {
            this.$message.success('热门文献更新成功')
          } else {
            this.$message.error('热门文献更新失败')
          }
          this.isUpdatingHotPaper = false
        })
        .catch((error) => {
          this.isUpdatingHotPaper = false
          console.log(error)
        })
    },
    rebuildIndex() {
      if (!this.isRebuildIndex) {
        this.isRebuildIndex = true

        this.rebuildTimeOutLoading = window.setTimeout(() => {
          this.isRebuildIndex = false
          this.rebuildIndexDialogVisible = false
          this.$message.success('索引重建成功')
        }, 30000)
      } else {
        this.rebuildIndexDialogVisible = true
      }
    },
    stopRebuildIndex() {
      this.isRebuildIndex = false
      this.rebuildIndexDialogVisible = false
      window.clearTimeout(this.rebuildTimeOutLoading)
      this.$message('已停止重建索引')
    },
  },
}
