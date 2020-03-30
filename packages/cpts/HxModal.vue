<template>
  <div :class="['hx-modal', value && 'show', size, (type || 'normal'), level]">
    <div class="mask" @click="onHide"></div>
    <div class="content" :style="width && `width: ${width}`">
      <header class="header">
        {{ title }}
        <slot name="header"></slot>
        <div class="right">
          <slot name="right"></slot>  
        </div>
      </header>
      <div class="pad-main-content">
        <slot></slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hx-modal',
  data () {
    return {}
  },
  props: {
    value: {
      type: [Number, String, Boolean]
    },
    level: {
      type: String,
      validator (val) {
        return ['info', 'success', 'warn', 'error', 'fatal'].includes(val)
      }
    },
    size: String,
    type: { // 弹出框形式：目前支持常规，以及侧边 side 弹出
      type: String,
      validator (val) {
        if (!val) {
          return true
        }
        return ['side'].includes(val)
      }
    },
    title: {
      type: String,
      default: '提示'
    },
    disableMask: { // 点击蒙层区域是否关闭模态框
      type: [String, Number, Boolean],
      default: false
    },
    width: { // 当type是侧边栏类型的模态框时，width可配置模态框的宽度
      type: String,
      default: ''
    }
  },
  methods: {
    $_init () {
      this.$nextTick(() => {
        const body = document.querySelector('body')
        if (body.append) {
          body.append(this.$el)
        } else {
          body.appendChild(this.$el)
        }
      })
    },
    onHide () {
      !this.disableMask && this.$emit('input', false)
    }
  },
  mounted () {
    this.$_init()
  },
  destroyed () {
    this.$destroy(true)
    this.$el.parentNode &&
    this.$el.parentNode.removeChild(this.$el)
  }
}
</script>
