<template>
  <div class="hx-block bg-gray">
    <div :class="['bg-white', project.isAdmin ? 'hx-block' : 'hx-container']">
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
import HxCatalog from '@/hxui/cpts/HxCatalog'
import { project } from '@/config'
export default {
  components: {
    HxCatalog
  },
  data () {
    return {
      project,
      menus: [
        {
          key: '组件介绍',
          disabled: true,
          children: [
            '基本',
            { key: 'Button 按钮', value: 'hx-button' },
            { key: 'Image 图片', value: 'hx-image' },
            '表单',
            { key: 'Input 输入框', value: 'hx-input' }
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
      this.$router.push(`/components/${value}`)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./../global.scss";
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
