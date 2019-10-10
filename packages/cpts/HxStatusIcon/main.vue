<template>
  <div :class="['hx-status-icon', size]">
    <SuccessIcon class="icon" v-if="level === Levels.SUCCESS" :fill="levelFilter(Levels.SUCCESS, 'color')"></SuccessIcon>
    <DefaultIcon class="icon" v-if="level === Levels.INFO || level === Levels.DEFAULT" :fill="levelFilter(Levels.INFO, 'color')"></DefaultIcon>
    <WarnIcon class="icon" v-if="level === Levels.WARN" :fill="levelFilter(Levels.WARN, 'color')"></WarnIcon>
    <ErrorIcon class="icon" v-if="level === Levels.ERROR" :fill="levelFilter(Levels.ERROR, 'color')"></ErrorIcon>
    <FatalIcon class="icon" v-if="level === Levels.FATAL" :fill="levelFilter(Levels.FATAL, 'color')"></FatalIcon>
  </div>
</template>

<script>
import SuccessIcon from './../../img/svg/status-success.svg'
import DefaultIcon from './../../img/svg/status-info.svg'
import WarnIcon from './../../img/svg/status-warn.svg'
import ErrorIcon from './../../img/svg/status-error.svg'
import FatalIcon from './../../img/svg/status-fatal.svg'
import { Levels, levelKeys, levelFilter, sizeKeys, Sizes } from './../../const'
export default {
  components: {
    SuccessIcon,
    DefaultIcon,
    WarnIcon,
    ErrorIcon,
    FatalIcon
  },
  props: {
    level: {
      type: String,
      validator: data => levelKeys.includes(data),
      default: Levels.INFO
    },
    size: {
      type: String,
      validator: data => sizeKeys.includes(data),
      default: Sizes.MD
    }
  },
  data () {
    return {
      Levels
    }
  },
  methods: {
    levelFilter
  }
}
</script>
