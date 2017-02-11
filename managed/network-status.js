var EventEmitter = require('events').EventEmitter

function OverpassNetworkStatus (navigator, window, setTimeout) {
  var emit // a convenience for this.emit, bound to this

  EventEmitter.call(this)
  emit = this.emit.bind(this)

  Object.defineProperty(this, 'isOnline', {
    get: function () {
      return navigator.onLine
    }
  })

  window.addEventListener('online', function onOnline () {
    emit('online')
  })
  window.addEventListener('offline', function onOnline () {
    emit('offline')
  })

  setTimeout(function () {
    if (navigator.onLine) {
      emit('online')
    } else {
      emit('offline')
    }
  })
}

OverpassNetworkStatus.prototype = Object.create(EventEmitter.prototype)
OverpassNetworkStatus.prototype.constructor = OverpassNetworkStatus

module.exports = OverpassNetworkStatus
