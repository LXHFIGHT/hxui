<template>
  <div :class="['hx-smart-uploader', isVideo && 'video-mode']" 
    ref="hxSmartUploader"
    :required="!!required ? 'required' : false"
    :data-value="value"
    :style="`height: ${height}; width:${width};`">
    <input class="uploader-images"
      :id="id || key"
      ref="uploader"
      :accept="accept"
      @change="doUploadImage"
      type="file"
      :name="name"
      :multiple="multiple">
    <div class="pad-image" v-if="!$_isEmpty(value) && !isVideo && typeof value === 'string'">
      <img class="image" :src="value" />
    </div>
    <div class="pad-video" v-if="!$_isEmpty(value) && isVideo && typeof value === 'string'">
      <video ref="videoComponent" class="video" :src="value" controls></video>
    </div>
    <div class="pad-images" v-if="showImages">
      <div class="pad-image" ref="padImage" v-for="(img, idx) in value" :key="idx">
        <img :src="img" />
      </div>
    </div>
    <div class="pad-functions" v-if="!$_isEmpty(value)">
      <button class="btn-last" v-if="index !== 0 && !$_isString() && !isVideo" @click="toImageIndex(index - 1)">
        <icon-left class="icon"></icon-left>
      </button>
      <span class="text-amount" v-if="!$_isString() && !isVideo" v-text="`${index + 1}/${value.length}`"></span>
      <button class="btn-next" v-if="index !== value.length - 1 && !$_isString()" @click="toImageIndex(index + 1)">
        <icon-right class="icon"></icon-right>
      </button>
      <button class="btn-preview" @click="doPreviewImage()" v-if="!isVideo">
        <IconExpend class="icon" v-if="!isUploading"></IconExpend>
      </button>
      <button @click="triggerUploadImage(id)"
        :disabled="isUploading"
        v-if="!disabled"
        class="btn-upload">
        <IconUpload class="icon"></IconUpload>
      </button>
      <button @click="doClearImage"
        v-if="!disabled"
        class="btn-delete">
        <IconDelete class="icon"></IconDelete>
      </button>
    </div>
    <button class="btn-upload"
      @click="triggerUploadImage(id)"
      :disabled="isUploading || disabled"
      v-if="$_isEmpty(value)">
      <span class="icon">
        <IconImage v-if="!isVideo" class="icon"></IconImage>
        <IconVideo v-if="isVideo" class="icon"></IconVideo>
      </span>
      <span class="text" v-if="!isImageError">{{ isUploading ? '正在上传' : text }}</span>
      <span class="text" v-if="isImageError">图片请重新上传</span>
    </button>
    <div class="pad-uploading" v-if="loading || isUploading">
      <hx-loading-icon height="30px" class="icon-loading"></hx-loading-icon>
      <span class="text-uploading" v-text="loadingText"></span>
    </div>
  </div>
</template>

<script>
import HxLoadingIcon from './../cpts/HxLoadingIcon'
import IconExpend from './../img/svg/expend.svg' 
import IconUpload from './../img/svg/upload.svg' 
import IconDelete from './../img/svg/delete.svg' 
import IconImage from './../img/svg/image.svg'
import IconVideo from './../img/svg/video.svg'
import IconLeft from './../img/svg/left.svg'
import IconRight from './../img/svg/right.svg'
import { randomString } from './../tools/object'
import { uploadFiles } from './../tools/http'
import previewImage from './../plugins/imagePreviewer'
import compressImage from './../plugins/compressImage'
/**
 * 组件： 上传图片组件
 * @prop Function 当上传图片到浏览器后，需要执行的操作，接受两个参数，前者是包含上传的文件对象 FormData，后者是这个上传组件的ID
 */
