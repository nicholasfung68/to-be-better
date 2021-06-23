const xhr = new XMLHttpRequest() // 新建XMLHttpRequest对象

xhr.open('GET', url, true) // 采用异步GET方式获取url指向的文件
xhr.setRequestHeader('Authorization', localStorage.Authorization ? `Bearer ${localStorage.Authorization}` : '') // 请求头添加认证token
xhr.responseType = 'blob' // 设置响应类型为 blob, 因为 blob 存储着大量的二进制数据
xhr.onload = (e) => {
  const _this = e.target // 写这句因为当时业务代码的this指向的是调用这个方法的Vue实例，并不是当前的 xhr 实例
  if (_this.status === 200) { // 请求成功

    const blob = _this.response
    const a = document.createElement('a') // 创建a标签

    /* URL.createObjectURL()
      创建一个 DOMString，其中包含一个表示参数中给出的对象的URL
      这个 URL 的生命周期和创建它的窗口中的 document 绑定。
      这个新的URL 对象表示指定的 File 对象或 Blob 对象
    */
    a.href = URL.createObjectURL(blob)

    // a.download = fileName // 写这句因为当时业务代码都是先发一个网络请求，拿到了文件名， 比如 aaa.pdf 影响到文件落地

    // XMLHttpRequest.getResponseHeader()方法返回包含指定响应头文本的字符串。
    // Content-Disposition内容举个例子： Content-Disposition: form-data; name="aaa"; filename="aaa.pdf"
    a.download = decodeURIComponent(xhr.getResponseHeader('Content-Disposition').split(';')[2].split('filename=')[1]).replaceAll('"', '') // 视具体情况而定

    document.body.appendChild(a) // 加上body是为了兼容火狐浏览器 
    a.click() // 模拟点击
    document.body.removeChild(a) // 移除a标签
  }
}
xhr.send()
