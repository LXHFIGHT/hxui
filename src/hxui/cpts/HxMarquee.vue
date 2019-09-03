<template>
  <div :class="['hx-marquee', direction]" :style="height && `height: ${height}`" ref="hxMarquee" @click="toNext">
    <span :style="`height: ${clientHeight}px;`"
      v-if="!content.length" 
      class="item-marquee color-gray" 
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
      elem.classList.add('item-marquee')
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
      const { children } = this.$refs.hxMarquee
      for (let i = 0; i < children.length; i++) {
        if (children[i].getAttribute('class').includes(className)) {
          return this.$refs.hxMarquee.children[i]
        }
      }
    },
    toNext () {
      const lastItem = this.$_getItem('last')
      const nextItem = this.$_getItem('next')
      const currentItem = this.$_getItem('current')
      lastItem.setAttribute('class', 'item-marquee next hide')
      currentItem.setAttribute('class', 'item-marquee last')
      nextItem.setAttribute('class', 'item-marquee current')
      if (this.html) {
        lastItem.innerHTML = this.content[this.index]
      } else if (!this.html) {
        lastItem.innerText = this.content[this.index]
      }
      this.index = this.content.length > this.index + 1 ? this.index + 1 : 0
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
  // border: 1px solid red;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  overflow: hidden;
  .item-marquee {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    @include nowrap;
    width: 100%;
    transition: transform 1s;
    &.hide {
      visibility: hidden;
    }
  }
  &.column {
    .item-marquee {
      transform: translateY(0);
      &.next { 
        transform: translateY(100%);
      }
      &.last {
        transform: translateY(-100%);
      }
    }
  }
  &.row {
    .item-marquee {
      &.current { 
        transform: translateX(0);
      }
      &.next { 
        transform: translateX(-120%);
      }
      &.last {
        transform: translateX(120%);
      }
    }
  }
}
</style>
