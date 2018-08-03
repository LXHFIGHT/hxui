<template>
  <div class="hx-block" v-bind:style="`background-image: url('${project.login.background}')`">
    <div :class="isLoginMode ? 'pad-login center-parent show' : 'pad-login center-parent'">
      <div class="row">
        <img class="logo-company" :src="project.logo" alt="">
      </div>
      <div class="row main-tip" v-text="project.login.title"></div>
      <span class="tip">用户账号</span>
      <div class="row">
        <input type="text" class="input-username" placeholder="" v-model="userInfo.username">
      </div>
      <span class="tip">用户密码</span>
      <div class="row">
        <input type="password" class="input-username" placeholder="" v-model="userInfo.password" @keyup="keyForLogin()">
      </div>
      <div class="row">
        <button :class="!isLogining ? 'hx-button btn-main' : 'hx-button btn-main loading'"
                type="button"
                :disabled="isLogining"
                @click="doLogin()" >
          登录
        </button>
        <button class="hx-button btn-sub"
                type="button"
                @click="toggleMode(false)"
                v-text="'我要注册' + project.subject">
        </button>
      </div>
    </div>
    <div :class="isLoginMode ? 'pad-register center-parent' : 'pad-register center-parent show' ">
      <div class="row">
        <img class="logo-company" :src="project.logo" alt="">
      </div>
      <div class="row main-tip" >
        注册{{project.subject}}账号
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
          注册{{ project.subject }}
        </button>
        <button class="hx-button btn-sub" type="button" @click="toggleMode(true)">登录</button>
      </div>
    </div>

    <div class="hx-copyright">
      <span v-text="project.copyright.content"></span>
      <br>
      <a v-if="project.copyright.icp"
         href="http://www.miitbeian.gov.cn/"
         v-text="project.copyright.icp"></a>
    </div>
  </div>
</template>

<script>
import axios from './../../tools/axios'
import project from './../../config/project'

export default {
  data () {
    return {
      register: {
        password: '',
        passwordConfirm: '',
        username: '',
        email: ''
      },
      project,
      isLoginMode: true,
      userInfo: {
        username: '',
        password: ''
      },
      isLogining: false
    }
  },
  methods: {
    toggleMode (params) {
      this.isLoginMode = params
    },
    doLogin () {
      this.isLogining = true
      axios.doPost('user/login', this.userInfo).then((res) => {
        console.log('LOGIN RESPONSE: ', res)
        this.isLogining = false
      }).catch(() => {
        this.isLogining = false
      })
    },
    doRegister () {
      console.log('注册')
    },
    keyForLogin () {
      if (event.keyCode === 13) {
        this.doLogin()
      }
    },
    keyForRegister () {
      console.log('Yahoo')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./../../hxui/scss/index.scss";
</style>
