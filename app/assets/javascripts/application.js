//= require rails-ujs
//= require activestorage
//= require jquery3
//= require popper
//= require bootstrap-sprockets
// require_tree .

ELEMENT.locale(ELEMENT.lang.ja)

Array.prototype.sum = function () {
  let arr = this
  let sum = arr.reduce((previous, current) => previous + current, 0)
  return sum
}

Array.prototype.average = function () {
  let arr = this
  if (arr.length == 0) { return 0 }
  return arr.sum() / arr.length
}

Array.prototype.variance = function () {
  let arr = this
  if (arr.length == 0) { return 0 }
  let average = arr.average()
  let squaredDiff = arr.map(x => {
    const diff = x - average
    return diff ** 2
  })
  return squaredDiff.average()
}

Array.prototype.standardDeviation = function () {
  let arr = this
  if (arr.length == 0) { return 0 }
  return Math.sqrt(arr.variance())
}

window.titleApp = new Vue({
  el: '#title-app'
})
