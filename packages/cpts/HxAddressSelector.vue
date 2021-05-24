<template>
  <div :class="['hx-modal choose-address-modal', (value ? 'show' : '')]">
    <div class="mask" @click="onHide"></div>
    <div class="pad-address-content">
      <div class="pad-address-selector">
        <input ref="address"
          type="text"
          id="suggestion"
          v-model="searchCity"
          placeholder="搜索地点"/>
        <button class="btn-close-modal" @click="onHide"></button>
      </div>
      <div class="pad-map">
        <div class="map" id="amap-map" />
        <div id="panel"></div>
        <img class="icon-pinpoint" src="./../img/icon/icon-pinpoint.png" alt=""/>
      </div>
      <div class="pad-poi">
        <div class="item-poi special" @click="doChoosePinPoint">
          选择坐标图标所指位置
          <button class="hx-button text sm green btn-select-poi">
            选择
          </button>
        </div>
        <!-- eslint-disable-next-line -->
        <div v-for="item in poiList" v-if="poiList.length"
          v-bind:key="item.name"
          class="item-poi"
          @click="doChooseItem(item)">
          {{item.name}}
          <small v-text="item.address"></small>
          <button class="hx-button text sm green btn-select-poi">
            选择
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const AMap = window.AMap
export default {
  name: 'HxAddressSelector',
  data () {
    return {
      map: {},
      Geolocation: {},
      Geocoder: {},
      Autocomplete: {},
      searchCity: '',
      city: '',
      cityCode: '',
      poiList: [],
      state: {
        location: {},
        poi: []
      },
      lngLat: []
    }
  },
  props: {
    value: {
      type: [Boolean, Number, String],
      default: false
    }
  },
  methods: {
    initMap () {
      let that = this
      this.map = new AMap.Map('amap-map', {
        resizeEnable: true,
        zoom: 12
      })
      AMap.plugin(['AMap.PlaceSearch', 'AMap.Autocomplete', 'AMap.Geolocation'], function () {
        let geolocation = new AMap.Geolocation({
          enableHighAccuracy: true
        })
        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete)
        AMap.event.addListener(geolocation, 'error', onError)
        function onComplete (data) {
          // 获取定位成功
        }
        function onError () {
          // 获取定位失败
        }
        var autoOptions = {
          input: 'suggestion',
          autoFitView: true
        }
        that.autoComplete = new AMap.Autocomplete(autoOptions)
        that.placeSearch = new AMap.PlaceSearch({
          showCover: false,
          map: that.map,
          extensions: 'all',
          autoFitView: false,
          pageSize: 1
        })
        AMap.event.addListener(that.autoComplete, 'select', function (e) {
          let zoom = that.map.getZoom()
          // 有location返回时
          if (e && e.poi.location) {
            that.lngLat = [e.poi.location.lng, e.poi.location.lat]
            that.placeSearch.setCity(e.poi.adcode)
            that.placeSearch.search(e.poi.name)
            that.map.setZoomAndCenter(zoom, that.lngLat)
          } else { // 无location返回时， 使用关键字搜索
            that.placeSearch.setCity(e.poi.adcode)
            that.placeSearch.search(e.poi.name, function (status, result) {
              const { pois } = result.poiList
              that.lngLat = [pois[0].location.lng, pois[0].location.lat]
              that.map.setZoomAndCenter(zoom, that.lngLat)
            })
          }
        })
      })
      that.map.on('moveend', () => {
        that.getNearbyAddress()
        that.map.clearMap()
      })
      that.map.on('zoomend', () => {
        let zoom = that.map.getZoom()
        that.map.setZoomAndCenter(zoom, that.lngLat)
        that.map.clearMap()
      })
      that.getNearbyAddress()
    },
    onHide () {
      this.$emit('input', false)
    },
    onSelect (addressInfo) {
      this.$emit('select', addressInfo)
    },
    select (e) {
      if (e && e.poi.location) {
        let zoom = this.map.getZoom()
        this.lngLat = [e.poi.location.lng, e.poi.location.lat]
        this.placeSearch.setCity(e.poi.adcode)
        this.placeSearch.search(e.poi.name)
        this.map.clearMap()
        this.map.setZoomAndCenter(zoom, this.lngLat)
      }
    },
    getLocationByPlugin (lat, lng) {
      let that = this
      this.map.plugin(['AMap.Geocoder'], function () {
        let geolocation = new AMap.Geocoder({
          radius: 1000,
          batch: true,
          extensions: 'all'
        })
        geolocation.getAddress([lng, lat], (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            that.city = result.regeocode.addressComponent.city || result.regeocode.addressComponent.province
            that.cityCode = result.regeocode.addressComponent.citycode
            that.poiList = result.regeocode.pois
          }
        })
      })
    },
    getNearbyAddress () {
      let { lat, lng } = this.map.getCenter()
      this.getLocationByPlugin(lat, lng)
    },
    doChooseItem (item) {
      const { location, name } = item
      const address = `${item.name} ${item.address}`
      const { lng, lat } = location
      this.onHide()
      this.onSelect({ address, cityCode: this.cityCode, city: this.city, lng, lat, name })
    },
    doChoosePinPoint () {
      const pinpoint = this.map.getCenter()
      const { lng, lat } = pinpoint
      this.onHide()
      this.onSelect({ address: '', lng, lat })
    }
  },
  mounted () {
    this.initMap()
  }
}
</script>

<style lang="scss" scoped>
  @import './../scss/plugins/hx-baidu-map.scss';
</style>
