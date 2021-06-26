<!--
 * @Author       : liuxuhao
 * @LastEditors  : liuxuhao
-->
<template>
  <div class="hx-pad-map">
    <div class="hx-map"
      :style="`height: ${height}; width: ${width};`"
      :id="id">
      <div class="hx-emptyset md" v-if="!lat || !lng">
        暂无准确坐标
      </div>
    </div>
    <button @click="toCenter" class="btn-relocated">
      <img class="icon" src="./../img/icon/icon-current-location.png" alt="">
    </button>
  </div>
</template>

<script>
import imgPinpoint from './../img/icon/icon-pinpoint.png'
import { bd09togcj02 } from './../tools/object'
const AMap = window.AMap
export default {
  name: 'HxMap',
  data () {
    return {
      idName: `hx-map`,
      map: null,
      marker: null,
      latitude: null,
      longitude: null
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
    width: {
      type: String,
      default: '100%'
    },
    lng: {
      type: [Number, String],
      default: ''
    },
    lat: {
      type: [Number, String],
      default: ''
    },
    level: {
      type: Number,
      default: 14
    },
    iconUrl: {
      type: String, // 图片的位置
      default: imgPinpoint
    },
    type: {
      type: String,
      default: 'gcj02',
      validator (val) {
        return ['gcj02', 'bd09'].includes(val)
      }
    }
  },
  methods: {
    $_reloadMap () {
      const { type } = this
      let lat = this.lat
      let lng = this.lng
      if (!lat || !lng) {
        return 
      }
      if (type === 'bd09') { // 百度坐标系转换
        const points = bd09togcj02(lng, lat)
        lng = points[0]
        lat = points[1]
      }
      if (!this.map) {
        this.map = new AMap.Map(this.id) // 创建Map实例
      } 
      if (!this.marker) {
        this.marker && this.marker.setMap(null)
        this.marker = null
      }
      this.marker = new AMap.Marker({
        icon: this.iconUrl,
        position: [lng, lat],
        offset: new AMap.Pixel(-13, -40)
      })
      this.marker.setMap(this.map)
      this.map.setZoomAndCenter(this.level, [lng, lat]) // 初始化地图,设置中心点坐标和地图级别
    },
    toCenter (level) {
      this.map.setZoomAndCenter(level || this.level, [this.lng, this.lat])
    }
  },
  mounted () {
    this.$_reloadMap()
  },
  watch: {
    level (newVal) {
      this.toCenter(newVal) // 初始化地图,设置中心点坐标和地图级别
    },
    lat (newVal) {
      this.$_reloadMap() // 初始化地图,设置中心点坐标和地图级别
    },
    lng (newVal) {
      this.$_reloadMap() // 初始化地图,设置中心点坐标和地图级别
    }
  }
}
</script>

<style lang="scss" scoped>
.hx-pad-map {
  position: relative;
  .btn-relocated {
    position: absolute;
    right: 16px;
    background-color: white;
    box-shadow: 0 0 12px rgba(0,0,0,.1);
    bottom: 16px;
    height: 36px;
    width: 36px;
    border-radius: 4px;
    .icon {
      height: 24px;
      width: 24px;
      display: block;
    }
  }
}
.hx-map {
  display: block;
}
</style>
