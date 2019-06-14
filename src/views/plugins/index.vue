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
import HxCatalog from './../../hxui/cpts/HxCatalog'
import { project } from './../../config'
export default {
  components: {
    HxCatalog
  },
  data () {
    return {
      project,
      menus: [
        {
          key: '插件介绍',
          disabled: true,
          children: [
            '提示',
            { key: 'Confirm 插件', value: 'confirm' },
            { key: 'Toast 插件', value: 'toast' },
            '|',
            '验证',
            { key: 'SmartValidator', value: 'validate' }
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
      this.$router.push(`/plugins/${value}`)
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
