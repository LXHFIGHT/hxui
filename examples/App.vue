<template>
  <div id="app" class="hx-block">
    <hx-header title="HXUI Playground">
    </hx-header>
    <div class="hx-content">
      <img alt="Vue logo" src="./assets/logo.png" @click="doLink">
      <hx-smart-uploader v-model="img"></hx-smart-uploader>
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
    <div class="hx-footer">
      <hx-pagination total="90"></hx-pagination>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import HxPagination from './../packages/cpts/HxPagination'
import HxSmartUploader from './../packages/cpts/HxSmartUploader'
const img = 'https://static.shengxintech.com/images/vehicle/icon-logo.png'
export default {
  name: 'app',
  components: {
    HelloWorld,
    HxPagination,
    HxSmartUploader
  },
  data () {
    return {
      img
    }
  },
  methods: {
    doLink () {
      this.$hxui.previewImage({
        current: img, 
        urls: [img, img, img]
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "./../packages/scss/index.scss";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
