<template>
  <div class="hx-checkbox-group">
    <button v-for="(item, idx) in options" 
      :key="idx"
      @click="doSelectItem(item)"
      :class="['item', value.includes(item.value) && 'selected']">
      <img class="icon-check" src="./../img/icon/icon-check.png" alt="">
      {{ item.key }}
    </button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      options: []
    }
  },
  props: {
    content: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      required: true
    }
  },
  methods: {
    $_init () {
      this.options = this.content.map((v, i) => {
        let item = {}
        if (typeof v === 'object') {
          item = v
        } else {
          item.key = v
          item.value = v
        }
        return item
      })
    },
    doSelectItem (item) {
      const tempValue = [].concat(this.value)
      if (tempValue.includes(item.value)) {
        for (let i = 0; i < tempValue.length; i++) {
          if (tempValue[i] === item.value) {
            tempValue.splice(i, 1)
            break
          }
        }
      } else {
        tempValue.push(item.value)
      }
      this.$emit('input', tempValue)
    }
  },
  created () {
    this.$_init()
  }
}
</script>
<style lang="scss" scoped>
@import "./../scss/variable.scss";
.hx-checkbox-group {
  display: block;
  .item {
    margin: 0 $pm-sm $pm-sm/2 0;
    padding: $pm-sm/2;
    position: relative;
    background-color: transparent;
    transition: background-color .4s;
    font-size: $font-md;
    &.selected {
      .icon-check {
        background-color: $color-main;
      }
      &:hover {
        .icon-check {
          background-color: darken($color-main, 5%);
        }
      }
    }
    .icon-check {
      height: $height-normal/2;
      width: $height-normal/2;
      display: inline-block;
      padding: $pm-sm/2;
      background-color: $color-gray-light;
      float: left;
      margin-right: $pm-sm;
      border-radius: $pm-sm/2;
    }
    &:hover {
      background-color: $color-gray-light;
    }
  }
}
</style>
