const calc = require('../src/calc')

describe('Calc:', () => {
  describe('Base testes', () => {
    test('will be define', () => {
      expect(calc).toBeDefined()
    })
    test('return boolean', () => {
      const frstNumber = 1
      const scndNumber = 2
      const operation = '+'
      const resultNumber = 3

      expect(typeof calc(frstNumber, scndNumber, operation, resultNumber)).toBe('boolean')
    })
    test('Number(1), Number(2), String(+), Number(3) -> true', () => {
      const frstNumber = 1
      const scndNumber = 2
      const operation = '+'
      const resultNumber = 3

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(true)
    })
    test('String(1), Number(2), String(+), Number(3) -> true', () => {
      const frstNumber = '1'
      const scndNumber = 2
      const operation = '+'
      const resultNumber = 3

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(true)
    })
    test('Number(1), String(2), String(+), Number(3) -> true', () => {
      const frstNumber = 1
      const scndNumber = '2'
      const operation = '+'
      const resultNumber = 3

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(true)
    })
    test('Number(1), Number(2), String(+), String(3) -> true', () => {
      const frstNumber = 1
      const scndNumber = 2
      const operation = '+'
      const resultNumber = '3'

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(true)
    })
    test('String(1), String(2), String(+), String(3) -> true', () => {
      const frstNumber = '1'
      const scndNumber = '2'
      const operation = '+'
      const resultNumber = '3'

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(true)
    })
    test('Not support operation', () => {
      const frstNumber = 1
      const scndNumber = 2
      const operation = '='
      const resultNumber = 3

      expect(calc(frstNumber, scndNumber, operation, resultNumber).message).toBe('Operation not supported')
    })
    test('from 0 to 1000000', () => {
      const frstNumber = 0
      const scndNumber = 1000000
      const operation = '+'
      const resultNumber = 1000000

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(true)
    })
    test('out of range', () => {
      const frstNumber = -20
      const scndNumber = 10000001
      const operation = '+'
      const resultNumber = 1

      expect(calc(frstNumber, scndNumber, operation, resultNumber).message).toBe('Out of input range')
    })
    test('out of range 2', () => {
      const frstNumber = 1000000
      const scndNumber = 1000000
      const operation = '*'
      const resultNumber = 1000000000000

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(true)
    })
  })
  describe('Broken IEEE 754', () => {
    test('0.1 + 0.2 === 0.3', () => {
      const frstNumber = 0.2
      const scndNumber = 0.1
      const operation = '+'
      const resultNumber = 0.3

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(true)
    })

    test('10.1 + 10.2 === 20.3', () => {
      const frstNumber = '10.2'
      const scndNumber = '10.1'
      const operation = '+'
      const resultNumber = 20.3

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(true)
    })

    test('100.1 + 100.2 === 200.3', () => {
      const frstNumber = '100.2'
      const scndNumber = '100.1'
      const operation = '+'
      const resultNumber = 200.3

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(true)
    })

    test('8.13  - 5.75 === 2.38', () => {
      const frstNumber = '8.13'
      const scndNumber = '5.75'
      const operation = '-'
      const resultNumber = '2.38'

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(true)
    })
    test('122.72  - 6.43 === 116.28', () => {
      const frstNumber = '122.72'
      const scndNumber = '6.43'
      const operation = '-'
      const resultNumber = '116.28999999999999'

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(true)
    })
    test('80.04 * 8.66 === 693.14', () => {
      const frstNumber = '80.04'
      const scndNumber = '8.66'
      const operation = '*'
      const resultNumber = '693.1464000000001'

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(true)
    })
    test('3.37 * 3.33 === 11.22', () => {
      const frstNumber = '3.37'
      const scndNumber = '3.33'
      const operation = '*'
      const resultNumber = '11.222100000000001'

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(true)
    })
    test('99.27 / 3 == 33.09', () => {
      const frstNumber = '99.27'
      const scndNumber = '3'
      const operation = '/'
      const resultNumber = '33.089999999999996'

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(true)
    })
    test('32.76 / 9 == 3.63', () => {
      const frstNumber = '32.76'
      const scndNumber = '9'
      const operation = '/'
      const resultNumber = '3.6399999999999997'

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(true)
    })
    test('10^5 + 10^5 != 2*10^5 + 0.1 / (false)', () => {
      const frstNumber = 100000
      const scndNumber = 100000
      const operation = '+'
      const resultNumber = 200000.1

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(false)
    })
  })
  describe('Some tests', () => {
    test('test 1 +', () => {
      const frstNumber = 10
      const scndNumber = 10
      const operation = '+'
      const resultNumber = 20

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(true)
    })
    test('test 2 -', () => {
      const frstNumber = 20
      const scndNumber = 10
      const operation = '-'
      const resultNumber = 10

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(true)
    })
    test('test 3 *', () => {
      const frstNumber = 2
      const scndNumber = 10
      const operation = '*'
      const resultNumber = 20

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(true)
    })
    test('test 4 /', () => {
      const frstNumber = 20
      const scndNumber = 10
      const operation = '/'
      const resultNumber = 2

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(true)
    })
    test('test 5 + (false)', () => {
      const frstNumber = 10
      const scndNumber = 10
      const operation = '+'
      const resultNumber = 19

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(false)
    })
    test('test 6 * (false)', () => {
      const frstNumber = 10
      const scndNumber = 5
      const operation = '*'
      const resultNumber = 49

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(false)
    })
    test('test 7 * (false)', () => {
      const frstNumber = 10
      const scndNumber = 2
      const operation = '-'
      const resultNumber = 7

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(false)
    })
    test('test 8 / (false)', () => {
      const frstNumber = 10
      const scndNumber = 10
      const operation = '/'
      const resultNumber = 0

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(false)
    })
  })
})
