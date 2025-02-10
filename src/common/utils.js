const dateTimeFormat = function (isoData) {
  var rData = {}
  var time = ''
  var dates = isoData.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
  var timeStamp = new Date(dates.replace(/-/g, '/')).getTime() + 60 * 60 * 8 * 1000
  var Time = new Date(timeStamp)
  var nowTime = new Date()
  var nowStamp = nowTime.getTime()
  var timeDiff = (nowStamp - timeStamp) / 1000
  var year = Time.getFullYear()
  var month = Time.getMonth() + 1
  var date = Time.getDate()
  var hour = Time.getHours()
  var minute = Time.getMinutes()
  var nowyear = nowTime.getFullYear()
  var nowmonth = nowTime.getMonth() + 1
  var nowdate = nowTime.getDate()
  var nowhour = nowTime.getHours()
  if (nowyear > year) {
    time = `${year}/${month}/${date}`
  } else {
    if (nowmonth > month) {
      time = `${month}月${date}日`
    } else {
      if (nowdate > date) {
        time = `${month}月${date}日`
      } else {
        if (nowhour > hour) {
          var t = parseInt(timeDiff / 60 / 60)
          if (t === 0) {
            time = `${parseInt((timeDiff / 60) % 60)}分钟前`
          } else {
            time = `${t}小时前`
          }
        } else {
          var m = parseInt((timeDiff / 60) % 60)
          if (m === 0 || m < 0) {
            m = 1
          }
          time = `${m}分钟前`
        }
      }
    }
  }
  rData.time = time
  if (String(minute).length < 2) {
    minute = `0${minute}`
  }
  if (hour >= 12) {
    rData.timeStamp = `${year}年${month}月${date}日   下午 ${hour - 12}:${minute}`
  } else {
    rData.timeStamp = `${year}年${month}月${date}日   上午 ${hour}:${minute}`
  }

  return rData
}

const format = date => {
  return date.replace('T', ' ').slice(0, 10)
}
// 秒转换为天时分
const formatSeconds = data => {
  let day = Math.floor(data / (24 * 60 * 60)) // 天
  let hour = Math.floor(data % (24 * 60 * 60) / (60 * 60)) // 时
  let minute = Math.floor(data % (24 * 60 * 60) % (60 * 60)) / 60
  return `${day}天${hour}时${minute}分`
}
const cookie = name => {
  let arr = []
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
  if ((arr = document.cookie.match(reg))) return arr[2]
  else return null
}

const validate = {}
validate.phone = (rule, value, callback) => {
  const reg = /^1[3|4|5|7|8][0-9]{9}$/
  if (value !== value.trim() || !reg.test(+value)) callback(new Error('请输入合法的手机号'))
  else callback()
}

validate.productId = (id) => {
  const pattern = /^[abcdef0-9]{24}$/
  return pattern.test(id)
}

validate.productName = (rule, value, callback) => {
  const pattern = /^[a-zA-Z0-9_\u4e00-\u9fa5]{0,20}$/
  const length = value.replace(/[\u4e00-\u9fa5]/g, '  ').length
  if (!pattern.test(value)) callback(new Error('产品名称须为英文、数字、下划线或汉字的组合'))
  if (length > 20) callback(new Error('产品名称不能超过20个字符（汉字长度为2）'))
  else callback()
}

validate.product2Name = (rule, value, callback) => {
  if (!value) return callback()
  const length = value.replace(/[\u4e00-\u9fa5]/g, '  ').length
  if (length < 2) callback(new Error('产品型号不能少于2个字符（汉字长度为2）'))
  if (length > 20) callback(new Error('产品型号不能超过20个字符（汉字长度为2）'))
  else callback()
}

validate.product3Name = (rule, value, callback) => {
  if (!value) return callback()
  const length = value.replace(/[\u4e00-\u9fa5]/g, '  ').length
  if (length < 2) callback(new Error('品牌名称不能少于2个字符（汉字长度为2）'))
  if (length > 30) callback(new Error('品牌名称不能超过30个字符（汉字长度为2）'))
  else callback()
}

validate.h5url = (rule, value, callback) => {
  const pattern = /^https?:\/\/[\w-.]+(:\d+)?/i
  if (!pattern.test(value)) callback(new Error('URL格式有误，请重试！'))
  else callback()
}

validate.sn = (rule, value, callback) => {
  const pattern = /^[\w\-]{4,32}$/
  if (!pattern.test(value)) callback(new Error('IMEI规则：4-32位，只能含数字、大小写字母、下划线和-'))
  else callback()
}

validate.imei = (rule, value, callback) => {
  const pattern = /^[0-9]{15}$/
  if (!pattern.test(value)) callback(new Error('请输入固定15位的纯数字'))
  else callback()
}

