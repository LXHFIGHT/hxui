<template>
  <div class="hx-block bg-gray">
    <div class="hx-container bg-white">
      <aside class="aside-catalog">
        <hx-catalog :menus="menus" :onSelect="doSelectCatalog"></hx-catalog>
      </aside>
      <div class="hx-main pad-home-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import HxCatalog from './../../hxui/cpts/HxCatalog'
export default {
  components: {
    HxCatalog
  },
  data () {
    return {
      menus: [
        {
          key: '组件',
          children: [
            '基本',
            { key: 'Button 按钮', value: 'hx-button' },
            { key: 'Image 图片', value: 'hx-image' },
            '表单',
            { key: 'Input 输入框', value: 'hx-input' },
            '插件',
            { key: 'ImagePreviewer 图片预览', value: 'hx-image-previewer' }
          ]
        },
        {
          key: '一级标题2',
          children: [
            { key: '二级标题1', value: 'hx-button' },
            { key: '二级标题2',
              value: 'hx-input',
              children: [
                'Third level',
                '|',
                { key: '三级标题' }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    popAlert () {
      this.$hxui.popTip('Yahoo')
    },
    doSelectCatalog (value) {
      console.log('Select Data: ', value)
      this.$router.push(`/${value}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./../../hxui/scss/variable.scss";
  .bg-gray {
    background-color: #f6f7f7;
  }
  .bg-white {
    background-color: white;
    height: 100%;
  }
  .aside-catalog {
    width: 230px;
    display: inline-block;
    padding: $pm-md;
  }
  .pad-home-main {
    width: calc(100% - 235px);
    float: right;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
