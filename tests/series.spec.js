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
    test('not func', () => {
      const mockCallback = jest.fn()
      let arr = [0, 0, 0, 0]

      const testFunc1 = (cb) => {
        arr[0] += 1
        cb(null)
      }
      const testFunc2 = (cb) => {
        arr[1] += 1
        cb(null)
      }
      const testFunc3 = (cb) => {
        arr[2] += 1
        cb(null)
      }
      const testWithError = true

      const array = [testFunc1, testWithError, testFunc2, testFunc3]

      series(array, mockCallback)
      expect(arr).toEqual([1, 0, 0, 0])
      expect(mockCallback.mock.calls[0][0].message).toContain('is not a function')
      expect(mockCallback).toBeCalled()
      expect(mockCallback.mock.calls.length).toEqual(1)
    })
    test('test with error', () => {
      const mockCallback = jest.fn()
      const arr = [0, 0]
      const testFunc = (cb) => {
        arr[0] += 1
        cb(null)
      }
      const testWithError = (cb) => {
        arr[1] += 1
        throw Error('Error')
      }

      const array = [testFunc, testFunc, testWithError, testFunc]

      series(array, mockCallback)
      expect(arr).toEqual([2, 1])
      expect(mockCallback.mock.calls[0][0].message).toEqual('Error')
      expect(mockCallback).toBeCalled()
      expect(mockCallback.mock.calls.length).toEqual(1)
    })
    test('test twice call', () => {
      const mockCallback = jest.fn()

      const arr = [0, 0, 0, 0]
      const testFunc1 = (cb) => {
        arr[0] += 1
        console.log('test 1')
        cb(null, 'test1')
      }
      const testFunc2 = (cb) => {
        arr[1] += 1
        console.log('test 2')

        cb(null, 'test2')
      }
      const testFuncTwice = (cb) => {
        console.log('test twice')

        arr[3] += 1
        cb(null, 'helllo')
        cb(null, 'bro')
      }
      const testFunc3 = (cb) => {
        console.log('test 3')

        arr[2] += 1
        cb(null, 'test3')
      }

      const array = [testFunc1, testFuncTwice, testFunc2, testFunc3]

      series(array, mockCallback)
      console.log(mockCallback.mock.calls)
      expect(arr).toEqual([1, 1, 1, 1])
      expect(mockCallback).toBeCalled()
      expect(mockCallback.mock.calls.length).toEqual(1)
      expect(mockCallback.mock.calls[0][1]).toEqual('test3')
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
    test('return from last callback ', done => {
      const mockCallback = jest.fn()

      expect.assertions(4)

      const arr = [0, 0, 0]
      const f1 = cb => setTimeout(() => {
        arr[0] += 1
        cb()
      }, 1, null)
      const f2 = cb => setTimeout(() => {
        arr[1] += 1
        cb()
      }, 1, null)
      const f3 = cb => setTimeout(() => {
        arr[2] += 1
        cb(null, 'hello from hell')
      }, 30, null)

      series([f1, f2, f3], mockCallback)

      setTimeout(() => {
        expect(mockCallback).toBeCalled()
        expect(arr).toEqual([1, 1, 1])
        expect(mockCallback.mock.calls.length).toEqual(1)
        expect(mockCallback.mock.calls[0][1]).toEqual('hello from hell')

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
      const f3 = cb => setTimeout(() => {
        cb(null, 'hello from last')
      }, 30, null)

      series([f1, f2, f3], mockCallback)

      setTimeout(() => {
        expect(mockCallback).toBeCalled()
        console.log(mockCallback.mock.calls)
        expect(mockCallback.mock.calls.length).toEqual(1)
        expect(mockCallback.mock.calls[0][1]).toEqual('hello from last')

        done()
      }, 100)
    })

    test('test twice call', done => {
      const mockCallback = jest.fn()

      expect.assertions(3)

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
        cb(null, 'hello from last')
      }, 120, null, 'res')

      series([f1, f2, f3, f4], mockCallback)

      setTimeout(() => {
        expect(arr).toEqual([1, 1, 1, 1])
        console.log(mockCallback.mock.calls)

        expect(mockCallback).toBeCalled()
        expect(mockCallback.mock.calls.length).toEqual(1)
        expect(mockCallback.mock.calls[0][1]).toEqual('hello from last')

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

  test('try to fall', async () => {
    const arr = [0, 0]
    const f1 = cb => {
      arr[0] += 1
      cb()
      setTimeout(() => cb('error', 'jopa'), 10)
    }
    const f2 = cb => {
      setTimeout(() => {
        arr[1] += 1
        cb(null, 'success')
      }
      , 100)
    }

    const resultCb = jest.fn()

    series([f1, f2], resultCb)

    await new Promise(resolve => setTimeout(resolve, 2000))

    expect(resultCb.mock.calls.length).toBe(1)
    expect(arr).toEqual([1, 1])
    expect(resultCb.mock.calls[0]).toEqual(['error'])
  })
})
