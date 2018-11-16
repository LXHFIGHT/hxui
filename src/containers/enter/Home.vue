<template>
  <div class="hx-block">
    <div class="hx-container">
      <hx-catalog :menus="menus"></hx-catalog>
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
    }
  },
  mounted () {
    console.log(HxButtonFile)
  }
}
</script>
