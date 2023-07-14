<template>
  <div class="errPage-container">
<!--    <el-button icon="el-icon-arrow-left" class="pan-back-btn" @click="back">-->
<!--      返回-->
<!--    </el-button>-->
    <el-row>
      <el-col :span="16">
        <h1 class="text-jumbo text-ginormous">
          Oops!
        </h1>
        <div style="margin-top: 30px">
          <span style="font-size: 18px;font-weight: bolder">异常原因：</span>
          <span style="color: gray">{{ message }}</span>
        </div>
        <div style="margin-top: 50px;">
          请前往登录页面，重新登录，如有异常，请联系管理员！！
        </div>

        <!--        gif来源<a href="https://zh.airbnb.com/" target="_blank">airbnb</a> 页面-->
        <!--        <h5 style="color: red">{{ message }}</h5>-->
        <!--        <h6>如有不满请联系你领导</h6>-->
        <ul class="list-unstyled">
          <!--          <li>或者你可以去:</li>-->
          <!--          <li class="link-type">-->
          <!--            <router-link to="/">-->
          <!--              回首页-->
          <!--            </router-link>-->
          <!--          </li>-->
          <li><a href="#" @click.prevent="dialogVisible=true">休息一下</a></li>
        </ul>
      </el-col>
      <el-col :span="8">
        <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" title="随便看">
      <img :src="ewizardClap" class="pan-img">
    </el-dialog>
  </div>
</template>

<script>
import errGif from '@/assets/401_images/401.gif'
import skipGif from '@/assets/401_images/401.gif'

export default {
  name: 'Page401',
  data() {
    return {
      errGif: errGif + '?' + +new Date(),
      ewizardClap: skipGif + '?' + +new Date(),
      dialogVisible: false
    }
  },
  computed: {
    message() {
      return this.$route.query.message ? this.$route.query.message : '登录认证失败'
    }
  },
  methods: {
    back() {
      // if (this.$route.query.noGoBack) {
      //   this.$router.push({ path: '/dashboard' })
      // } else {
      //   this.$router.go(-1)
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
  .errPage-container {
    width: 800px;
    max-width: 100%;
    margin: 100px auto;
    .pan-back-btn {
      background: #008489;
      color: #fff;
      border: none!important;
    }
    .pan-gif {
      margin: 0 auto;
      display: block;
    }
    .pan-img {
      display: block;
      margin: 0 auto;
      width: 100%;
    }
    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #484848;
    }
    .list-unstyled {
      font-size: 14px;
      margin-top: 40px;
      li {
        padding-bottom: 5px;
      }
      a {
        color: #008489;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
