<template>
  <div class="hx-header">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <span class="title" >
      <span v-text="title"></span>
      <slot name="title"></slot>
    </span>
    &nbsp;
    &nbsp;
    <small class="title color-main"
           v-text="subTitle"></small>
    <div class="center">
      <slot name="center"></slot>
    </div>
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
    },
    subTitle: {
      type: String
    }
  }
}
</script>
