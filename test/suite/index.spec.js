import Failure from '../../src/failure'
import OverpassConnection from '../../src/connection'
import {connection, isFailureType} from '../../src/index'

describe('Main module', () => {
  describe('connection', () => {
    beforeEach(function () {
      this.options = {
        log: () => {}
      }
      this.connection = connection('ws://example.org/', this.options)
    })

    it('should return a new connection object', function () {
      expect(this.connection).to.be.an.instanceof(OverpassConnection)
    })

    it('should connect to the URL via websocket', function () {
      expect(this.connection._socket).to.be.an.instanceof(WebSocket)
      expect(this.connection._socket.url).to.equal('ws://example.org/')
    })

    it('should have access to setTimeout', function () {
      expect(this.connection._setTimeout).to.be.a('function')
      expect(this.connection._setTimeout()).to.equal('fake setTimeout')
    })

    it('should have access to clearTimeout', function () {
      expect(this.connection._clearTimeout).to.be.a('function')
      expect(this.connection._clearTimeout()).to.equal('fake clearTimeout')
    })

    it('should have access to the provided log function', function () {
      expect(this.connection._log).to.equal(this.options.log)
    })

    describe('with defaulted options', () => {
      it('should have no log function', function () {
        const conn = connection('ws://example.org/')

        expect(conn._log).to.be.undefined
      })
    })
  })

  describe('isFailureType', () => {
    it('should return true for matching failure types', () => {
      const failure = new Failure('type-a', 'Failure message.')

      expect(isFailureType('type-a', failure)).to.be.ok
    })

    it('should return false for non-matching failure types', () => {
      const failure = new Failure('type-b', 'Failure message.')

      expect(isFailureType('type-a', failure)).to.not.be.ok
    })

    it('should return false for other errors', () => {
      const error = new Error('Error message.')

      expect(isFailureType('type-a', error)).to.not.be.ok
    })

    it('should return false for other types', () => {
      expect(isFailureType('type-a', true)).to.not.be.ok
    })
  })
})
