<template>
  <div :class="['pad-poptip', className, (isShow ? 'show' : '')]" v-text="title"></div>
</template>

<script>
import config from './../../config'
export default {
  data () {},
  props: {
    // 标题内容
    title: {
      type: String,
      required: true
    },
    isShow: {
      type: Boolean
    },
    // 展示秒数
    during: {
      type: Number,
      default: 1500
    },
    // 提示等级
    level: {
      type: String,
      default: config.level.LEVEL_INFO
    }
  }
}
</script>
