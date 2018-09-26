<template>
  <div class="hx-row">
    <label>
      {{ label }}
      <span v-if="required || typeof required === 'string'"
        class="tip">*</span>
    </label>
    <div class="content">
      <input
        :required="required"
        :placeholder="placeholder"
        type="text"
        @blur="doBlur"
        @focus="doFocus"
        :value="value"
        @input="doInput">
      <span class="degree" v-if="unit" v-text="unit"></span>
      <span class="degree" v-if="!unit && showLength" v-text="value ? `${value.length}字` : ''"></span>
      <button class="btn-clear" v-if="showClearBtn" @click="doClear">
        <img class="icon" :src="iconClear" alt="">
      </button>
    </div>
  </div>
</template>

<script>
import iconClear from './../img/icon/icon-close.png'
export default {
  name: 'hx-input',
  data () {
    return {
      iconClear
    }
  },
  props: {
    value: String,
    label: {
      type: String,
      default: '标签'
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: [String, Boolean]
    },
    showClearBtn: {
      type: Boolean,
      default: false
    },
    unit: String,
    showLength: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    doInput () {
      const value = event.target.value
      this.$emit('input', value)
    },
    doClear () {
      const view = event.target
      view.value = ''
      view.classList.add('error')
      this.$emit('input', '')
    },
    doBlur () {
      const view = event.target
      if (this.required) {
        !view.value && view.classList.add('error')
      }
    },
    doFocus () {
      const view = event.target
      view.classList.remove('error')
    }
  }
}
</script>
