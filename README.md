<!--
 * @Author       : liuxuhao
 * @LastEditors  : liuxuhao
-->
<br/><br/>
<img style="height: 50px; margin: 0 auto; display: block;" src="https://lxh-static.oss-cn-shenzhen.aliyuncs.com/img/img-hxui-logo-font.png" />
<br/><br/>
<span style="text-align: center; display: block;">A sweet UI component library for Vue.js</span>
<br />
<div style="text-align: center">

[![npm version](https://img.shields.io/npm/v/hxui.svg)](https://www.npmjs.com/package/hxui)
![license](https://img.shields.io/npm/l/hxui)
![size](https://img.shields.io/bundlephobia/minzip/hxui)
![lastCommit](https://img.shields.io/github/last-commit/LXHFIGHT/hxui)
![lastCommit](https://img.shields.io/github/commit-activity/y/LXHFIGHT/hxui)

</div>

<br/>

## Install
```shell
npm i -S hxui
```

### Quick Start

located `main.js` in your project created by Vue.js
```javascript
import Vue from 'vue'
import hxui from 'hxui'
import 'hxui/lib/hxui.css' // important

Vue.use('hxui')
```
<span style="color: #999;">The above imports all plugins and four components of HXUI lib. Please note that CSS file needs to be imported separately.</span>

### Use Plugins
It is easy to use **HXUI plugins**. What you need to do is to simply call the method in **this.$hxui** in your vue template file.

```javascript
this.$hxui.toast.success('Hello world')

this.$hxui.validate('.form-sweet')
```

### Use Components
```javascript
import { 
  HxTagEditor, 
  HxSmartUploader
} from 'hxui'

export default {
  components: {
    // other components
    HxTagEditor,
    HxSmartUploader
  },
  // ...
}
```

### Browser Support

Modern browsers and Internet Explorer 10+.

