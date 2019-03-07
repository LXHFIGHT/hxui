<template>
  <article class="hx-article">
    <header class="main-title">hx-button</header>
    <span class="sub-title">HXUI提供一套供快捷使用的按钮组件</span>
    <hx-section title="组件展示" :foldable="true" tag="Demo">
      <div class="content" slot="content" >
        <hx-button >default</hx-button>
        <hx-button type="success">success</hx-button>
        <hx-button type="info">info</hx-button>
        <hx-button type="warn">warn</hx-button>
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
  }
}
</script>

<style lang="scss" scoped>

</style>
