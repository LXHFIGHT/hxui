<template>
  <div class="hx-calendar" ref="hxCalendar">
    <div class="header">
      <button class="btn-last-month"
        @click="toLastMonth"
        :style="`width: ${calendarWidth/7}px`">
        &lt; {{ last.month }}月
      </button>
      <span class="text-current-month">
        {{ current.year }}年 {{ current.month }}月
      </span>
      <button class="btn-next-month"
        @click="toNextMonth"
        :style="`width: ${calendarWidth/7}px`">
        {{ next.month }}月 &gt;
      </button>
    </div>
    <div class="pad-weeks">
      <div v-for="(item, index) in weeks"
        class="item"
        v-text="item"
        :key="index"
        :style="`width: ${calendarWidth/7}px;`">
      </div>
    </div>
    <div class="pad-dates">
      <div v-for="(item, index) in dates"
        :class="['item', (item.isDisabled && 'disabled'), ($_isToday(item.date) && 'today')]"
        :key="index"
        :style="`width: ${calendarWidth/7}px; height: ${calendarHeight/6}px;`">
        <span class="date" v-text="item.day"></span>
      </div>
    </div>
  </div>
</template>
<script>
const TIMESTAMP_PER_DATE = 24 * 60 * 60 * 1000
const TIMER_FOR_RESIZE_ADJUSTMENT = 1000
const TOTAL_DATES_IN_CALENDAR = 42 // 一个日历中显示42个格子 （6*7）
export default {
  data () {
    return {
      weeks: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      calendarHeight: '',
      calendarWidth: '',
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
    }
  },
  methods: {
    toLastMonth () {
      const { year, month } = this.last
      this.$_initDates(year, month)
    },
    toNextMonth () {
      const { year, month } = this.next
      this.$_initDates(year, month)
    },
    initFramework () {
      const calendarHeight = this.dom.clientHeight - 42 - 50 // 减去顶部的距离 
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
        const day = new Date(new Date(date).getTime() - TIMESTAMP_PER_DATE).getDate()
        for (let i = 0; i < week; i++) {
          const dateItem = { isDisabled: true, day: (day - i) }
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
