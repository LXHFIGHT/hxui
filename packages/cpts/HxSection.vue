<template>
  <div ref="section"
    :class="['hx-section ',
      shadow && 'shadow',
      foldable && 'foldable',
      level,
      expand && 'fold']">
    <header class="header" v-if="title">
      <span class="title" v-text="title"></span>
      <span class="title">
        <slot name="left"></slot>
      </span>
    </header>
    <div class="right">
      <button class="hx-button btn-toggle" @click="doToggleFold" v-if="foldable">
        {{ expand ? '展开' : '收起' }}
        <img class="icon-toggle" src="./../img/icon/icon-caret-down.png" alt="">
      </button>
      <slot name="right"></slot>
    </div>
    <div :class="['pad-content', loading && 'loading']">
      <slot class="content">
      </slot>
      <div class="pad-loading" v-if="loading">
        <hx-loading align="center" :level="level">
          <span v-if="loadingText" v-text="loadingText"></span>
        </hx-loading>
      </div>
      <input type="password" 
        autocomplete="new-password" 
        style="visiblity: hidden; display: none;" />
    </div>
    <span class="side-tag"
      v-text="tag">
    </span>
  </div>
</template>
<script>
/**
 * 使用用法：
 *   slot:right  可以放置header中居右的按钮组
 */
import iconCaretDown from './../img/icon/icon-caret-down.png'
import HxLoading from './HxLoading'
import { levelKeys } from './../const'
export default {
  name: 'hx-section',
  data () {
    return {
      expand: false,
      iconCaretDown
    }
  },
  components: {
    HxLoading
  },
  props: {
    title: String,
    loading: {
      type: [Boolean, String, Number],
      default: false
    },
    loadingText: {
      type: String
    },
    shadow: {
      type: Boolean,
      default: false
    },
    foldable: {
      type: Boolean,
      default: false
    },
    foldedHeight: { // 折叠状态的高度
      type: String,
      default: '50px'
    },
    tag: {
      type: String
    },
    level: {
      type: String,
      validator (data) {
        return levelKeys.includes(data)
      },
      default: 'main'
    }
  },
  methods: {
    doToggleFold () {
      const $view = this.$refs.section
      if (!this.expand) {
        $view.style.height = this.foldedHeight
      } else {
        $view.style.height = 'unset'
      }
      this.expand = !this.expand
    }
  }
}
</script>
