<template>
  <article class="pad-article">
    <header class="title">按钮组件 HxButton</header>
    <span class="desc">HXUI提供一套供快捷使用的按钮组件</span>
    <!-- 配置按钮样式 -->
    <div class="section">
      <span class="title">配置按钮样式</span>
      <span class="desc">通过设置不同的type显示不同的颜色，代表不同的警告级别</span>
      <div class="pad-preview">
        <div class="demo">
          <hx-button type="main">主题色</hx-button>
          <hx-button type="success">正常</hx-button>
          <hx-button type="default">默认</hx-button>
          <hx-button type="warn">警告</hx-button>
          <hx-button type="error">错误</hx-button>
          <hx-button type="fatal">崩溃</hx-button>
        </div>
        <div class="code">
          <span class="tips">
            按钮 type 属性会对应到 HxButton 的类中
          </span>
          <pre class="detail" v-highlightjs="text" >
            <code class="xml">
            </code>
          </pre>
        </div>
      </div>
    </div>
    <!-- 配置按钮大小 -->
    <div class="section">
      <span class="title">配置按钮大小</span>
      <span class="desc">通过设置不同的size显示不同大小</span>
      <div class="pad-preview">
        <div class="demo">
          <hx-button size="sm">小按钮</hx-button>
          <hx-button size="md">按钮</hx-button>
          <hx-button size="bg">大按钮</hx-button>
        </div>
        <div class="code">
          <span class="tips">
            按钮 size 属性会对应到 HxButton 的类中
          </span>
          <pre class="detail" v-highlightjs="sizeText" >
            <code class="xml">
            </code>
          </pre>
        </div>
      </div>
    </div>
    <!-- 配置按钮类型 -->
    <div class="section">
      <span class="title">配置按钮类型</span>
      <span class="desc">空心类型按钮添加 blank属性，文本类型按钮添加 text属性</span>
      <div class="pad-preview">
        <div class="demo">
          <hx-button type="main" blank>主题色</hx-button>
          <hx-button type="success" blank>正常</hx-button>
          <hx-button type="warn" blank>警告</hx-button>
          <hx-button type="main" text>主题色</hx-button>
          <hx-button type="success" text>正常</hx-button>
          <hx-button type="warn" text>警告</hx-button>
        </div>
        <div class="code">
          <span class="tips">
            按钮 <em>type</em>  属性会对应到 HxButton 的类中
          </span>
          <pre class="detail" v-highlightjs="typeText" >
            <code class="xml">
            </code>
          </pre>
        </div>
      </div>
    </div>
    <div class="section">
      <span class="title">
        HxButton Props
      </span>
      <div class="hx-table">
        <table>
          <thead>
            <tr>
              <td class="sm">参数</td>
              <td class="bg">说明</td>
              <td class="sm">类型</td>
              <td class="bg">可选值</td>
              <td class="md">默认值</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>type</td>
              <td>按钮样式类型</td>
              <td>String</td>
              <td>main/default/success/warn/error/fatal</td>
              <td>default</td>
            </tr>
            <tr>
              <td>size</td>
              <td>按钮大小</td>
              <td>String</td>
              <td>sm 小/md 默认/bg 大</td>
              <td>md</td>
            </tr>
            <tr>
              <td>blank</td>
              <td>空心按钮</td>
              <td>Boolean/String</td>
              <td>true/false/“blank”</td>
              <td>false</td>
            </tr>
            <tr>
              <td>text</td>
              <td>文字按钮</td>
              <td>Boolean/String</td>
              <td>true/false/“text”</td>
              <td>false</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </article>
</template>

<script>
import HxSection from '@/hxui/cpts/HxSection'
import HxButton from '@/hxui/cpts/HxButton'
export default {
  components: {
    'hx-section': HxSection,
    HxButton
  },
  data () {
    return {
      text: `
<hx-button type="main"> 主题色 </hx-button>
<hx-button type="success"> 正常 </hx-button>
<hx-button type="default"> 默认 </hx-button>
<hx-button type="warn"> 警告 </hx-button>
<hx-button type="error"> 错误 </hx-button>
<hx-button type="fatal"> 崩溃 </hx-button>
  `,
      sizeText: `
<hx-button size="sm"> 小按钮 </hx-button>
<hx-button size="md"> 按钮 </hx-button>
<hx-button size="bg"> 大按钮 </hx-button>`,
      typeText: `
<hx-button type="main" blank>主题色</hx-button>
<hx-button type="success" blank>正常</hx-button>
<hx-button type="warn" blank>警告</hx-button>
<hx-button type="main" text>主题色</hx-button>
<hx-button type="success" text>正常</hx-button>
<hx-button type="warn" text>警告</hx-button>
      `
    }
  },
  methods: {
    popTips (position) {
      this.$hxui.popTip({
        text: 'Yahoo',
        position,
        level: 'error'
      })
    },
    popConfirm () {
      const that = this
      this.$hxui.confirm({
        text: 'You are sure to access the file',
        level: 'error',
        onConfirm () {
          that.$hxui.popTip('Yahoo China')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./../global.scss";
</style>
