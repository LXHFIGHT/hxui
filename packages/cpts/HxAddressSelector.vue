<template>
  <div :class="['hx-modal choose-address-modal', (show ? 'show' : '')]">
    <div class="mask" @click="onHide"></div>
    <div class="pad-address-content">
      <div class="pad-address-selector">
        <input type="text"
          class="inputer"
          ref="address"
          id="suggestion"
          placeholder="点此输入地址搜索"/>
        <button class="btn-close-modal" @click="onHide"></button>
      </div>
      <div class="pad-map">
        <div class="map" id="baidu-map" />
        <img class="icon-pinpoint"
             src="./../img/icon/icon-pinpoint.png" alt=""/>
        <button class="btn-pinpoint">
          <img src="./../img/icon/icon-current-location.png" alt=""/>
        </button>
      </div>
      <div class="pad-poi">
        <div class="item-poi special" @click="doChoosePinPoint">
          选择坐标图标所指位置
          <button class="hx-button sm green btn-select-poi">
            选择
          </button>
        </div>
        <div v-if="state.poi.length">
          <div v-for="item in state.poi"
            v-bind:key="item.title"
            class="item-poi"
            @click="doChooseItem(item)">
            {{item.title}}
            <small v-text="item.address"></small>
            <button class="hx-button sm btn-select-poi">
              选择
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const BMap = window.BMap
export default {
  name: 'HxAddressSelector',
  data () {
    return {
      map: {},
      Geolocation: {},
      Geocoder: {},
      Autocomplete: {},
      state: {
        location: {},
        poi: []
      }
    }
  },
  props: {
    onSelect: {
      type: Function,
      required: true
    },
    onHide: {
      type: Function,
      required: true
    },
    show: {
      type: Boolean
    }
  },
  methods: {
    /**
     * 获取地图正中央点位置及附近点的POI
     * @private
     */
    $_getSurroundingPOIs () {
      if (this.map) {
        const { lat, lng } = this.map.getCenter()
        this.Geocoder.getLocation(new BMap.Point(lng, lat), (result) => {
          if (result) {
            this.state.poi = result.surroundingPois
          }
        })
      }
    },
    $_pinpointCurrentLocation () {
      const that = this
      this.Geolocation.getCurrentPosition(function (r) {
        that.map.centerAndZoom(r.point, 16) // 初始化地图,设置中心点坐标和地图级别
        const { lat, lng } = r.point
        that.state.location = { lat, lng, address: '' }
        that.$_getSurroundingPOIs()
      }, {
        enableHighAccuracy: true
      })
    },
    $_closeModal () {
      this.onHide()
    },
    $_initMap () {
      const that = this
      this.map = new BMap.Map('baidu-map') // 创建Map实例
      this.map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
      this.Geolocation = new BMap.Geolocation()
      this.Geocoder = new BMap.Geocoder()
      // 自动填充组件
      this.Autocomplete = new BMap.Autocomplete({
        input: 'suggestion',
        location: this.map
      })
      this.$_pinpointCurrentLocation()
      /**
       * 搜索并定位到指定的位置
       * @param value 地址名
       */
      const _setPlace = (value) => {
        function mySpot () {
          const pinpoint = local.getResults().getPoi(0).point
          that.map.centerAndZoom(pinpoint, 16)
          that.$_getSurroundingPOIs()
        }
        let local = new BMap.LocalSearch(this.map, {
          onSearchComplete: mySpot
        })
        local.search(value)
      }
      this.Autocomplete.addEventListener('onconfirm', function (e) {
        const _value = e.item.value
        const selectValue = `${_value.province}${_value.city}${_value.district}${_value.street}${_value.business}`
        _setPlace(selectValue)
      })
      this.map.addEventListener('touchend', (e) => {
        this.$_getSurroundingPOIs()
      })
      this.map.addEventListener('mouseup', (e) => {
        this.$_getSurroundingPOIs()
      })
    },
    doChooseItem (item) {
      const { address, city, point, title } = item
      const { lng, lat } = point
      this.onHide()
      this.onSelect({ address, city, lng, lat, title })
    },
    doChoosePinPoint () {
      const address = this.$refs.address.value || ''
      const pinpoint = this.map.getCenter()
      const { lng, lat } = pinpoint
      this.onHide()
      this.onSelect({ address, lng, lat })
    }
  },
  mounted () {
    this.$_initMap()
  }
}
</script>
