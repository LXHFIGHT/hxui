<template>
  <div class="pad-image-uploader">
    <input class="uploader-images"
           :id="id"
           :accept="accept"
           @change="doUploadImage"
           type="file" name="file" multiple="multiple" >
    <div class="hx-image-uploader" v-if="image">
      <img v-if="image"
           :src="image" />
      <div class="functions" >
        <button @click="triggerUploadImage(id)"
                :diabled="isUploading"
                :class="isUploading ? 'fa fa-circle-o-notch fa-spin fa-3x fa-fw' : 'fa fa-upload'">
        </button>
        <button v-if="typeof doClearImage === 'function'" @click="clearImage(id)" class="fa fa-trash"></button>
      </div>
    </div>
    <button class="btn-upload"
            @click="triggerUploadImage(id)"
            :diabled="isUploading"
            v-if="!image">
      <span class="icon fa fa-picture-o" style="top: 1px; position: relative"></span>
      {{ isUploading ? '上传中...' : text }}
      </button>
  </div>
</template>

<script>
/**
 * 组件： 上传图片组件
 * @prop Function 当上传图片到浏览器后，需要执行的操作，接受两个参数，前者是包含上传的文件对象 FormData，后者是这个上传组件的ID
 */
export default {
  name: 'HxImageUploader',
  data () {
    return {
      isUploading: false
    }
  },
  props: {
    id: {
      type: String,
      default: 'image-uploader'
    },
    text: {
      type: String,
      default: '上传图片'
    },
    image: {
      type: String
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    doUpload: {
      type: Function,
      required: true
    },
    doClearImage: {
      type: Function
    }
  },
  methods: {
    doUploadImage () {
      const files = event.target.files
      const data = new FormData()
      data.append('file', files[0])
      this.isUploading = true
      this.doUpload(data, this.id)
    },
    triggerUploadImage () {
      document.getElementById(this.id).click()
    }
  },
  updated () {
    this.isUploading = false
  }
}
</script>
