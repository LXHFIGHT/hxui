<template>
  <div class="hx-marquee" :style="height && `height: ${height}`" ref="hxMarquee" @click="toNext">
    <span :style="`height: ${clientHeight}px;`"
      v-if="!content.length" 
      class="item color-gray" 
      v-text="placeholder">
    </span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      clientHeight: '',
      index: 0,
      timer: null
    }
  },
  props: {
    height: { // 控件高度
      type: String
    },
    during: { // 停留时间, 默认为1秒
      type: Number, 
      default: 2000
    },
    html: { // 内容是否为HTML
      type: [String, Number, Boolean],
      default: false
    },
    placeholder: {
      type: String,
      default: '暂无滚动信息'
    },
    content: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    $_init () {
      this.clientHeight = this.$refs.hxMarquee.offsetHeight
      if (!this.content.length) {
        return
      }
      this.$_append()
      this.$_append('next')
      this.timer = window.setInterval(() => {
        this.toNext()
      }, this.during)
    },
    // 增加控件
    $_append (className) { 
      let elem = document.createElement('div')
      elem.classList.add('item')
      className && elem.classList.add(className)
      elem.style.height = `${this.clientHeight}px`
      if (this.html) {
        elem.innerHTML = this.content[this.index]
      } else if (!this.html) {
        elem.innerText = this.content[this.index]
      }
      this.$refs.hxMarquee.appendChild(elem)
      this.index = this.content.length > this.index + 1 ? this.index + 1 : 0
    },
    toNext () {
      const firstChild = this.$refs.hxMarquee.children[0]
      const secondChild = this.$refs.hxMarquee.children[1]
      if (firstChild.classList.contains('last')) {
        this.$refs.hxMarquee.removeChild(this.$refs.hxMarquee.children[0])
        this.$refs.hxMarquee.children[0].classList.add('last')
        this.$refs.hxMarquee.children[1].classList.remove('next')
        this.$_append('next')
      } else {
        firstChild.classList.add('last')
        secondChild.classList.remove('next')
        this.$_append('next')
      }
    }
  },
  mounted () {
    this.$_init()
  },
  beforeDestroy () {
    window.clearInterval(this.timer)
  }
}
</script>

<style lang="scss">
@import "./../scss/variable.scss";
.hx-marquee {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transition: top .4s;
    display: flex;
    align-items: center;
    @include nowrap;
    width: 100%;
    &.next { 
      top: 100%;
    }
    &.last {
      top: -100%;
    }
  }
}
</style>
