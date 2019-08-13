<template>
  <article class="pad-article">
    <header class="title">输入框组件 HxInput</header>
    <span class="desc">HXUI提供可以快速使用的表单输入框</span>
    <!-- 文本输入框 -->
    <div class="section">
      <span class="title">文本框</span>
      <span class="desc">
        通过不同参数拓展文本输入框的功能
      </span>
      <div class="pad-preview">
        <div class="demo">
          <hx-row label="正常文本框">
            <hx-input type="text" placeholder="请输入文本..."/>
          </hx-row>
          <hx-row label="不可编辑">
            <hx-input disabled type="text" placeholder="请输入文本..."/>
          </hx-row>
          <hx-row label="带清空按钮">
            <hx-input type="text" showClearBtn="true" placeholder="请输入文本..." error/>
          </hx-row>
          <hx-row label="显示字数">
            <hx-input v-model="hxInput3" type="text" :showLength="true" placeholder="请输入文本..." error/>
          </hx-row>
          <hx-row label="限制10个字数">
            <hx-input v-model="hxInput4" :maxLength="10" type="text" :showLength="true" placeholder="请输入文本..." error/>
          </hx-row>
        </div>
        <div class="code">
          <pre class="detail" v-highlightjs="text" >
            <code class="xml">
            </code>
          </pre>
        </div>
      </div>
    </div>
    <!-- 文本域 -->
    <div class="section">
      <span class="title">文本域</span>
      <span class="desc">通过设置不同的type显示不同的颜色，代表不同的警告级别</span>
      <div class="pad-preview">
        <div class="demo">
          <hx-row label="正常">
            <hx-input :rows="3" type="text" placeholder="请输入文本..."/>
          </hx-row>
          <hx-row label="带清空按钮">
            <hx-input :rows="3" type="text" showClearBtn="true" placeholder="请输入文本..." error/>
          </hx-row>
        </div>
        <div class="code">
          <span class="tips">
            当rows属性大于1时，HxInput显示为文本域形式，参数和文本框一样
          </span>
          <pre class="detail" v-highlightjs="text2" >
            <code class="xml">
            </code>
          </pre>
        </div>
      </div>
    </div>
    <div class="section">
      <span class="title">
        HxInput Props
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
            <tr v-for="(item, idx) in props" :key="idx">
              <td v-text="item.name"></td>
              <td v-text="item.desc"></td>
              <td v-text="item.type"></td>
              <td v-text="item.option"></td>
              <td v-text="item.default"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </article>
</template>

<script>
import HxRow from './../../hxui/cpts/HxRow'
import HxInput from './../../hxui/cpts/HxInput'
export default {
  components: {
    HxInput,
    HxRow
  },
  data () {
    return {
      hxInput3: '',
      hxInput4: '',
      text: `<hx-row label="正常文本框">
  <hx-input type="text" placeholder="请输入文本..."/>
</hx-row>
<hx-row label="不可编辑">
  <hx-input disabled type="text" placeholder="请输入文本..."/>
</hx-row>
<hx-row label="带清空按钮">
  <hx-input type="text" showClearBtn="true" placeholder="请输入文本..."/>
</hx-row>
<hx-row label="显示字数">
  <hx-input v-model="hxInput3" :showLength="true" 
    placeholder="请输入文本..."/>
</hx-row>
<hx-row label="限制10个字数">
  <hx-input v-model="hxInput4" :maxLength="10" :showLength="true" 
    placeholder="请输入文本..."/>
</hx-row>

`,
      text2: `
<hx-row label="正常">
  <hx-input :rows="3" type="text" placeholder="请输入文本..."/>
</hx-row>
<hx-row label="带清空按钮">
  <hx-input :rows="3" type="text" showClearBtn="true" placeholder="请输入文本..." error/>
</hx-row>

`,
      typeText: ``,
      props: [
        { name: 'rows', desc: '行数：> 1时显示为文本域', type: 'Number', option: '整数', default: '1' },
        { name: 'type', desc: '输入框类型', type: 'String', option: 'text/password/tel/number/date/email', default: 'text' },
        { name: 'placeholder', desc: '文本为空时的提示信息', type: 'String', option: '文本', default: '空字符串' },
        { name: 'required', desc: '是否为必填项', type: 'Boolean/String', option: 'true/false/"required"', default: 'false' },
        { name: 'showClearBtn', desc: '是否展示清空按钮', type: 'Boolean/String', option: 'true/false/"showClearBtn"', default: 'false' },
        { name: 'unit', desc: '置于输入框右侧的单位', type: 'String', option: '文本', default: '空字符串' },
        { name: 'showLength', desc: '是否显示已输入字数', type: 'Boolean', option: '整数', default: '空字符串' },
        { name: 'readonly', desc: '是否只读', type: 'Boolean/String', option: 'true/false/"readonly"', default: 'false' },
        { name: 'disabled', desc: '只读且禁用事件', type: 'Boolean/String', option: 'true/false/"disabled"', default: 'false' },
        { name: 'maxLength', desc: '允许输入的最大字符串', type: 'Number', option: '整数', default: '--' }
      ]
    }
  },
  methods: {
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
.demo .hx-button {
  margin-right: $pm-sm;
}
</style>
