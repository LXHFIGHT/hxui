import HxAddressSelector from './cpts/HxAddressSelector'
import HxAutoComplete from './cpts/HxAutoComplete'
import HxButton from './cpts/HxButton/'
import HxCalendar from './cpts/HxCalendar'
import HxCatalog from './cpts/HxCatalog'
import HxCheckboxGroup from './cpts/HxCheckboxGroup'
import HxDatetimePicker from './cpts/HxDatetimePicker'
import HxHeader from './cpts/HxHeader'
import HxImage from './cpts/HxImage'
import HxInput from './cpts/HxInput'
import HxMap from './cpts/HxMap'
import HxMarquee from './cpts/HxMarquee'
import HxMessage from './cpts/HxMessage'
import HxModal from './cpts/HxModal'
import HxNavbar from './cpts/HxNavbar'
import HxOptions from './cpts/HxOptions'
import HxPagination from './cpts/HxPagination'
import HxProgressBar from './cpts/HxProgressBar'
import HxProgressModal from './cpts/HxProgressModal'
import HxRank from './cpts/HxRank'
import HxRow from './cpts/HxRow'
import HxSearch from './cpts/HxSearch'
import HxSection from './cpts/HxSection'
import HxSelector from './cpts/HxSelector'
import HxSlider from './cpts/HxSlider'
import HxSmartcard from './cpts/HxSmartcard'
import HxSmartUploader from './cpts/HxSmartUploader'
import HxSwitch from './cpts/HxSwitch'
import HxTabbar from './cpts/HxTabbar'
import HxTagEditor from './cpts/HxTagEditor'
import HxTags from './cpts/HxTags'
import HxWaterfall from './cpts/HxWaterfall'
import plugins from './plugins'
import './scss/index.scss'

const components = [
  HxRow, 
  HxPagination, 
  HxHeader, 
  HxSection
]
const install = (Vue) => {
  // 注入HXUI插件
  Vue.prototype.$hxui = plugins
  // 注册行、分页、头部和块 组件
  components.forEach((component) => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  HxAddressSelector, // 地址选择组件
  HxAutoComplete,
  HxButton,
  HxCalendar,
  HxCatalog,
  HxCheckboxGroup,
  HxDatetimePicker,
  HxHeader,
  HxImage,
  HxInput,
  HxMap,
  HxMarquee,
  HxMessage,
  HxModal,
  HxNavbar,
  HxOptions,
  HxPagination,
  HxProgressBar,
  HxProgressModal,
  HxRank,
  HxRow,
  HxSearch,
  HxSection,
  HxSelector,
  HxSlider,
  HxSmartcard,
  HxSmartUploader,
  HxSwitch,
  HxTabbar,
  HxTagEditor,
  HxTags,
  HxWaterfall,
  plugins
}

export default { 
  install
}
