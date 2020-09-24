const series = require('../src/series')

describe('Series:', () => {
  describe('Base tests:', () => {
    test('well be define', () => {
      expect(series).toBeDefined()
    })
    test('test without error', () => {
      const mockCallback = jest.fn()
      const arr = [0, 0, 0]
      const testFunc1 = (cb) => {
        arr[0] = 1
        cb(null)
      }
      const testFunc2 = (cb) => {
        arr[1] = 1
        cb(null)
      }
      const testFunc3 = (cb) => {
        arr[2] = 1
        cb(null)
      }

      const array = [testFunc1, testFunc2, testFunc3]

      series(array, mockCallback)
      expect(arr).toEqual([1, 1, 1])
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
        throw Error('Error')
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

      const array = [ testFunc1, testFuncTwice, testFunc2, testFunc3 ]

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

      const arr = [0, 0, 0, 0]
      const f1 = cb => setTimeout(() => {
        arr[0] += 1
        cb()
        cb()
      }, 20, null, 'res')
      const f2 = cb => setTimeout(() => {
        arr[1] += 1
        cb()
      }, 60, null, 'res')
      const f3 = cb => setTimeout(() => {
        arr[2] += 1
        cb()
        cb()
        cb()
      }, 20, null, 'res')
      const f4 = cb => setTimeout(() => {
        arr[3] += 1
        cb()
      }, 120, null, 'res')

      series([f1, f2, f3, f4], mockCallback)

      setTimeout(() => {
        console.log(arr)
        console.log(mockCallback.mock.calls)
        expect(mockCallback).toBeCalled()
        expect(mockCallback.mock.calls.length).toEqual(1)

        done()
      }, 200)
    })
    test('test simple', done => {
      const mockCallback = jest.fn()

      expect.assertions(3)

      const arr = Array.from({ length: 5 }).fill(0)
      const f1 = cb => setTimeout(() => {
        arr[0] = 1
        cb()
      }, 120, null, 'res')
      const f2 = cb => setTimeout(() => {
        arr[1] = 1
        cb()
      }, 120, null, 'res')
      const f3 = cb => setTimeout(() => {
        arr[2] = 1
        cb()
      }, 120, null, 'res')
      const f4 = cb => setTimeout(() => {
        arr[3] = 1
        cb()
      }, 120, null, 'res')
      const f5 = cb => setTimeout(() => {
        arr[4] = 1
        cb()
      }, 120, null, 'res')

      series([f1, f2, f3, f4, f5], mockCallback)

      setTimeout(() => {
        expect(arr).toEqual([1, 1, 1, 1, 1])
        expect(mockCallback).toBeCalled()
        expect(mockCallback.mock.calls.length).toEqual(1)

        done()
      }, 1500)
    })
  })
})
