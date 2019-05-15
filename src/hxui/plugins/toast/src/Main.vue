<template>
  <div :class="['hx-poptip',
    position,
    level,
    (isShow ? 'show' : '')]" v-text="text"></div>
</template>

<script>
import config from './../../config'
export default {
  data () {
    return {
      isShow: false,
      fadeOutTimer: {},
      fadeInTimer: {},
      text: '',
      position: '',
      level: config.level.DEFAULT,
      during: 1500
    }
  },
  methods: {
    destroyElement () {
      this.isShow = false
      const destroyTimer = setTimeout(() => {
        this.$destroy(true)
        this.$el.parentNode.removeChild(this.$el)
        clearTimeout(destroyTimer)
      }, 400)
    },
    startTimer () {
      if (this.during > 0) {
        this.fadeInTimer = setTimeout(() => {
          this.isShow = true
          clearTimeout(this.fadeInTimer)
        }, 100)
        this.fadeOutTimer = setTimeout(() => {
          this.destroyElement()
        }, this.during)
      }
    }
  },
  created () {
    this.position || (this.position = config.position.TOP)
  },
  mounted () {
    this.startTimer()
  },
  beforeDestroy () {
    clearTimeout(this.fadeInTimer)
    clearTimeout(this.fadeOutTimer)
  }
}
</script>

<style lang="scss" scoped>
@import './../../../scss/variable.scss';
// 顶部信息弹出框样式
.hx-poptip {
  margin: 0 auto;
  min-width: 30%;
  max-width: 60%;
  z-index: 10000;
  color: rgba(255, 255, 255, .9);
  transition: all .2s;
  &.success { background-color: $color-green; }
  &.warn { background-color: $color-orange; }
  &.error { background-color: $color-red; }
  &.default { background-color:#aaa; }
  &.info { background-color: $color-main; }
}

@media screen and (min-width: 640px) {
  .hx-poptip {
    text-align: center;
    font-size: 16px;
    line-height: 1.5;
    height: auto;
    padding: ($pm-md - 3px) $pm-md;
    border-radius: $border-radius-md;
    &.top {
      top: 0;
      @include centerHorizontal();
      transform: translate(-50%, -100%);
      &.show {
        transform: translate(-50%, 10%);
      }
    }
    &.topLeft,
    &.topRight {
      top: 0;
      position: absolute;
      transform: translateY(-100%);
      &.show {
        transform: translateY(10%);
      }
    }
    &.topRight {
      right: $pm-sm;
    }
    &.topLeft {
      left: $pm-sm;
    }
    &.bottom {
      bottom: 0;
      @include centerHorizontal();
      transform: translate(-50%, 100%);
      @include borderRadiusTop($border-radius-md);
      &.show {
        transform: translate(-50%, -10%);
      }
    }
    &.bottomLeft,
    &.bottomRight {
      bottom: 0;
      position: absolute;
      transform: translateY(100%);
      &.show {
        transform: translateY(-10%);
      }
    }
    &.bottomRight {
      right: $pm-sm;
    }
    &.bottomLeft {
      left: $pm-sm;
    }
    &.center {
      opacity: .0;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(1.3, 1.3);
      &.show {
        transform: translate(-50%, -50%) scale(1.0, 1.0);
        opacity: 1.0;
      }
    }
  }
}

@media screen and (max-width: 640px){
  .hx-poptip {
    width: 100%;
    bottom: 0;
    left: 0;
    text-align: center;
    background-color: rgba(0,0,0,.75)!important;
    color: rgba(255, 255, 255, .9);
    position: fixed;
    font-size: $font-sm;
    padding: $pm-md $pm-md $pm-bg;
    max-width: 100%;
    line-height: $font-sm * 2;
    transform: translateY(100%);
    &.show {
      transform: translateY(0);
    }
    &.success:before,
    &.warn:before,
    &.error:before,
    &.default:before {
      content: '';
      width: 30%;
      position: absolute;
      bottom: $pm-sm;
      height: 4px;
      display: block;
      @include centerHorizontal;
      border-radius: 4px 4px;
    }
    &.success:before { background-color: $color-green; }
    &.warn:before { background-color: $color-orange; }
    &.error:before { background-color: $color-red; }
    &.default:before { background-color: #aaa; }
    &.info:before { background-color: $color-main; }
  }
}
</style>
