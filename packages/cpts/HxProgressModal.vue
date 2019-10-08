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
