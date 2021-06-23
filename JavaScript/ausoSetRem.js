/*
 * @Author: Nicholas Fung
 * @Date: 2021-06-23 22:47:14
 * @LastEditTime: 2021-06-23 23:24:15
 * @LastEditors: Nicholas Fung
 * @Description:  自适应布局的一种实现方式，对应页面的盒子宽高、字体大小都要使用相对单位rem 才行
 * @Usage:
 * 1、在需要响应式布局的页面或者项目入口文件 import { autoSetRem } from 'xxx/autoSetRem'
 * 2、页面挂载完调用 autoSetRem()
 */



const baseFontSize = 16 // 设置基准字体大小，根据需要自行设置
const setRem = (baseViewportWidth = 1920) => { // baseViewportWidth 设置默认值为 1920 根据你实际需求更改
  // document.documentElement 获取的是 html 标签
  const scale = document.documentElement.clientWidth / baseViewportWidth // 根据当前浏览器视口宽度与设置的基准视口宽度计算得出缩放系数

  // 根据基准字体大小、缩放系数设置网页基准字体大小
  // 这里使用 Math.min(scale, 2) 限制最大缩放系数为2， 根据需要自行更改
  // 这里设置的是html标签的字体大小，当然，页面元素的字体大小如果有设置会以对应元素设置的为准，对应都用 rem 单位会比较好，只要设置了基准字体，会自动计算成对应的px单位
  // 比如， 16px => 1rem , 那么 32px => 2rem , 8px => 0.5rem 以此类推
  document.documentElement.style.fontSize = (baseFontSize * Math.min(scale, 2)) + 'px'
}

const autoSetRem = () => {
  setRem(document.documentElement.clientWidth) // 初始化，读取当前浏览器视口的实际宽度作为基准视口宽度，避免是使用上述1920作为基准视口宽度导致显示效果较小
  window.onresize = () => { // 每次页面大小改变时，需要重新计算页面字体大小
    const viewportWidth = document.documentElement.clientWidth

    // 别问，问就是需求需要这么做……
    let baseViewportWidth = 1280
    if (viewportWidth < 1280) {
      baseViewportWidth = 1280
    } else if (viewportWidth >= 1280 && viewportWidth <= 1920) {
      baseViewportWidth = viewportWidth
    } else {
      baseViewportWidth = 1920
    }

    setRem(baseViewportWidth)
  }
}

export { autoSetRem }
