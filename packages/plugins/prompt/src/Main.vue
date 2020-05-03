<template>
  <div :class="['hx-modal confirm', show && 'show', level]">
    <div class="mask" @click="onHide"></div>
    <div class="content">
      <header class="header" v-text="title"></header>
      <div class="prompt-content">
        <textarea v-if="type === InputTypes.TEXTAREA" v-model="text" ref="editor" cols="30" rows="3"
          autofocus="autofocus"
          :placeholder="placeholder"></textarea>
        <input v-if="type === InputTypes.TEXT" 
          v-model="text" 
          ref="editor"
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
          v-if="!hideCancelBtn"
          @click="destroyElement"></button>
        <button :class="['hx-button btn-confirm', level || 'main']"
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
      disableMask: false,
      hideCancelBtn: false, // 隐藏取消按钮
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
    onHide () {
      // 当禁用蒙层或者已经输入内容的情况，蒙层点击关闭弹框失效，以此避免用户误点
      if (this.disableMask || this.text) {
        return
      }
      this.destroyElement()
    },
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
