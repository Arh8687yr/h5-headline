export const debounce = function (fn, delay) {
  var timeId
  return function () {
    clearTimeout(timeId)
    timeId = setTimeout(() => {
      fn.apply(this, arguments)
      console.log('++++++')
    }, delay)
  }
}
