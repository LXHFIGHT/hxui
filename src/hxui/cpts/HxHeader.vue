<template>
  <div class="hx-header">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <span class="title" v-text="title"></span>
    &nbsp;
    &nbsp;
    <small class="title color-main"
           v-text="subTitle"></small>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    title: {
      type: String,
      required: true
    },
    subTitle: {
      type: String
    }
  }
}
</script>
