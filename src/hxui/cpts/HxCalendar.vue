<template>
  <div class="hx-calendar" ref="hxCalendar">
    <div class="header">
      <button class="btn-last-month"
        @click="jumpToLastMonth"
        :style="`width: ${calendarWidth/7}px`">
        &lt; {{ last.month }}月
      </button>
      <span class="text-current-month">
        {{ current.year }}年 {{ current.month }}月
      </span>
      <button class="btn-next-month"
        @click="jumpToNextMonth"
        :style="`width: ${calendarWidth/7}px`">
        {{ next.month }}月 &gt;
      </button>
    </div>
    <div class="pad-weeks">
      <div v-for="(item, index) in weeks"
        class="item"
        :key="index"
        :style="`width: ${calendarWidth/7}px;`">
        <span class="hide-sm">周</span>{{ item }}
      </div>
    </div>
    <div class="pad-dates">
      <div v-for="(item, index) in dates"
        :class="['item', (item.isDisabled ? 'disabled' : 'normal'), ($_isToday(item.date) && 'today')]"
        :key="index"
        :style="`width: ${calendarWidth/7}px; height: ${calendarHeight/6}px;`">
        <span class="date" v-text="item.day"></span>
        <div class="pad-tags" v-if="item.tags && item.tags.length">
          <span v-for="(tag, index) in item.tags"
            :key="index"
            @click="doSelectTag(tag.value)"
            :class="['tag', (tag.level || '')]"
            v-text="tag.key">
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const TIMESTAMP_PER_DATE = 24 * 60 * 60 * 1000
const TIMER_FOR_RESIZE_ADJUSTMENT = 1000
const TOTAL_DATES_IN_CALENDAR = 42 // 一个日历中显示42个格子 （6*7)
export default {
  data () {
    return {
      weeks: ['日', '一', '二', '三', '四', '五', '六'],
      calendarHeight: '',
      calendarWidth: '',
      /**
       * dates用于存储当前日历中所有日期格子，
       * 每一下包含的字段有：
       *  day: Number类型，表示当前月份中第几天
       *  isDisabled: Boolean类型，是否不可选
       *  date: String类型，‘YYYY/MM/DD’格式的日期字符串
       *  tags: Array类型，表示日期空格中的标签
       *    当tag为字符串text时，则会转换为 { key: text, value: text, level: 'info' }
       *    tag可以被点击，触发父组件传入的onSelect 方法，参数是 { date, value } 
       */
      dates: [],
      dom: null,
      timer: null, // 用于时刻监听窗口变化的计时器
      current: {
        year: '',
        month: ''
      },
      last: {
        year: '',
        month: ''
      },
      next: {
        year: '',
        month: ''
      }
    }
  },
  props: {
    currentDate: {
      type: String
    },
    additions: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 当用户点击上一个月的时候所触发的事件
    toLastMonth: {
      type: Function,
      default: function () {
        return () => {}
      }
    },
    // 当用户点击下一个月的时候所触发的事件
    toNextMonth: {
      type: Function,
      default: function () {
        return () => {}
      }
    },
    // 当用户选择日历中任何一个标签的触发点击事件
    doSelectTag: {
      type: Function,
      default: function () {
        return () => {}
      }
    }
  },
  methods: {
    jumpToLastMonth () {
      const { year, month } = this.last
      this.$_initDates(year, month)
      this.toLastMonth({ year, month })
    },
    jumpToNextMonth () {
      const { year, month } = this.next
      this.$_initDates(year, month)
      this.toNextMonth({ year, month })
    },
    initFramework () {
      const calendarHeight = this.dom.clientHeight - 87 // 减去顶部的距离 
      const calendarWidth = this.dom.clientWidth
      if (this.calendarHeight !== calendarHeight || this.calendarWidth !== calendarWidth) {
        this.calendarHeight = calendarHeight
        this.calendarWidth = calendarWidth
      }
    },
    $_isToday (date) {
      return (new Date().toLocaleDateString() === date)
    },
    $_initCurrentDate () {
      const date = this.currentDate 
        ? this.currentDate.replace(/-/g, '/')
        : new Date()
      const year = new Date(date).getFullYear()
      const month = new Date(date).getMonth()
      this.$_initDates(year, month + 1)
    },
    // 用于将不同日期的标签项插入到日历中
    $_syncAdditions () {
      if (!this.additions.length) {
        return
      }
      const tags = this.additions.map(v => {
        const { tags } = v
        v.tags = typeof tags === 'string' 
          ? { key: tags, value: tags, level: 'info' }
          : tags
        return v
      })
      this.dates.forEach((v) => {
        for (const item of tags) {
          if (v.date === item.date) {
            v.tags = item.tags
            break
          }
        }
      })
    },
    $_initDates (year, month) {
      const date = `${year}/${month}/1`
      const week = new Date(date).getDay()
      const _setYearAndMonth = () => {
        this.current = { month, year }
        this.last = { 
          month: month === 1 ? 12 : (month - 1),
          year: month === 1 ? year - 1 : year
        }
        this.next = { 
          month: month === 12 ? 1 : (month + 1),
          year: month === 12 ? year + 1 : year
        }
        this.dates = []
      }
      const _initLastMonth = () => {
        for (let i = 0; i < week; i++) {
          const lastDate = new Date(new Date(date).getTime() - TIMESTAMP_PER_DATE * (i + 1))
          const dateItem = {
            isDisabled: true,
            day: lastDate.getDate(),
            date: lastDate.toLocaleDateString()
          }
          this.dates.unshift(dateItem)
        }
      }
      const _initCurrentMonth = () => {
        for (let i = 0; i < TOTAL_DATES_IN_CALENDAR - week; i++) {
          const nextDate = new Date(new Date(date).getTime() + TIMESTAMP_PER_DATE * i)
          const bundle = {
            date: nextDate.toLocaleDateString(),
            isDisabled: nextDate.getMonth() !== this.current.month - 1,
            day: nextDate.getDate()
          }
          this.dates.push(bundle)
        }
      }
      _setYearAndMonth()
      _initLastMonth()
      _initCurrentMonth()
      this.$_syncAdditions()
    }
  },
  mounted () {
    this.dom = this.$refs.hxCalendar
    this.initFramework()
    this.$_initCurrentDate()
    this.timer = setInterval(() => {
      this.initFramework()
    }, TIMER_FOR_RESIZE_ADJUSTMENT)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>
<style lang="scss" scoped>
  @import "./../scss/components/hx-calendar.scss";
</style>
