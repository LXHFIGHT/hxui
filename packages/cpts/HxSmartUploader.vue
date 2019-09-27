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
        <IconExpend class="icon" v-if="!isUploading"></IconExpend>
        <span v-if="isUploading">上传中</span>
      </button>
      <button @click="triggerUploadImage(id)"
        :diabled="isUploading"
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
      :diabled="isUploading || disabled"
      v-if="$_isEmpty(value)">
      <span class="icon">
        <IconImage class="icon"></IconImage>
      </span>
      <span class="text" v-if="!isImageError">{{ isUploading ? '正在上传' : text }}</span>
      <span class="text" v-if="isImageError">图片请重新上传</span>
    </button>
  </div>
</template>

<script>
import IconExpend from './../img/svg/expend.svg' 
import IconUpload from './../img/svg/upload.svg' 
import IconDelete from './../img/svg/delete.svg' 
import IconImage from './../img/svg/image.svg'
import { randomString, axios } from './../plugins/tools'
import previewImage from './../plugins/imagePreviewer'
import compressImage from './../plugins/compressImage'
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
  components: {
    IconExpend,
    IconUpload,
    IconDelete,
    IconImage
  },
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
      compressImage({
        files: event.target.files, 
        compress: this.compress,
        maxsize: this.maxsize,
        handler: (fileDatas) => {
          const files = fileDatas
          const data = new FormData()
          for (let i = 0; i < files.length; i++) {
            data.append(`${this.name}${this.multiple ? '[]' : ''}`, files[i])
          }
          this.isUploading = true
          this.isImageError = false
          _doUploadImages(this.uploadApi, data).then(res => {
            if (res) {
              this.isUploading = false
              this.onUpload(res.data, this.id)
            }
          }).catch(err => {
            this.isUploading = false
            console.error(err)
          })
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
      font-size: 14px;
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
      .icon {
        height: $height-normal / 2;
        width: auto;
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
      .icon {
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
      position: relative;
      display: block;
      margin: 0 auto $pm-sm;
      height: 40px;
      width: 40px;
      img {
        height: 40px;
        display: block;
        width: auto;
      }
    }
    .text {
      display: block;
      text-align: center;
      width: 100%;
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
