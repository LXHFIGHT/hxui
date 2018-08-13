<template>
   <div class="hx-tags">
     <span :class="['hx-tag', color, size]"
           v-for="(item, index) in value"
           v-bind:key="index"
           v-text="item"></span>
   </div>
</template>

<script>
export default {
  name: 'HxTags',
  data () {
    return {}
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    editable: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    },
    size: { // 一共包含 sm: 20px   md：27px 和 bg： 34px
      type: String,
      default: 'md'
    }
  }
}
</script>
