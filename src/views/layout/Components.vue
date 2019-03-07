<template>
  <div>
    组件展示
  </div>
</template>

<script>
import axios from './../../tools/axios'
export default {
  data () {
    return {}
  },
  methods: {},
  mounted () {
    axios.doGet('inspect-stations', {}).then(res => {
      console.log('Response: ', res)
    })
  }
}
</script>
