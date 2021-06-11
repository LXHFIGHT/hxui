<br/><br/>
<p align="center">
  <img height="50px" style="height: 50px; margin: 0 auto; display: block;" src="https://lxh-static.oss-cn-shenzhen.aliyuncs.com/img/img-hxui-logo-font.png" />
</p>
<br />
<p align="center">A sweet UI component library for Vue.js</p>
<p align="center">
  <a href="https://www.npmjs.com/package/hxui" target="_blank"><img src="https://img.shields.io/npm/v/hxui.svg" alt="npm version"></a>
  <img src="https://img.shields.io/npm/l/hxui" alt="license">
  <img src="https://img.shields.io/bundlephobia/minzip/hxui" alt="size">
  <img src="https://img.shields.io/github/last-commit/LXHFIGHT/hxui" alt="lastCommit">
  <img src="https://img.shields.io/github/commit-activity/y/LXHFIGHT/hxui" alt="commitActivity">
</p>
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

