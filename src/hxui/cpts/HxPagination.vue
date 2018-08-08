<template>
  <!-- 组件封装： 分页组件
    获取参数：
    totalPage: [Number] 当前列表页总页数
    doRequest: [Function] 发起请求回调方法
  -->
  <div class="hx-pagination">
    <select name="sizePerPage"
            v-model="searchInfo.perPage"
            @change="doRequest(searchInfo)">
      <option v-for="pageSize in pageSizes"
              v-bind:key="pageSize"
              v-text="`每页${pageSize}条数据`"
              :value="pageSize">
      </option>
    </select>
    <a :class="['fa fa-caret-left', (searchInfo.page === 1 ? 'hx-invisible' : '')]"
       @click="requestListByPage(searchInfo.page - 1)"></a>
    <span >{{searchInfo.page}} / {{totalPage}}</span>
    <a :class="['fa fa-caret-right', (searchInfo.page === totalPage || !totalPage) ? 'hx-invisible' : '']"
       @click="requestListByPage(searchInfo.page + 1)"></a>
    <input type="text"
           v-model="toPage">
    <a class="btn-jump"
       @click="requestListByPage(toPage)">
       跳转
    </a>
  </div>
</template>

<script>
export default {
  name: 'HxPagination',
  data () {
    return {
      searchInfo: {
        perPage: this.pageSizes[0],
        page: 1
      },
      toPage: ''
    }
  },
  props: {
    doRequest: {
      type: Function,
      required: true
    },
    // 总页数
    totalPage: {
      type: Number,
      required: true
    },
    pageSizes: {
      type: Array,
      default () {
        return [20, 40, 60, 80, 100]
      }
    }
  },
  methods: {
    requestListByPage (page = 1) {
      if (page > this.totalPage || page < 1 || isNaN(page)) {
        alert('所选页面超过范围')
        return
      }
      this.searchInfo.page = page
      this.doRequest(this.searchInfo)
    }
  }
}
</script>
