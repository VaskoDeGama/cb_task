const series = require('../src/series')

describe('Series:', () => {
  describe('Base tests:', () => {
    test('well be define', () => {
      expect(series).toBeDefined()
    })
    test('test without error', () => {
      const mockCallback = jest.fn()

      const testFunc1 = (cb) => {
        cb(null)
      }
      const testFunc2 = (cb) => {
        cb(null)
      }
      const testFunc3 = (cb) => {
        cb(null)
      }

      const array = [testFunc1, testFunc2, testFunc3]

      series(array, mockCallback)
      expect(mockCallback).toBeCalled()
      expect(mockCallback.mock.calls.length).toEqual(1)
    })
    test('test with error', () => {
      const mockCallback = jest.fn()

      const testFunc = (cb) => {
        try {
          cb(null)
        } catch (e) {
          cb(e)
        }
      }
      const testWithError = (cb) => {
        try {
          throw Error('Error')
        } catch (e) {
          cb(e)
        }
      }

      const array = [testFunc, testWithError, testFunc, testFunc]

      series(array, mockCallback)
      expect(mockCallback).toBeCalled()
      expect(mockCallback.mock.calls.length).toEqual(1)
    })
    test('test twice call', () => {
      const mockCallback = jest.fn()

      const testFunc1 = (cb) => {
        cb(null)
      }
      const testFunc2 = (cb) => {
        cb(null)
      }
      const testFunc3 = (cb) => {
        cb(null)
      }
      const testFuncTwice = (cb) => {
        cb(null)
        cb(null)
      }

      const array = [testFunc1, testFunc2, testFunc3, testFuncTwice]

      series(array, mockCallback)

      expect(mockCallback).toBeCalled()
      expect(mockCallback.mock.calls.length).toEqual(1)
    })
  })
  describe('my tests', () => {
    test('test only one error call', done => {
      const mockCallback = jest.fn()

      expect.assertions(2)

      const f1 = cb => setTimeout(cb, 1, 'error1')
      const f2 = cb => setTimeout(cb, 30, 'error2')

      series([f1, f2], mockCallback)
      setTimeout(() => {
        expect(mockCallback).toBeCalled()
        expect(mockCallback.mock.calls.length).toEqual(1)

        done()
      }, 100)
    })
    test('simple twice call', done => {
      const mockCallback = jest.fn()

      expect.assertions(2)

      const f1 = cb => setTimeout(cb, 1, null)
      const f2 = cb => setTimeout(() => {
        cb()
        cb()
      }, 1, null)
      const f3 = cb => setTimeout(cb, 30, null)

      series([f1, f2, f3], mockCallback)

      setTimeout(() => {
        expect(mockCallback).toBeCalled()
        expect(mockCallback.mock.calls.length).toEqual(1)

        done()
      }, 100)
    })

    test('test twice call', done => {
      const mockCallback = jest.fn()

      expect.assertions(2)

      const f1 = cb => setTimeout(() => {
        cb()
        cb()
      }, 20, null, 'res')
      const f2 = cb => setTimeout(cb, 60, null, 'res')
      const f3 = cb => setTimeout(() => {
        cb()
        cb()
      }, 20, null, 'res')
      const f4 = cb => setTimeout(cb, 120, null, 'res')

      series([f1, f2, f3, f4], mockCallback)

      setTimeout(() => {
        expect(mockCallback).toBeCalled()
        expect(mockCallback.mock.calls.length).toEqual(1)

        done()
      }, 200)
    })
    test('test simple', done => {
      const mockCallback = jest.fn()

      expect.assertions(2)

      const f1 = cb => setTimeout(() => {
        cb()
      }, 120, null, 'res')
      const f2 = cb => setTimeout(() => {
        cb()
      }, 120, null, 'res')
      const f3 = cb => setTimeout(() => {
        cb()
      }, 120, null, 'res')
      const f4 = cb => setTimeout(() => {
        cb()
      }, 120, null, 'res')
      const f5 = cb => setTimeout(() => {
        cb()
      }, 120, null, 'res')

      series([f1, f2, f3, f4, f5], mockCallback)

      setTimeout(() => {
        expect(mockCallback).toBeCalled()
        expect(mockCallback.mock.calls.length).toEqual(1)

        done()
      }, 1500)
    })
  })
})
