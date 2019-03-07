<template>
  <div class="hx-block">
    <!--HXUI项目首页 -->
    <admin v-if="project.isAdmin"></admin>
    <front-page v-if="!project.isAdmin"></front-page>
  </div>
</template>

<script>
import Admin from '@/components/layout/Admin'
import FrontPage from '@/components/layout/FrontPage'
import { project } from '@/config'
export default {
  components: {
    Admin,
    FrontPage
  },
  data () {
    return {
      project
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>
