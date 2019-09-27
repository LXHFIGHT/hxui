<template>
  <div class="hx-card">
    <div class="content">
      <div class="row"  ></div>
      <slot name="content"></slot>
      <div></div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
/**
 * HxCard 卡片组件：
 * 建议将卡片组件和行组件进行协同使用，如下：
 * <hx-card>
 *  <hx-row> ... </hx-row>
 *  <hx-row> ... </hx-row>   
 *  <hx-row> ... </hx-row>     
 * </hx-card>
 */
export default {
  data () {
    return {
      rows: [],
      cover: ''
    }
  },
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    $_isUrl (url) {
      if (!url) {
        return false
      } 
      return url.indexOf('http://') === 0 || url.indexOf('https://') === 0
    },
    $_init () {
      for (let p in this.item) {
        if (this.$_isUrl(this.item[p]) && !this.cover) {
          this.cover = this.item[p]
        } else if (this.$_isUrl(this.item[p]) && this.cover) {
          this.rows.push = { label: p, text: this.item[p], type: 'image' } // 插入
        } else {
          this.rows.push = { label: p, text: this.item[p], type: '' } // 插入普通行
        }
      }
    }
  },
  created () {
    this.$_init()
  }
}
</script>
<style lang="scss" scoped>
@import "./../scss/components/hx-card.scss";
</style>
