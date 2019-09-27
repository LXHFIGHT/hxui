<template>
  <!-- 组件封装： 分页组件
    获取参数：
    total: [Number] 当前列表页总页数
    doRequest: [Function] 发起请求回调方法
  -->
  <div class="hx-pagination">
    <select name="sizePerPage"
      v-model="searchInfo.per_page"
      @change="requestListByPerPage()">
      <option v-for="pageSize in pageSizes"
        v-bind:key="pageSize"
        v-text="`每页${pageSize}条数据`"
        :value="pageSize">
      </option>
    </select>
    <a :class="['btn-switch', (searchInfo.page === 1 ? 'hx-invisible' : '')]"
      @click="requestListByPage(searchInfo.page - 1)">
      <img :src="iconCaretLeft" alt="" class="icon">
    </a>
    <span class="text-page">{{searchInfo.page}} / {{total}}</span>
    <a :class="['btn-switch', (searchInfo.page === total || !total) ? 'hx-invisible' : '']"
      @click="requestListByPage(searchInfo.page + 1)">
      <img :src="iconCaretRight" alt="" class="icon">
    </a>
    <input type="text"
      class="page-inputer"
      autocomplete="off"
      v-model="toPage" />
    <a class="btn-jump"
      @click="requestListByPage(toPage)">
      跳转
    </a>
  </div>
</template>
<script>
import toast from './../plugins/toast'
import iconCaretLeft from './../img/svg/caret-left-gray.svg'
import iconCaretRight from './../img/svg/caret-right-gray.svg'
export default {
  name: 'hx-pagination',
  data () {
    return {
      timer: null,
      iconCaretLeft,
      iconCaretRight,
      searchInfo: {
        per_page: this.pageSizes[0],
        page: 1
      },
      toPage: ' '
    }
  },
  props: {
    // 父组件传入方法可以带上一个对象作为参数，对象中包含 per_page和pageSize参数
    doRequest: {
      type: Function,
      required: true
    },
    // 总页数
    total: {
      type: Number,
      required: true
    },
    // 暴露到父组件的分页数的参数名
    pageSizeParamName: {
      type: String,
      default: 'per_page'
    },
    pageSizes: {
      type: Array,
      default () {
        return [20, 40, 60, 80, 100]
      }
    }
  },
  methods: {
    $_initRequest () {
      let bundle = {}
      bundle.page = this.searchInfo.page
      bundle[this.pageSizeParamName] = this.searchInfo.per_page
      this.doRequest(bundle)
    },
    requestListByPerPage () {
      this.$_initRequest()
    },
    requestListByPage (page = 1) {
      if (page > this.total || page < 1 || isNaN(page)) {
        toast({ text: '所选页面超过范围', level: 'warn' })
        return
      }
      this.searchInfo.page = page
      this.$_initRequest()
    }
  },
  mounted () {
    this.timer = window.setTimeout(() => {
      this.toPage = ''
      window.clearTimeout(this.timer)
    }, 5000)
  },
  beforeDestroy () {
    window.clearTimeout(this.timer)
  },
  watch: {
    total (newVal) {
      if (newVal < this.searchInfo.page) {
        this.searchInfo.page = newVal
        this.$_initRequest()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./../scss/components/hx-pagination.scss";
</style>
