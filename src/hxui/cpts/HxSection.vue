<template>
  <div class="hx-section">
    <header>
      <span class="title" v-text="title"></span>
      <slot name="right" class="right"></slot>
    </header>
    <slot class="content" name="content"></slot>
  </div>
</template>

<script>
export default {
  name: 'hx-section',
  props: {
    title: String
  }
}
</script>