validate.imsi = (rule, value, callback) => {
  const pattern = /^[0-9]{1,15}$/
  if (!pattern.test(value)) callback(new Error('请输入1-15位的纯数字'))
  else callback()
}

const formatTime = ISOString => {
  if (!ISOString) return '-'
  const chinaTime = new Date(ISOString).getTime() + 8 * 3600 * 1000
  return new Date(chinaTime).toISOString().replace('T', ' ').slice(0, 19)
}

const scrollDocs = top => {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  const times = 20 // 总共20次完成滚动
  const interval = 20 // 20ms触发一次定时器
  let offset = (top - scrollTop) / times
  // 设置最低速度20px
  if (offset > 0) offset = Math.max(offset, 20)
  else if (offset < 0) offset = Math.min(offset, -20)
  // 位移为0时不做滚动处理
  if (offset !== 0) {
    const timer = setInterval(() => {
      scrollTop += offset
      if ((offset > 0 && scrollTop >= top) || (offset < 0 && scrollTop <= top)) {
        document.documentElement.scrollTop = document.body.scrollTop = top
        clearInterval(timer)
      } else document.documentElement.scrollTop = document.body.scrollTop = scrollTop
    }, interval)
  }
}

const getOneNETURL = () => {
  let url = localStorage.getItem('url')
  url = /^https?:\/\/[\w-.]+(:\d+)?/i.exec(url)
  return url ? url[0] : 'https://open.iot.10086.cn/'
}

const moveImages = (listLeft, listNewLeft, dom, width, step, callback, timer) => {
  timer = setTimeout(() => {
    if ((listNewLeft < listLeft + width && width > 0) || (listNewLeft > listLeft + width && width < 0)) {
      listNewLeft += width / step
      dom.style.left = `${listNewLeft}px`
      moveImages(listLeft, listNewLeft, dom, width, step, callback, timer)
    } else {
      dom.style.left = `${listLeft + width}px`
      clearTimeout(timer)
      callback()
    }
  }, 1000 / 60)
}

const IEVersion = () => {
  var userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
  var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 // 判断是否IE<11浏览器
  var isEdge = userAgent.indexOf('Edge') > -1 && !isIE // 判断是否IE的Edge浏览器
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
  if (isIE) {
    var reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    var fIEVersion = parseFloat(RegExp['$1'])
    if (fIEVersion === 7) {
      return 7 // IE 7
    } else if (fIEVersion === 8) {
      return 8 // IE 8
    } else if (fIEVersion === 9) {
      return 9 // IE 9
    } else if (fIEVersion === 10) {
      return 10 // IE 10
    } else {
      return 6 // IE版本<=6
    }
  } else if (isEdge) {
    return 'edge' // edge
  } else if (isIE11) {
    return 11 // IE11
  } else {
    return -1 // 不是ie浏览器
  }
}
const isRealNum = function (val) { // 字符串都不算
  if (val === '' || val === null) {
    return false
  }
  if (typeof val !== 'number') return false
  return !isNaN(val)
}
const formatFileSize = function (fileSize) {
  if (!isRealNum(fileSize)) return '-'
  if (fileSize < 1024) {
    return fileSize + 'Bytes'
  } else if (fileSize < (1024 * 1024)) {
    let temp = fileSize / 1024
    temp = temp.toFixed(2)
    return temp + 'KB'
  } else if (fileSize < (1024 * 1024 * 1024)) {
    let temp = fileSize / (1024 * 1024)
    temp = temp.toFixed(2)
    return temp + 'MB'
  }
}

const downLoadFile = function (fileName, data) {
  // 兼容ie11,edge
  if (window.navigator.msSaveOrOpenBlob) {
    try {
      const blobObject = new Blob([data])
      window.navigator.msSaveOrOpenBlob(blobObject, decodeURI(fileName))
    } catch (e) {
      console.log(e)
    }
  } else {
    const url = URL.createObjectURL(data)
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', decodeURI(fileName))
    document.body.appendChild(link)
    link.click()
    URL.revokeObjectURL(link.href)
    document.body.removeChild(link)
  }
}
module.exports = {
  dateTimeFormat, // 时间日期格式化 **分钟前/**天前
  format, // 日期格式化 YY-MM-DD
  cookie, // 获取cookie
  validate, // 检查手机号
  formatTime,
  formatSeconds,
  baseUrl: '/hewu/server',
  websiteUrl: '/hewu/website',
  scrollDocs, // 浏览器滚动体验阅览页面
  getOneNETURL, // 从local storage获取onenetURL地址
  moveImages, // 轮播图过程
  IEVersion, // 检测IE浏览器版本
  formatFileSize, // 格式化文件size显示
  downLoadFile // 下载请求是blob的文件
}
