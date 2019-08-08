<template>
  <div class="pad-hx-message" v-if="!isClose">
    <div :class="['hx-message', level]">
      <span class="text" v-text="text"></span>
      <span class="btn-close" @click="doClose">×</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isClose: false
    }
  },
  props: {
    text: {
      type: String,
      required: true
    },
    level: {
      type: String,
      validator (data) {
        return ['info', 'success', 'error', 'warn', 'fatal'].includes(data)
      },
      default: 'info'
    }
  },
  methods: {
    doClose () {
      this.isClose = true
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./../scss/variable.scss";
@mixin messageStyle ($color, $opacity: .1) {
  background-color: rgba($color, $opacity);
  color: $color;
} 
.pad-hx-message {
  width: 100%;
  display: block;
  padding: 0;
  .hx-message {
    width: 100%;
    display: block;
    padding: $pm-sm*2 $pm-md;
    font-size: $font-md;
    line-height: 1.5;
    text-align: justify;
    border-radius: $pm-sm;
    position: relative;
    &.main { @include messageStyle($color-main); }
    &.info { @include messageStyle($color-blue); }
    &.error { @include messageStyle($color-red);  }
    &.success { @include messageStyle($color-green);  }
    &.warn { @include messageStyle($color-orange);  }
    &.fatal { @include messageStyle($color-black);  }
    .text {
      display: block;
      width: calc(100% - #{$height-normal/2});
    }
    .btn-close {
      width: $height-normal/2;
      height: $height-normal/2;
      line-height: $height-normal/2;
      text-align: center;
      position: absolute;
      font-size: $font-lg;
      @include centerVertical;
      right: $pm-sm;
    }
  }
}
</style>
