const parallel = require('../src/parallel')

describe('Parallel:', () => {
  describe('Base tests:', () => {
    test('well be define', () => {
      expect(parallel).toBeDefined()
    })
    test('test without error', () => {
      const mockCallback = jest.fn()

      const testFunc = (cb) => {
        try {
          cb(null, true)
        } catch (e) {
          cb(e, null)
        }
      }

      const array = [testFunc, testFunc, testFunc]

      parallel(array, mockCallback)
      expect(mockCallback).toBeCalled()
      expect(mockCallback.mock.calls.length).toEqual(1)
    })
    test('test with error', () => {
      const mockCallback = jest.fn()

      const testFunc = (cb) => {
        try {
          cb(null, true)
        } catch (e) {
          cb(e, null)
        }
      }
      const testWithError = (cb) => {
        try {
          throw Error('Error')
        } catch (e) {
          cb(e, null)
        }
      }

      const array = [testFunc, testWithError, testFunc, testFunc]

      parallel(array, mockCallback)
      expect(mockCallback).toBeCalled()
      expect(mockCallback.mock.calls.length).toEqual(1)
    })
    test('test without error but with twice call', () => {
      const mockCallback = jest.fn()

      const testFunc = (cb) => {
        try {
          cb(null, true)
        } catch (e) {
          cb(e, null)
        }
      }
      const testFuncTwice = (cb) => {
        try {
          cb(null, true)
          cb(null, true)
        } catch (e) {
          return cb(e, null)
        }
      }

      const array = [testFuncTwice, testFunc, testFunc, testFunc, testFuncTwice]

      parallel(array, mockCallback)

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

      parallel([f1, f2], mockCallback)

      setTimeout(() => {
        expect(mockCallback).toBeCalled()
        expect(mockCallback.mock.calls.length).toEqual(1)

        done()
      }, 100)
    })

    test('test only one error call2', done => {
      const mockCallback = jest.fn()

      expect.assertions(2)

      const f1 = cb => setTimeout(cb, 1, 'error1') && setTimeout(cb, 10, 'error3')
      const f2 = cb => setTimeout(cb, 30, 'error2')

      parallel([f1, f2], mockCallback)

      setTimeout(() => {
        expect(mockCallback).toBeCalled()
        expect(mockCallback.mock.calls.length).toEqual(1)

        done()
      }, 100)
    })

    test('test function call correctly', done => {
      const mockCallback = jest.fn()

      expect.assertions(3)

      const arr = [0, 0]
      const f1 = cb => {
        arr[0] += 1; setTimeout(cb, 1, 'error1')
      }
      const f2 = cb => {
        arr[1] += 1; setTimeout(cb, 30, 'error2')
      }

      parallel([f1, f2], mockCallback)

      setTimeout(() => {
        expect(arr).toEqual([1, 1])
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
        cb()
      }, 20, null, 'res')
      const f4 = cb => setTimeout(cb, 120, null, 'res')

      parallel([f1, f2, f3, f4], mockCallback)

      setTimeout(() => {
        expect(mockCallback).toBeCalled()
        expect(mockCallback.mock.calls.length).toEqual(1)

        done()
      }, 200)
    })
    test('test simple', done => {
      const mockCallback = jest.fn()

      expect.assertions(2)

      const f1 = cb => setTimeout(cb, 20, null, 'res')
      const f2 = cb => setTimeout(cb, 60, null, 'res')
      const f3 = cb => setTimeout(cb, 20, null, 'res')
      const f4 = cb => setTimeout(cb, 120, null, 'res')
      const f5 = cb => setTimeout(cb, 120, null, 'res')
      const f6 = cb => setTimeout(cb, 120, null, 'res')
      const f7 = cb => setTimeout(cb, 120, null, 'res')
      const f8 = cb => setTimeout(cb, 120, null, 'res')
      const f9 = cb => setTimeout(cb, 120, null, 'res')

      parallel([f1, f2, f3, f4, f5, f6, f7, f8, f9], mockCallback)

      setTimeout(() => {
        expect(mockCallback).toBeCalled()
        expect(mockCallback.mock.calls.length).toEqual(1)

        done()
      }, 200)
    })
  })
})
