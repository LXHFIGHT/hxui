<template>
  <div class="hx-smart-uploader" ref="hxSmartUploader"
    :style="`height: ${height}; width:${width};`">
    <input class="uploader-images"
      :id="id || key"
      ref="uploader"
      :accept="accept"
      @change="doUploadImage"
      type="file" 
      :name="name"
      :multiple="multiple">
    <div class="pad-image" v-if="!$_isEmpty(value) && typeof value === 'string'">
      <img class="image" :src="value" />
    </div>
    <div class="pad-images" v-if="!$_isEmpty(value) && Array.isArray(value)">
      <div class="pad-image" ref="padImage" v-for="(img, idx) in value" :key="idx">
        <img :src="img" />
      </div>
    </div>
    <div class="pad-functions" v-if="!$_isEmpty(value)">
      <button class="btn-last" v-if="index !== 0 && !$_isString()" @click="toImageIndex(index - 1)">
        <tt>&lt;</tt>
      </button>
      <span class="text-amount" v-if="!$_isString()" v-text="`${index + 1}/${value.length}`"></span>
      <button class="btn-next" v-if="index !== value.length - 1 && !$_isString()" @click="toImageIndex(index + 1)">
        <tt>&gt;</tt>
      </button>
      <button class="btn-preview" @click="doPreviewImage()">
        <img v-if="!isUploading" src="./../img/icon/icon-full-screen.png" alt="">
        <span v-if="isUploading">上传中</span>
      </button>
      <button @click="triggerUploadImage(id)"
        :diabled="isUploading"
        v-if="!disabled"
        class="btn-upload fa fa-upload">
      </button>
      <button @click="doClearImage"
        v-if="!disabled"
        class="btn-delete fa fa-trash">
      </button>
    </div>
    <button class="btn-upload"
      @click="triggerUploadImage(id)"
      :diabled="isUploading || disabled"
      v-if="$_isEmpty(value)">
      <span class="icon fa fa-picture-o" style="top: 3px; position: relative"></span>&nbsp;
      <span v-if="!isImageError">{{ isUploading ? '正在上传...' : text }}</span>
      <span v-if="isImageError">图片请重新上传</span>
    </button>
  </div>
</template>

<script>
import { randomString, axios } from './../plugins/tools'
import previewImage from './../plugins/imagePreviewer'
const SIZE_KB = 1024 // 1KB大小
const SIZE_MAX_FOR_CANVAS = 2000 * 2000 // canvas最大像素限制
const SIZE_MAX_FOR_IMAGE = 1000 * 1000 // 图片大于
const _doUploadImages = (path, formData) => {
  const headers = {
    'Content-Type': 'multipart/form-data'
  }
  return axios['post'](path, formData, { headers })
}
/**
 * 组件： 上传图片组件
 * @prop Function 当上传图片到浏览器后，需要执行的操作，接受两个参数，前者是包含上传的文件对象 FormData，后者是这个上传组件的ID
 */
