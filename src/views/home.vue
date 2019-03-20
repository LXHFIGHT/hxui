<template>
  <div class="hx-block bg-gray  pad-center">
    <div class="hx-container">
      <h1 style="font-size: 40px">Thanks for experiencing HXUI</h1>
      <span class="color-gray">We are willing to take any kind of suggestions</span><br />
    </div>
    <footer class="footer">
      <a href="mailto: lxhfight1@gmail.com" class="color-gray">lxhfight1@gmail.com</a>
    </footer>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  @import "./global.scss";
  .pad-center {
    height: calc(100% - #{$height-navbar});
    @include block;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
    position: relative;
    .hx-container {
      padding: $pm-md;
    }
    .footer {
      position: absolute;
      @include centerHorizontal;
      bottom: $pm-bg;
    }
  }
</style>
