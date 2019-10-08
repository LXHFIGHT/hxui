<template>
  <div :class="['hx-modal confirm', show && 'show', level]">
    <div class="mask" @click="destroyElement"></div>
    <div class="content">
      <header class="header" v-text="title"></header>
      <div class="prompt-content">
        <textarea v-if="type === InputTypes.TEXTAREA" v-model="text" ref="editor" cols="30" rows="3"
          autofocus="autofocus"
          :placeholder="placeholder"></textarea>
        <input v-if="type === InputTypes.TEXT" v-model="text" ref="editor"
          autofocus="autofocus"
          class="hx-input"
          :placeholder="placeholder" />
        <input v-if="type === InputTypes.NUMBER" 
          v-model="text" 
          ref="editor"
          autofocus="autofocus"
          class="inputer-number"
          :placeholder="placeholder" />
        <span class="tips" v-if="tips" v-html="tips"></span>
      </div>
      <footer class="footer">
        <button class="hx-button btn-cancel"
          v-text="cancelText"
          @click="destroyElement"></button>
        <button class="hx-button main btn-confirm"
          v-text="confirmText"
          @click="doConfirm"></button>
      </footer>
    </div>
  </div>
</template>

<script>
import { levelFilter } from './../../../const'
export default {
  data () {
    return {
      title: '',
      text: '',
      tips: '', // 提示语
      type: 'textarea', // 文本输入框行数，当textarea显示为文本域， 等于text时显示为文本框, 登录Number时显示为数字
      placeholder: '请输入内容',
      onConfirm: () => {},
      onCancel: () => {},
      confirmText: '确定',
      cancelText: '取消',
      level: '',
      show: false,
      max: null, // 最大值限制
      fadeInTimer: null,
      fadeOutTimer: null,
      InputTypes: {
        TEXTAREA: 'textarea',
        TEXT: 'text',
        NUMBER: 'number'
      }
    }
  },
  methods: {
    destroyElement () {
      this.show = false
      this.fadeOutTimer = setTimeout(() => {
        this.$destroy(true)
        this.$el.parentNode &&
        this.$el.parentNode.removeChild(this.$el)
      }, 400)
    },
    startTimer () {
      this.fadeInTimer = setTimeout(() => {
        this.show = true
      }, 100)
    },
    doConfirm () {
      this.onConfirm(this.text)
      this.destroyElement()
    },
    doCancel () {
      this.onCancel()
      this.destroyElement()
    }
  },
  created () {
    this.title || (this.title = levelFilter(this.title))
  },
  mounted () {
    this.startTimer()
    this.$refs['editor'].focus()
  },
  watch: {
    text (newVal) {
      // 当编辑类型为数值时，且有最大数限制时
      if (isNaN(newVal) || this.type !== this.InputTypes.NUMBER) {
        return
      }
      if (this.max && this.max < newVal) {
        this.text = this.max
      }
    }
  },
  beforeDestroy () {
    clearTimeout(this.fadeInTimer)
    clearTimeout(this.fadeOutTimer)
  }
}
</script>

<style lang="scss" scoped>
@import './../../../scss/variable.scss';
@import './../../../scss/plugins/hx-modal.scss';
@import './../../../scss/plugins/hx-confirm.scss';
.inputer-number {
  font-size: 35px;
  line-height: 35px;
  width: 100%;
  padding: $pm-lg $pm-sm;
  border: none;
  text-align: center;
  border-bottom: 1px solid $color-gray;
  margin-bottom: $pm-md;
  &::placeholder {
    font-size: 20px;
    line-height: 35px;
    height: 35px;
  }
}
</style>
