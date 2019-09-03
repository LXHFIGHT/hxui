<template>
  <div :class="['hx-marquee', direction]" :style="height && `height: ${height}`" ref="hxMarquee" @click="toNext">
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
    direction: { // 滚动方向, 默认为纵向滚动
      type: String,
      default: 'column',
      validator (val) {
        return ['', 'column', 'row'].includes(val)
      }
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
      this.$_append('last')
      this.$_append('current')
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
      if (className !== 'last') {
        if (this.html) {
          elem.innerHTML = this.content[this.index]
        } else if (!this.html) {
          elem.innerText = this.content[this.index]
        }
      }
      this.$refs.hxMarquee.appendChild(elem)
      this.index = this.content.length > this.index + 1 ? this.index + 1 : 0
    },
    $_getItem (className) {
      for (let i = 0; i < this.$refs.hxMarquee.children.length; i++) {
        if (this.$refs.hxMarquee.children[i].classList.contains(className)) {
          return this.$refs.hxMarquee.children[i]
        }
      }
    },
    toNext () {
      const lastItem = this.$_getItem('last')
      const nextItem = this.$_getItem('next')
      const currentItem = this.$_getItem('current')
      lastItem.classList.add('hide')
      lastItem.classList.remove('last')
      if (this.html) {
        lastItem.innerHTML = this.content[this.index]
      } else if (!this.html) {
        lastItem.innerText = this.content[this.index]
      }
      this.index = this.content.length > this.index + 1 ? this.index + 1 : 0
      lastItem.classList.add('next')
      currentItem.classList.remove('current')
      currentItem.classList.add('last')
      nextItem.classList.remove('next', 'hide')
      nextItem.classList.add('current')
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
    transition: transform .4s;
    left: 0;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    @include nowrap;
    width: 100%;
    &.hide {
      visibility: hidden;
    }
  }
  &.column {
    .item {
      &.next { 
        transform: translateY(100%);
      }
      &.last {
        transform: translateY(-100%);
      }
    }
  }
  &.row {
    .item {
      &.next { 
        transform: translateX(-100%);
      }
      &.last {
        transform: translateX(100%);
      }
    }
  }
}
</style>
