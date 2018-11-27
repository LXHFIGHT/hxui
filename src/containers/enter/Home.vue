<template>
  <div class="hx-block bg-gray">
    <div class="hx-container bg-white">
      <hx-catalog :menus="menus" :onSelect="doSelectCatalog"></hx-catalog>
      <div class="hx-main">
        <vue-markdown class="hx-article">{{ HxButtonFile }}</vue-markdown>
      </div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import HxButtonFile from './../../docs/components/hx-button.md'
import HxCatalog from './../../hxui/cpts/HxCatalog'
export default {
  components: {
    'vue-markdown': VueMarkdown,
    HxCatalog
  },
  data () {
    return {
      HxButtonFile,
      menus: [
        {
          key: '一级标题',
          children: [
            { key: '二级标题1', value: 'hx-button' },
            { key: '二级标题2', value: 'hx-input', children: [{ key: '三级标题' }] }
          ]
        },
        {
          key: '一级标题2',
          children: [
            { key: '二级标题1', value: 'hx-button' },
            { key: '二级标题2', value: 'hx-input', children: [{ key: '三级标题' }] }
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
    }
  },
  mounted () {
    console.log(HxButtonFile)
  }
}
</script>

<style lang="scss" scoped>
  .bg-gray {
    background-color: #f6f7f7;
  }
  .bg-white {
    background-color: white;
    height: 100%;
  }
</style>
