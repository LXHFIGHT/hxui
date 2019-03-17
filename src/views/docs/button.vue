<template>
  <article class="hx-article">
    <header class="main-title">hx-button</header>
    <span class="sub-title">HXUI提供一套供快捷使用的按钮组件</span>
    <hx-section title="组件展示" :foldable="true" tag="Demo">
      <div class="content" slot="content" >
        <hx-button @click="popTips('center')" type="warn">center</hx-button>
        <hx-button @click="popTips('top')">top</hx-button>
        <hx-button @click="popTips('topRight')" type="warn">topRight</hx-button>
        <hx-button @click="popTips('topLeft')" type="warn">topLeft</hx-button>
        <hx-button @click="popTips('bottom')" type="info">bottom</hx-button>
        <hx-button @click="popTips('bottomRight')" type="warn">bottomRight</hx-button>
        <hx-button @click="popTips('bottomLeft')" type="warn">bottomLeft</hx-button>
        <hx-button type="success" @click="popConfirm">success</hx-button>
        <hx-button type="error">error</hx-button>
        <hx-button type="fatal">fatal</hx-button>
      </div>
    </hx-section>
  </article>
</template>

<script>
import HxSection from '@/hxui/cpts/HxSection'
import HxButton from '@/hxui/cpts/HxButton'
export default {
  components: {
    'hx-section': HxSection,
    HxButton
  },
  data () {
    return {
    }
  },
  methods: {
    popTips (position) {
      this.$hxui.popTip({
        text: 'Yahoo',
        position,
        level: 'error'
      })
    },
    popConfirm () {
      const that = this
      this.$hxui.confirm({
        text: 'You are sure to access the file',
        level: 'error',
        onConfirm () {
          that.$hxui.popTip('Yahoo China')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