export default {
  name: 'hx-smart-uploader',
  components: {
    IconVideo,
    IconExpend,
    IconUpload,
    IconDelete,
    IconImage,
    IconLeft,
    IconRight,
    HxLoadingIcon
  },
  data () {
    return {
      key: ``,
      index: 0,
      text: '',
      isUploading: false,
      isCompressing: false,
      isImageError: false,
      padImagesWidth: 0,
      isVideo: '' // 接受类型是否为视频
    }
  },
  props: {
    // 通过 v-model 绑定上传图片/视频数据
    id: {
      type: String,
      default: ``
    },
    // 如果上传逻辑是在业务组件中进行，则是用此方法
    doUpload: {
      type: Function
    },
    loading: { // 是否处于上传中的状态
      type: [String, Number, Boolean],
      default: '' 
    },
    loadingText: {
      type: String,
      default: '上传中'
    },
    // 服务端上传文件的路径，配合onUpload方法使用
    uploadApi: {
      type: String
    },
    // 当成功上传之后的处理方法，接受一个参数，对应上传成功服务端返回的链接等信息
    onUpload: {
      type: Function
    },
    name: {
      type: String,
      default: 'filename'
    },
    multiple: { // 组件是否多选上传，当上传内容为视频时，不支持该项 
      type: [Boolean, String, Number],
      default: false
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    height: {
      type: String,
      default: '150px'
    },
    width: {
      type: String,
      default: '220px'
    },
    required: { // 是否为必填项
      type: [String, Boolean, Number],
      default: false
    },
    maxsize: { // 当超过多少KB时执行压缩图片任务
      type: Number,
      default: 200
    },
    disabled: {
      type: [String, Number, Boolean],
      default: false
    },
    // 文件（仅限图片类型）上传之前的压缩比例, 不传的情况下则不会对图片进行压缩
    compress: { 
      type: Number
    },
    value: {
      type: [String, Array]
    }
  },
  methods: {
    $_init () {
      if (this.accept.includes('video')) {
        this.isVideo = true
        this.text = '上传视频'
        this.$_initVideoLayout()
      } else {
        this.doAnalyseImage()
        this.text = '上传图片'
      }
    },
    $_initVideoLayout () {
      const $hxSmartUploader = this.$refs.hxSmartUploader
      const t = window.setTimeout(() => {
        const $videoComponent = this.$refs.videoComponent
        if (!$videoComponent) {
          return
        }
        $videoComponent.height = $hxSmartUploader.offsetHeight
        $videoComponent.width = $hxSmartUploader.offsetWidth
        window.clearTimeout(t)
      }, 100)
    },
    $_isEmpty () {
      if (!this.value) {
        return true
      } 
      if (Array.isArray(this.value) && this.value.length === 0) {
        return true
      }
      return false
    },
    $_isString () {
      return typeof this.value === 'string'
    },
    $_analyseImage (image) {
      let img = new Image()
      if (!image) {
        return
      }
      img.src = image
      img.onload = () => {
        this.isImageError = false
        this.isUploading = false
      }
      img.onerror = (err) => {
        console.warn('Image error: ', err)
        this.isImageError = true
        this.isUploading = false
      }
    },
    toImageIndex (index) {
      this.index = index
    },
    doUploadImage () {
      this.isUploading = true
      compressImage({
        files: event.target.files, 
        compress: this.compress,
        maxsize: this.maxsize,
        handler: (fileDatas) => {
          const files = fileDatas
          this.isImageError = false
          if (this.doUpload instanceof Function) {
            this.doUpload(fileDatas, this.id)
          } else if (this.uploadApi && this.onUpload instanceof Function) {
            const data = new FormData()
            for (let i = 0; i < files.length; i++) {
              data.append(`${this.name}${this.multiple ? ('_' + i) : ''}`, files[i], `compress_img_${i}.jpg`)
            }
            uploadFiles(this.uploadApi, data).then(res => {
              if (res) {
                this.isUploading = false
                this.onUpload(res, this.id)
              }
            }).catch(err => {
              this.isUploading = false
              console.error(err)
            })
          } else {
            console.warn('使用HxSmartUploader上传组件需要传入 onUpload和uploadApi参数 或 doUpload 方法')
          }
        }
      })
    },
    triggerUploadImage () {
      const id = this.id || this.key
      document.getElementById(id).click()
    },
    doPreviewImage () {
      if (typeof this.value === 'string') {
        previewImage(this.value)
      } else {
        previewImage({ current: this.value[this.index], urls: this.value })
      }
    },
    doClearImage () {
      if (typeof this.value === 'string') {
        this.$emit('input', '')
      } else {
        let newValue = [].concat(this.value)
        if (this.index === this.value.length - 1) {
          this.index--
        }
        newValue.splice(this.index, 1)
        this.$emit('input', newValue)
      }
    },
    doAnalyseImage () {
      if (typeof this.value === 'string') {
        this.$_analyseImage(this.value)
      } else if (Array.isArray(this.value)) {
        for (let i = 0; i < this.value.length; i++) {
          this.$_analyseImage(this.value[i])
        }
      }
    }
  },
  created () {
  },
  mounted () {
    this.$_init()
    this.key = `image-uploader-${randomString(6)}`
    this.padImagesWidth = this.$refs.hxSmartUploader.clientWidth
  },
  watch: {
    value (val, oldVal) {
      this.$refs.uploader.value = ''
      this.isUploading = false
      this.index === -1 && (this.index = 0)
      if (typeof val === 'string' && !this.isVideo) {
        this.$_analyseImage(val)
      } else if (typeof val === 'string' && this.isVideo) {
        this.$_initVideoLayout()
      }
    },
    index (newVal) {
      if (this.$refs.padImage) {
        for (let i = 0; i < this.$refs.padImage.length; i++) {
          this.$refs.padImage[i].style.transform = `translateX(-${newVal * this.padImagesWidth}px)`
        }
      }
    }
  },
  computed: {
    /**
     * 是否展示已上传图片列表，
     * 只有在已有图片上传，且非视频内容以及是一个数组的时候才进行展示
     */
    showImages () {
      return !this.$_isEmpty(this.value) && !this.isVideo && Array.isArray(this.value)
    }
  }
}
</script>
