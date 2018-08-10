<template>
  <div @click="doToggle(!value)"
       :class="['hx-switch center-vertical', (value ? 'on' : '')]">
  </div>
</template>

<script>
export default {
  name: 'HxSwitch',
  data () {
    return {}
  },
  props: {
    doToggle: {
      type: Function,
      required: true
    },
    value: {
      type: Boolean
    }
  }
}
</script>
