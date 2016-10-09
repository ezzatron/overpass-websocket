import OverpassConnectionManager from './connection-manager'

export default class OverpassConnectionManagerFactory {
  constructor ({overpassConnect, window}) {
    this._overpassConnect = overpassConnect
    this._window = window
  }

  manager (options = {}) {
    return new OverpassConnectionManager({
      url: options.url,
      overpassConnect: this._overpassConnect,
      delayFn: options.delayFn || this._delayFn,
      window: this._window,
      log: options.log
    })
  }

  _delayFn (disconnects) {
    return Math.min(Math.pow(2, disconnects - 1) * 1000, 32000)
  }
}
