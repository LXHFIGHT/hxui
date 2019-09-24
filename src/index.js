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
import HxSmartCard from './cpts/HxSmartCard'
import HxSmartUploader from './cpts/HxSmartUploader'
import HxSwitch from './cpts/HxSwitch'
import HxTabbar from './cpts/HxTabbar'
import HxTagEditor from './cpts/HxTagEditor'
import HxTags from './cpts/HxTags'
import HxWaterfall from './cpts/HxWaterfall'
import plugins from './plugins'

const requiredComponents = [HxRow, HxPagination, HxHeader, HxSection]
const install = (Vue) => {
  Vue.prototype.$hxui = plugins
  requiredComponents.forEach((component) => {
    Vue.component(component.name, component)
  })
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
  HxSmartCard,
  HxSmartUploader,
  HxSwitch,
  HxTabbar,
  HxTagEditor,
  HxTags,
  HxWaterfall
}
export default { install }
