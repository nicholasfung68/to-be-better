// apply：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.apply(A, arguments);即A对象应用B对象的方法。
// call：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.call(A, args1,args2);即A对象调用B对象的方法。

// 共同之处：
// 都“可以用来代替另一个对象调用一个方法，将一个函数的对象上下文从初始的上下文改变为由thisObj指定的新对象”。

// 不同之处：
// apply：最多只能有两个参数——新this对象和一个数组argArray。如果给该方法传递多个参数，则把参数都写进这个数组里面，当然，即使只有一个参数，也要写进数组里。如果argArray不是一个有效的数组或arguments对象，那么将导致一个TypeError。如果没有提供argArray和thisObj任何一个参数，那么Global对象将被用作thisObj，并且无法被传递任何参数。
// call：它可以接受多个参数，第一个参数与apply一样，后面则是一串参数列表。这个方法主要用在js对象各方法相互调用的时候，使当前this实例指针保持一致，或者在特殊情况下需要改变this指针。如果没有提供thisObj参数，那么 Global 对象被用作thisObj。 



// 防抖 debounce
function debounce(fn, delay = 200) {
  if (typeof fn !== 'function') {
    throw new TypeError('fn is not a function')
  }
  if (!Number(delay)) {
    throw new TypeError('delay is not a number')
  }

  let timer = null

  if (timer) {
    clearTimeout(timer)
  }

  return function(...args) {
    timer = setTimeout(() => {
      timer = null
      fn.call(this, ...args)
    }, delay)
  }
}


// 节流 throttle -- 使用时间戳实现
function throttle(fn, delay = 200) {
  if (typeof fn !== 'function') {
    throw new TypeError(`${fn} is not a function`)
  }
  if (!Number(delay)) {
    throw new TypeError(`${delay} is not a number`)
  }

  let preTime = new Date().getTime(), curtTime

  return function(...args) {
    curtTime = new Date()
    if (curtTime - preTime >= delay) {
      fn.call(this, ...args)
      preTime = new Date().getTime()
    }
  }
}




