const SIZE_KB = 1024 // 1KB大小
const SIZE_MAX_FOR_CANVAS = 2000 * 2000 // canvas最大像素限制
const SIZE_MAX_FOR_IMAGE = 1000 * 1000 // 图片大于
/**
 * 收集区分文件数据
 * @param {*} object.files 文件对象列表  通过input[type="file"]的DOM元素的files属性获取
 * @param {*} object.maxsize 需要压缩的文件的大小， 单位是KB: 默认 2MB
 * @param {*} object.compress 是否需要压缩， 单位是1%， 如果需要50%压缩率则填50， 默认不需要压缩
 * @param {*} object.handler 处理（回调）方法， 参数带着压缩后可供append到formData中的文件列表files
 */
export default (object) => {
  let fileDatas = []
  let { files, maxsize, compress, handler } = object
  maxsize = maxsize == null ? 2 * SIZE_KB * SIZE_KB : maxsize // 默认 2MB
  const total = files.length
  for (let i = 0; i < files.length; i++) {
    // 遇到非图片的文件时，直接放入files
    if (!/\/(?:jpeg|png|gif)/i.test(files[i].type)) {
      fileDatas.push(files[i])
      if (fileDatas.length === total) {
        handler instanceof Function && handler(fileDatas)
      } else {
        continue
      }
    }
    const reader = new FileReader()
    reader.onload = function () {
      const done = () => {
        if (result.length < maxsize * SIZE_KB || !compress) {
          fileDatas.push(files[i])
        } else if (compress) {
          const data = _compressImage(img, compress)
          fileDatas.push(_base64ToBlob(data))
        }
        img = null
        if (fileDatas.length === total) {
          handler instanceof Function && handler(fileDatas)
        }
      }
      let result = this.result
      let img = new Image()
      img.src = result
      img.onload = done
    }
    reader.readAsDataURL(files[i])
  }
}
// 压缩图片并返回压缩之后图片的base64数据, 第二个参数则是压缩比例
const _compressImage = (img, compress) => {
  const initSize = img.src.length
  let height = img.height
  let width = img.width
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
  const nData = canvas.toDataURL('image/jpeg', compress / 100)
  console.warn('压缩之前：', initSize)
  console.warn('压缩之后：', nData.length)
  console.warn('压缩比率：', `${(nData.length / initSize) * 100}%`)
  return nData
}
// 将base64数据转换为formData接受的二进制对象
const _base64ToBlob = (baseData, type) => {
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
}
