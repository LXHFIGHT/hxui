<template>
  <div class="hx-block">
    <div class="pad-login center-parent"
         :class="isLoginMode ? 'show' : ''">
      <div class="row">
        <img class="logo-company" :src="config.logoUrl" alt="">
      </div>
      <div class="row main-tip" v-bind="config.loginTitle"></div>
      <span class="tip">用户账号</span>
      <div class="row">
        <input type="text" class="input-username" placeholder="" v-model="userInfo.username">
      </div>
      <span class="tip">用户密码</span>
      <div class="row">
        <input type="password" class="input-username" placeholder="" v-model="userInfo.password" @keyup="keyForLogin($event)">
      </div>
      <div class="row">
        <button class="hx-button btn-main" type="button" @click="doLogin()" >登录</button>
        <button class="hx-button btn-sub" type="button" @click="toggleMode(false)" v-bind="'我要注册' + config.subject"></button>
      </div>
    </div>
    <div class="pad-register center-parent"
         :class="isLoginMode ? '' : 'show'">
      <div class="row">
        <img class="logo-company" :src="config.logoUrl" alt="">
      </div>
      <div class="row main-tip" >
        注册{{config.subject}}账号
      </div>
      <span class="tip">用户名</span>
      <div class="row">
        <input type="text" class="input-username" placeholder="" v-model="register.username">
      </div>
      <span class="tip">电子邮箱</span>
      <div class="row">
        <input type="email" class="input-username" placeholder="" v-model="register.email">
      </div>
      <span class="tip">密码</span>
      <div class="row">
        <input type="password"
               class="input-username"
               placeholder=""
               v-model="register.password"
               @keyup="keyForRegister()">
      </div>
      <span class="tip">密码确认</span>
      <div class="row">
        <input type="password"
               class="input-username input-password-confirm"
               placeholder=""
               v-model="register.passwordConfirm"
               @keyup="keyForRegister()">
      </div>
      <div class="row">
        <button class="hx-button btn-main main" type="button" @click="doRegister()">
          注册{{ config.subject }}
        </button>
        <button class="hx-button btn-sub" type="button" @click="toggleMode(true)">登录</button>
      </div>
    </div>

    <div class="hx-copyright" v-bind="config.copyright"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      register: {
        password: '',
        passwordConfirm: '',
        username: '',
        email: ''
      },
      isLoginMode: true,
      config: {},
      userInfo: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    toggleMode (params) {
      console.log(params)
    },
    doLogin () {
      console.log()
    },
    doRegister () {
      console.log('注册')
    },
    keyForLogin () {

    },
    keyForRegister () {
      console.log('Yahoo')
    }
  }
}
</script>

<style lang="scss">

</style>
