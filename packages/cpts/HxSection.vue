<template>
  <div ref="section"
    :class="['hx-section ',
      !title && 'no-title',
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
        <img class="icon-toggle" src="./../img/icon/icon-caret-down.png" alt="">
      </button>
      <slot name="right"></slot>
    </div>
    <div :class="['pad-content', loading && 'loading']">
      <slot class="content">
      </slot>
      <div class="pad-loading" v-if="loading">
        <hx-loading-icon position="center" height="34px" :level="level" direction="row">
          <span v-if="loadingText" v-text="loadingText"></span>
        </hx-loading-icon>
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
import HxLoadingIcon from './HxLoadingIcon'
import { levelKeys, Levels } from './../const'
export default {
  name: 'hx-section',
  data () {
    return {
      expand: false,
      iconCaretDown
    }
  },
  components: {
    HxLoadingIcon
  },
  props: {
    title: String,
    loading: {
      type: Boolean,
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
    tag: {
      type: String
    },
    level: {
      type: String,
      validator (data) {
        return levelKeys.includes(data)
      },
      default: Levels.INFO
    }
  },
  methods: {
    doToggleFold () {
      this.expand = !this.expand
    }
  }
}
</script>
