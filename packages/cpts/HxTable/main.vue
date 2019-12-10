<template>
  <div :class="['hx-table', !isNotEmpty && 'no-shadow']" ref="hxTablePad">
    <div class="pad-loading" v-if="loading">
      <hx-loading-icon position="center" height="35px" width="35px" level="warn">
        <span v-if="loadingText" v-text="loadingText"></span>
      </hx-loading-icon>
    </div>
    <table ref="hxTable">
      <thead >
        <tr ref="hxTableHead"></tr>
      </thead>
      <tbody ref="hxTableBody"></tbody>
    </table>
    <slot v-if="isNotEmpty"></slot>
    <div class="hx-emptyset" v-if="isEmpty">
      {{ emptyText }}
    </div>
  </div>
</template>

<script>
import HxLoadingIcon from './../HxLoadingIcon'
export default {
  name: 'hx-table',
  components: {
    HxLoadingIcon
  },
  props: {
    loading: {
      type: [String, Boolean],
      default: false
    },
    loadingText: {
      type: String,
      default: '加载数据中'
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      columns: []
    }
  },
  methods: {
    $_initTable () {
      this.columns = []
      const $hxTablePad = this.$refs.hxTablePad
      const children = $hxTablePad.children
      for (let i = 0; i < children.length; i++) {
        if (children[i].classList.contains('column')) {
          this.columns.push(children[i].dataset)
        }
      }
      this.$_initHeader()
    },
    $_initHeader () {
      const $hxTableHead = this.$refs.hxTableHead
      for (let column of this.columns) {
        const dom = document.createElement('td')
        dom.classList.add(column.size)
        dom.classList.add(column.align)
        dom.innerHTML = column.label 
        $hxTableHead.appendChild(dom)
      }
    },
    $_initData () {
    }
  },
  mounted () {
    this.$_initTable()
  },
  watch: {
    data: {
      handler (newVal) {},
      deep: true
    }
  },
  computed: {
    isEmpty () {
      return !this.loading && !this.data.length
    },
    isNotEmpty () {
      return !this.loading && this.data.length
    }
  }
}
</script>

<style lang="scss" scoped> 
</style> 
