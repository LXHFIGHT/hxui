<template>
  <div id="app" class="hx-block">
    <hx-header >
      <strong slot="center">HXUI Playground</strong>
    </hx-header>
    <div class="hx-content">
      <div class="hx-pad-center">
        <hx-section title="总配置">
          <hx-row label="总价格">
            <input class="hx-input" type="text" />
          </hx-row>
          <hx-row label="上传LOGO">
            <hx-smart-uploader uploadApi="baidu.com" :onUpload="() => {}" v-model="img"></hx-smart-uploader>
          </hx-row>
        </hx-section>
      </div>
    </div>
    <div class="hx-footer">
      <hx-pagination :doRequest="()=>{}" :total="90"></hx-pagination>
    </div>
  </div>
</template>

<script>
import HxPagination from './../packages/cpts/HxPagination'
import HxSmartUploader from './../packages/cpts/HxSmartUploader'
const img = 'https://static.shengxintech.com/images/vehicle/icon-logo.png'
export default {
  name: 'app',
  components: {
    HxPagination,
    HxSmartUploader
  },
  data () {
    return {
      img
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
@import "./../packages/scss/index.scss";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
