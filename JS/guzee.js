// 定义一个函数 log 代替 coslole.log()
var log = console.log.bind(console)

// 定义一个测试函数 ensure(condition, message)
// 判断 condition 的 Boolean 值, true 返回测试成功, false 返回 message 
var ensure = function (condition, message) {
    if (!condition) {
        log(message)
    } else {
        log('*** 测试成功')
    }
}

// 定义一个函数比较两个数组当中的元素是否相同, 忽略元素顺序
var ensureArray = function (a, b) {
    if (a.length != b.length) {
        return false
    }
    for (let i = 0; i < a.length; i++) {
        const element = a[i]
        if (!b.includes(element)) {
            return false
        }
    }
    return true
}

// 注意, 要自行实现 ensureArrayEquals 来判断两个数组是否相等
// 定义一个函数 ensureArrayEquals 判断两个数组是否相等， 返回 Boolean 值
var ensureArrayEquals = function (arr1, arr2) {
    if (arr1.length != arr2.length) {
        return false
    } else {
        for (let i = 0; i < arr1.length; i++) {
            const ele1 = arr1[i]
            const ele2 = arr2[i]
            if (ele1 != ele2) {
                return false
            }
        }
        return true
    }
}

// 定义一个 e(selector) 函数, 返回一个元素
var e = function(selector) {
    var element = document.querySelector(selector)
    if(element == null) {
        log(`元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 前面`)
    } else {
        return element
    }
}

// 定义一个 es(selector) 函数, 返回所有 selector 元素
var es = function(selector) {
    var elements = document.querySelectorAll(selector)
    if(elements.length == 0) {
        return `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 前面`
    } else {
        return elements
    }
}

// 定义一个函数 appendHTML(element, html) 在元素 element 后面添加 html
var appendHTML = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

// 定义一个函数 bindEvent(element, eventName, callback) 
// 在 element 元素上绑定 eventName 事件
var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

// 定义一个函数 bindEventAll(elements, eventName, callBack) 
// 为所有 elements 绑定 eventName 事件
var bindAll = function(selector, eventName, callBack) {
    var elements = es(selector)
    for (let index = 0; index < elements.length; index++) {
        const element = elements[index]
        bindEvent(element, eventName, callBack)
    }
}

// 定义一个函数 removeClassAll(className) 清除元素的 className
var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = es(selector)
    for (let index = 0; index < elements.length; index++) {
        const element = elements[index]
        element.classList.remove(className)
    }    
}

// 定义一个函数 find(element, selector) 查找 element 的所有子元素
var find = function(element, selector) {
    var e = element.querySelector(selector)
    if(e == null) {
        log(`元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 前面`)
    } else {
        return e
    }
}

// 定义一个生成 n 位 char 组成的字符串
var nChar = function (char, n) {
    var s = ''
    for (var i = 0; i < n; i++) {
        s += char
    }
    return s
}
// 对于数字 n 变换成宽度为 width 的字符串
var zfill = function (n, width) {
    var s = String(n)
    var len = s.length
    return nChar('0', width - len) + s
}

var ljust = function (s, width, fillchar = ' ') {
    /*
    s 是 string
    width 是 int
    fillchar 是 长度为 1 的字符串, 默认为空格 ' '

    如果 s 长度小于 width, 则在末尾用 fillchar 填充并返回
    否则, 原样返回, 不做额外处理

    返回 string 类型
    */
    var len = width - s.length
    return s + nChar(fillchar, len)
}
