<template>
  <div :class="['hx-rank', size]">
    <div class="item-star" v-for="(item, idx) in total" :key="idx" @click="doRank(idx + 1)">
      <img class="icon" v-if="value < idx + 1" src="./../img/icon/icon-star-blank.png" alt="">
      <img class="icon" v-if="value >= idx + 1" src="./../img/icon/icon-star.png" alt="">
    </div>
  </div>
</template>
<script>
export default {
  props: {
    total: {
      type: Number,
      default: 5
    },
    readonly: { // 是否为只读
      type: [Number, Boolean, String],
      default: ''
    },
    value: {
      type: [Number, String],
      required: true
    },
    size: {
      type: String,
      validator (val) {
        return ['sm', 'bg'].includes(val)
      }
    }
  },
  methods: {
    doRank (score) {
      if (this.readonly) {
        return
      }
      if (score === parseInt(this.value)) {
        this.$emit('input', '')
      } else {
        this.$emit('input', score)
      }
    }
  }
}
</script>
