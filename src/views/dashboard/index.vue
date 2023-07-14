<template>
  <div class="dashboard-container">
    <el-row type="flex" justify="left">
      <el-col :span="12">
        <div>
          <span style="color: #5a5e66;font-size: 14px;font-weight: bolder">【{{ name }}】欢迎您登录统一认证系统,祝您一天好心情！</span>
          <span
            style="color: #5a5e66;font-size: 10px"
          >
            --当前系统时间：{{ time }}
          </span>
        </div>

      </el-col>
    </el-row>
    <el-row type="flex" justify="center" :gutter="20" style="margin-top: 100px">
      <el-col :span="6">
        <el-card :body-style="{ width: '100%', height: '160px', textAlign: 'center' }">
          <span style="position: relative; top: 40%">
            <el-link
              type="primary"
              :disabled="!config.test1_url"
              :href="config.test1_url"
              style="font-weight: bolder;font-size: 28px"
              target="_blank"
            >测试系统1
            </el-link>
          </span>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card :body-style="{ width: '100%', height: '160px', textAlign: 'center' }">
          <span style="text-align: center; position: relative; top: 40%">
            <el-link
              type="primary"
              :disabled="!config.test2_url"
              :href="config.test2_url"
              style="font-weight: bolder;font-size: 28px"
              target="_blank"
            >测试系统2</el-link>
          </span>
        </el-card>
      </el-col>
      <el-col v-if="config && config.show_job" :span="6">
        <el-card :body-style="{ width: '100%', height: '160px', textAlign: 'center' }">
          <span style="position: relative;top: 40%">
            <el-link
              type="primary"
              :disabled="!config.test3_url"
              :href="config.test3_url"
              style="font-weight: bolder;font-size: 28px"
              target="_blank"
            >调度中心</el-link>
          </span>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { config } from '@/api/config'
import moment from 'moment'

export default {
  name: 'Dashboard',
  data() {
    return {
      config: {
        dmp_url: null,
        risk_url: null,
        job_url: null,
        show_job: false
      },
      time: moment().format('YYYY-MM-DD HH:mm:ss')
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    this.getConfig()
  },
  methods: {
    getConfig() {
      config().then(res => {
        this.config = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  .box-card {
    width: 480px;
    height: 480px;
  }
}
</style>
