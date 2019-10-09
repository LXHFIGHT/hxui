export const uploadFiles = (path, formData, headers = {}) => {
  return new Promise((resolve, reject) => {
    const requestHeaders = Object.assign({}, headers)
    const _setHeaders = (xhr) => {
      for (let param in requestHeaders) {
        xhr.setRequestHeader(param, requestHeaders[param])
      }
    }
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {}
    xhr.onload = () => {
      try {
        const res = JSON.parse(xhr.response)
        resolve(res)
      } catch (err) {
        reject(err)
      }
    }
    xhr.addEventListener('error', reject)
    xhr.open('POST', path)
    _setHeaders(xhr)
    xhr.send(formData)
  })
}
