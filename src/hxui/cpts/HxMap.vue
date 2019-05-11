<template>
  <div class="hx-map"
    :style="`height: ${height}`"
    :id="id">
    <div class="hx-emptyset md" v-if="!lat || !lng">
      暂无准确坐标
    </div>
  </div>
</template>

<script>
const BMap = window.BMap
export default {
  name: 'HxMap',
  data () {
    return {
      idName: `hx-map`,
      map: null
    }
  },
  props: {
    id: {
      type: String,
      default: 'hx-map'
    },
    height: {
      type: String,
      default: '200px'
    },
    lng: {
      type: [Number, String],
      default: ''
    },
    lat: {
      type: [Number, String],
      default: ''
    }
  },
  methods: {
    $_reloadMap () {
      const { lat, lng } = this
      if (!this.map) {
        this.map = new BMap.Map(this.id) // 创建Map实例
        this.map.enableScrollWheelZoom()
      } else {
        this.map.clearOverlays()
      }
      let point = new BMap.Point(lng, lat)
      let mk = new BMap.Marker(point)
      this.map.addOverlay(mk)
      this.map.centerAndZoom(point, 15) // 初始化地图,设置中心点坐标和地图级别
    }
  },
  updated () {
    this.$_reloadMap()
  },
  mounted () {
    this.$_reloadMap()
  }
}
</script>

<style lang="scss" scoped="">
  .hx-map {
    display: block;
  }
</style>
