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
      this.$emit('input', score)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./../scss/variable.scss";
.hx-rank {
  display: block;
  text-align: center;
  width: auto;
  height: $height-normal/2;
  overflow: hidden;
  &::after {
    clear: both;
    content: "";
    display: block;
  }
  .item-star {
    display: inline-block;
    & + .item-star {
      margin-left: $pm-md;
    }
    .icon {
      display: block;
      height: $height-normal/2;
      width: $height-normal/2;
    }
  }
  &.sm {
    height: $height-regular/2;
    .item-star {
      & + .item-star {
        margin-left: $pm-sm;
      }
      .icon {
        height: $height-regular/2;
        width: $height-regular/2;
      }
    }
  }
  &.bg {
    height: $height-navbar/2;
    .item-star {
      .icon {
        height: $height-navbar/2;
        width: $height-navbar/2;
      }
    }
  }
}
</style>