export default {
  name: 'hx-smart-uploader',
  data () {
    return {
      key: ``,
      index: 0,
      isUploading: false,
      isCompressing: false,
      isImageError: false,
      padImagesWidth: 0
    }
  },
  props: {
    // 通过 v-model 绑定上传图片数据
    id: {
      type: String,
      default: ``
    },
    uploadApi: {
      type: String,
      required: true
    },
    // 当成功上传之后的处理方法，接受一个参数，对应上传成功服务端返回的链接等信息
    onUpload: {
      type: Function,
      required: true
    },
    multiple: { // 组件是否多选上传 
      type: [Boolean, String, Number],
      default: false
    },
    // 上传按钮上的文字
    text: {
      type: String,
      default: '上传图片'
    },
    name: {
      type: String,
      default: 'filename'
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
    maxsize: { // 当超过多少KB时执行压缩图片任务
      type: Number,
      default: 200
    },
    disabled: {
      type: [String, Number, Boolean],
      default: ''
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
    // 获取上传图片的数据 
    $_gatheringImagesData (files, callback) {
      this.isCompressing = true
      let fileDatas = []
      const that = this
      const total = files.length
      for (let i = 0; i < files.length; i++) {
        // 遇到非图片的文件时，直接放入files
        if (!/\/(?:jpeg|png|gif)/i.test(files[i].type)) {
          fileDatas.push(files[i])
          if (fileDatas.length === total) {
            callback instanceof Function && callback(fileDatas)
          } else {
            continue
          }
        }
        const reader = new FileReader()
        reader.onload = function () {
          const done = () => {
            if (result.length < that.maxsize * SIZE_KB || !that.compress) {
              fileDatas.push(files[i])
            } else if (that.compress) {
              const data = that.$_compressImage(img)
              fileDatas.push(that.$_base64ToBlob(data))
            }
            img = null
            if (fileDatas.length === total) {
              callback instanceof Function && callback(fileDatas)
            }
          }
          let result = this.result
          let img = new Image()
          img.src = result
          img.onload = done
        }
        reader.readAsDataURL(files[i])
      }
    },
    // 压缩图片并返回压缩之后图片的base64数据
    $_compressImage (img) {
      const initSize = img.src.length
      let height = img.height
      let width = img.width
      console.log('初始图片高宽：', height, width)
      let ratio = width * height / SIZE_MAX_FOR_CANVAS
      let canvas = document.createElement('canvas')
      // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      if ((ratio > 1)) {
        ratio = Math.sqrt(ratio)
        width /= ratio
        height /= ratio
      } else {
        ratio = 1
      }
      // 部署一个全局的Canvas
      canvas.height = height
      canvas.width = width
      let ctx = canvas.getContext('2d')
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, width, height)
     
      // 将图片瓦片化渲染到canvas上
      let count = width * height / SIZE_MAX_FOR_IMAGE
      if (count > 1) {
        count = ~~(Math.sqrt(count) + 1)
        // 获取每个瓦片的宽高
        let pw = ~~(width / count) 
        let ph = ~~(height / count)
        let tmpCanvas = document.createElement('canvas')
        tmpCanvas.width = pw
        tmpCanvas.height = ph
        let tctx = tmpCanvas.getContext('2d')
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            // canvas drawImage参数详见： http://www.w3school.com.cn/html5/canvas_drawimage.asp
            tctx.drawImage(img, i * pw * ratio, j * ph * ratio, pw * ratio, ph * ratio, 0, 0, pw, ph)
            ctx.drawImage(tmpCanvas, i * pw, j * ph, pw, ph)
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height)
      }
      const nData = canvas.toDataURL('image/jpeg', this.compress / 100)
      console.log('压缩之前：', initSize)
      console.log('压缩之后：', nData.length)
      console.log('压缩比率：', `${(nData.length / initSize) * 100}%`)
      return nData
    },
    // 将base64数据转换为formData接受的二进制对象
    $_base64ToBlob (baseData, type) {
      let baseStr = window.atob(baseData.split(',')[1]) // 将base64数据转为字符串
      let buffer = new ArrayBuffer(baseStr.length)
      let ubuffer = new Uint8Array(buffer)
      for (let i = 0; i < baseStr.length; i++) {
        ubuffer[i] = baseStr.charCodeAt(i)
      }
      let Builder = window.WebKitBlobBuilder || window.MozBlobBuilder
      let blob
      if (Builder) {
        let builder = new Builder()
        builder.append(buffer)
        blob = builder.getBlob(type)
      } else {
        blob = new window.Blob([buffer], { type })
      }
      return blob
    },
    $_analyseImage (image) {
      let img = new Image()
      if (!image) {
        return
      }
      img.src = image
      img.onload = () => {
        console.log('IMAGE LOADED')
        this.isImageError = false
        this.isUploading = false
      }
      img.onerror = (err) => {
        this.isImageError = true
        console.log('IMAGE ERROR:', err)
        this.isUploading = false
      }
    },
    toImageIndex (index) {
      this.index = index
    },
    doUploadImage () {
      // TODO 异步处理
      this.$_gatheringImagesData(event.target.files, (fileDatas) => {
        const files = fileDatas
        const data = new FormData()
        for (let i = 0; i < files.length; i++) {
          data.append(`${this.name}${this.multiple ? '[]' : ''}`, files[i])
        }
        this.isUploading = true
        this.isImageError = false
        _doUploadImages(this.uploadApi, data).then(res => {
          if (res) {
            console.log('success', res.data)
            this.isUploading = false
            this.onUpload(res.data, this.id)
          }
        }).catch(err => {
          this.isUploading = false
          console.error(err)
        })
        // this.doUpload(data, (this.id || this.key))
      })
    },
    triggerUploadImage () {
      const id = this.id || this.key
      document.getElementById(id).click()
    },
    doPreviewImage () {
      console.log('Image', this.value)
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
  mounted () {
    this.doAnalyseImage()
    this.key = `image-uploader-${randomString(6)}`
    if (Array.isArray(this.value)) {
      this.padImagesWidth = this.$refs.hxSmartUploader.clientWidth
    }
  },
  watch: {
    value (val, oldVal) {
      this.$refs.uploader.value = ''
      this.isUploading = false
      this.index === -1 && (this.index = 0)
      if (typeof val === 'string') {
        this.$_analyseImage(val)
      }
    },
    index (newVal) {
      if (this.$refs.padImage) {
        for (let i = 0; i < this.$refs.padImage.length; i++) {
          this.$refs.padImage[i].style.transform = `translateX(-${newVal * this.padImagesWidth}px)`
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./../scss/variable.scss";
/**
  上传图片组件：
    组件中包含图片，功能悬浮框（一般是预览图片功能，重新上传图片功能以及删除图片功能）
 */
.hx-smart-uploader {
  position: relative;
  overflow: hidden;
  display: block;
  height: 100%;
  width: auto;
  min-width: 3*$height-normal + 10px;
  padding: 0;
  background-color: $color-gray;
  text-align: center;
  input[type='file'] {
    display: none;
  }
  .pad-images {
    height: 100%;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    position: relative;
    .pad-image {
      height: 100%;
      position: relative;
      display: inline-block;
      background-color: $color-gray-light;
      width: 100%;
      transform: translateX(0);
      transition: transform .4s;
      overflow: hidden;
      img {
        height: 100%;
        width: auto;
        @include centerHorizontal;
        margin: 0;
        transform: translateX(-50%);
      }
    }
  }
  > .pad-image {
    width: auto;
    height: 100%;
    margin: 0;
    position: relative;
    overflow: hidden;
    .image {
      height: 100%;
      width: auto;
      @include centerHorizontal;
    }
  }
  .pad-functions {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: block;
    position: absolute;
    background-color: rgba(0, 0, 0, .0);
    transition: background-color .4s;
    &:hover {
      background-color: rgba(0, 0, 0, .35);
      .btn-last, .btn-next, .btn-preview, .btn-delete, .btn-upload {
        visibility: visible;
        opacity: 1.0;
      }
    }
    .text-amount, .btn-next, .btn-last, .btn-preview, .btn-upload, .btn-delete {
      position: absolute;
      font-size: 16px;
      display: inline-block;
      height: $height-regular;
      width: $height-regular;
      color: white;
      z-index: 100;
      text-shadow: 0px 2px 2px rgba(0,0,0,.6);
    }
    .text-amount {
      top: 0;
      width: 50px;
      @include centerHorizontal;
    }
    .btn-last, .btn-next, .btn-preview, .btn-delete, .btn-upload {
      background-color: transparent;
      cursor: default;
      position: absolute;
      visibility: hidden;
      opacity: .0;
      transition: all .4s;
      &:hover {
        background-color: rgba(255,255,255,.3);
      } 
    }
    .btn-last { top: 0; left: 0; }
    .btn-next { top: 0; right: 0; }
    .btn-preview { 
      @include centerInParent;
      padding: $pm-sm/2 $pm-sm;
      box-sizing: content-box;
      border-radius: $pm-sm/2;
      width: auto;
      img {
        height: 100%;
        width: auto;
        border: none;
        display: block;
        margin: 0;
      }
    }
    .btn-delete { right: 0; bottom: 0; }
    .btn-upload { right: $height-regular; bottom: 0; }
  }
  &:hover {
    .functions {
      bottom: 0;
    }
  }
  > .btn-upload {
    height: 100%!important;
    width: 100%!important;
    color: $color-gray-deep;
    font-size: $font-bg;
    background-color: white;
    border: 1px solid $color-gray;
    transition: background-color .4s;
    border-radius: $pm-sm/4;
    padding: 0 $pm-bg;
    .icon {
      font-size: 25px;
      padding-left: 0;
    }
    &:hover {
      background-color: $color-gray-light;
    }
    &:active {
      background-color: $color-gray;
    }
  }
}
@media screen and (max-width: 640px) {
  .hx-smart-uploader {
    width: 100%!important;
    max-width: 100%;;
    .functions {
      bottom: $pm-sm/2;
      right: $pm-sm/2;
      width: auto;
      display: inline-block;
      border-radius: $border-radius-md;
    }
    .btn-upload {
      background-color: white;
    }
  }
}
</style>
