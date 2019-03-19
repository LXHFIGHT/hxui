<template>
  <div class="pad-image-uploader" :style="`height: ${height}`">
    <input class="uploader-images"
      :id="id"
      ref="uploader"
      :accept="accept"
      @change="doUploadImage"
      type="file" 
      name="file" 
      multiple="multiple" >
    <div class="hx-image-uploader" v-if="value">
      <img v-if="value && typeof value === 'string'" :src="value" />
      <div class="functions" >
        <button @click="doPreviewImage(value)"
                class="fa fa-eye">
        </button>
        <button @click="triggerUploadImage(id)"
                :diabled="isUploading"
                v-if="!noUpload"
                :class="isUploading ? 'fa fa-circle-o-notch fa-spin fa-3x fa-fw' : 'fa fa-upload'">
        </button>
        <button @click="doClearImage" class="fa fa-trash"></button>
      </div>
    </div>
    <button class="btn-upload"
            @click="triggerUploadImage(id)"
            :diabled="isUploading"
            v-if="!value">
      <span class="icon fa fa-picture-o" style="top: 1px; position: relative"></span>
      {{ isUploading ? '上传中...' : text }}
      </button>
  </div>
</template>

<script>
import previewImage from './../plugins/imagePreviewer'
const SIZE_KB = 1024 // 1KB大小
const SIZE_MAX_FOR_CANVAS = 2000 * 2000 // canvas最大像素限制
const SIZE_MAX_FOR_IMAGE = 1000 * 1000 // 图片大于
/**
 * 组件： 上传图片组件
 * @prop Function 当上传图片到浏览器后，需要执行的操作，接受两个参数，前者是包含上传的文件对象 FormData，后者是这个上传组件的ID
 */
export default {
  name: 'hx-image-uploader',
  data () {
    return {
      isUploading: false,
      isCompressing: false
    }
  },
  props: {
    // 通过 v-model 绑定上传图片数据
    id: {
      type: String,
      default: 'image-uploader'
    },
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
    doUpload: {
      type: Function,
      required: true
    },
    noUpload: {
      type: Boolean,
      default: false
    },
    maxsize: { // 当超过多少KB时执行压缩图片任务
      type: Number,
      default: 200
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
          continue
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
        console.log('每行每列排多少个瓦片：', count)
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
    doUploadImage () {
      // TODO 异步处理
      this.$_gatheringImagesData(event.target.files, (fileDatas) => {
        const files = fileDatas
        const data = new FormData()
        data.append(this.name, files[0])
        this.isUploading = true
        this.doUpload(data, this.id)
      })
    },
    triggerUploadImage () {
      document.getElementById(this.id).click()
    },
    doPreviewImage (image) {
      previewImage(image)
    },
    doClearImage () {
      this.$emit('input', '')
    }
  },
  mounted () {
    // console.log('IMAGE: ', this.image)
  },
  watch: {
    value: {
      handler (val, oldVal) {
        this.$refs.uploader.value = ''
        this.isUploading = false
      },
      deep: true
    }
  }
}
</script>
