<template>
  <div :class="['hx-progress-modal', value && 'show']">
    <div class="pad-detail">
      <div class="bar">
        <span :class="['progress', isDone && 'done'] " :style="`width: ${progress}%`"></span>
      </div>
      <div class="pad-status">
        <span class="text" v-if="!isDone">
          <span class="text" v-if="!isNaN(progress)">
            上传中 {{ progress }}% <span class="btn-close" @click="doHide">关闭提示</span>
          </span>
          <span class="text color-red" v-if="isNaN(progress)">
            当前进度显示异常
          </span>
        </span>
        <span class="text color-green" v-if="!isNaN(progress) && isDone">
          已完成
        </span>
      </div>
    </div>
  </div>
</template>
<script>
const FRAME_TIME = 1000 / 60
export default {
  data () {
    return {
      spots: [0],
      progress: 0,
      timer: null,
      isDone: false,
      hideTimer: null
    }
  },
  props: {
    value: {
      type: [Number, Boolean, String]
    },
    total: {
      type: Number
    },
    current: {
      type: Number
    }
  },
  methods: {
    doHide () {
      this.$emit('input', false)
      let quitTimer = setTimeout(() => {
        this.progress = 0
        this.isDone = false
        clearTimeout(quitTimer)
      }, 400)
      clearTimeout(this.hideTimer)
    },
    $_quit () {
      this.hideTimer = setTimeout(() => {
        this.doHide()
      }, 800)
    },
    $_initInterval () {
      const that = this
      this.timer = setInterval(function () {
        const next = that.spots[0]
        if (that.progress < next) {
          that.progress += 1
          that.progress >= next && that.spots.length > 1 &&
          that.spots.shift()
        } else {
          if (that.spots.length > 1) {
            that.spots.shift()
          }
        }
      }, FRAME_TIME)
    }
  },
  mounted () {
    this.spots.push(Math.floor(this.current / this.total * 100))
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  watch: {
    value (val, oldVal) {
      if (val) {
        this.$_initInterval()
      } else {
        clearInterval(this.timer)
      }
    },
    progress (val) {
      if (val >= 100) {
        this.isDone = true
        this.$_quit()
      }
    },
    current (val, oldVal) {
      if (val !== oldVal) {
        const newProgress = Math.floor(val / this.total * 100)
        this.spots.push(newProgress)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./../scss/variable.scss";
@mixin breatheKeyframe($animationName, $color) {
  @keyframes #{$animationName} {
    0% { box-shadow: 0 0 8px #{$color}; }
    50% { box-shadow: 0 0 18px #{$color}; }
    100% { box-shadow: 0 0 8px #{$color};  }
  }
}
@include breatheKeyframe(breatheGreen, $color-green);
@include breatheKeyframe(breatheMain, $color-main);

.hx-progress-modal {
  z-index: 101;
  top: -100%;
  left: 0;
  display: block;
  text-align: center;
  background-color: white;
  box-shadow: 0 0 40px rgba(0, 0, 0, .2);
  font-size: $font-sm;
  transition: all .4s;
  &.show {
    top: 0;
  }
  .bar {
    height: $pm-sm;
    width: 100%;
    display: block;
    border-radius: $pm-sm;
    background-color: $color-gray;
    margin-bottom: $pm-sm;
    .progress {
      height: 100%;
      display: block;
      max-width: 100%;
      background-color: $color-main;
      border-radius: $pm-sm;
      box-shadow: 0 0 $pm-sm $color-main;
      transition: box-shadow .4s, background-color .4s;
      animation: breatheMain .8s infinite;
      &.done {
        background-color: $color-green;
        animation: breatheGreen .8s infinite;
        box-shadow: 0 0 $pm-sm $color-green;
      }
    }
  }
  .pad-status {
    .btn-close {
      margin-left: $pm-sm;
      color: $color-gray-deep;
      cursor: default;
      &:hover {
        color: $color-red;
      }
    }
  }
}
@media screen and (min-width: 640px) {
  @import "./../scss/variable.scss";
  .hx-progress-modal {
    width: 50%;
    padding: $pm-sm $pm-md;
    @include centerHorizontal;
    position: fixed;
    @include borderRadiusBottom($pm-bg);
  }
}
@media screen and (max-width: 640px) {
  .hx-progress-modal {
    width: 100%;
    display: block;
    position: fixed;
    padding: $pm-sm;
    @include borderRadiusBottom($pm-sm/2);
  }
}
</style>
