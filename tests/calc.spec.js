const calc = require('../src/calc')

const MIN = 0
const MAX = 1000000

function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

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
  })
  describe('Random tests', () => {
    test('Random test 1 +', () => {
      const frstNumber = getRandomInt(MIN, MAX)
      const scndNumber = getRandomInt(MIN, MAX)
      const operation = '+'
      const resultNumber = frstNumber + scndNumber

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(true)
    })
    test('Random test 2 -', () => {
      const frstNumber = getRandomInt(MIN, MAX)
      const scndNumber = getRandomInt(MIN, MAX)
      const operation = '-'
      const resultNumber = frstNumber - scndNumber

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(true)
    })
    test('Random test 3 *', () => {
      const frstNumber = getRandomInt(MIN, MAX)
      const scndNumber = getRandomInt(MIN, MAX)
      const operation = '*'
      const resultNumber = frstNumber * scndNumber

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(true)
    })
    test('Random test 4 /', () => {
      const frstNumber = getRandomInt(MIN, MAX)
      const scndNumber = getRandomInt(MIN, MAX)
      const operation = '/'
      const resultNumber = frstNumber / scndNumber

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(true)
    })
    test('Random test 5 + (false)', () => {
      const frstNumber = getRandomInt(MIN, MAX)
      const scndNumber = getRandomInt(MIN, MAX)
      const operation = '+'
      const resultNumber = frstNumber + scndNumber - 1

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(false)
    })
    test('Random test 6 * (false)', () => {
      const frstNumber = getRandomInt(MIN, MAX)
      const scndNumber = getRandomInt(MIN, MAX)
      const operation = '*'
      const resultNumber = frstNumber * scndNumber - 1

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(false)
    })
    test('Random test 7 * (false)', () => {
      const frstNumber = getRandomInt(MIN, MAX)
      const scndNumber = getRandomInt(MIN, MAX)
      const operation = '-'
      const resultNumber = frstNumber - scndNumber - 1

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(false)
    })
    test('Random test 8 / (false)', () => {
      const frstNumber = getRandomInt(MIN, MAX)
      const scndNumber = getRandomInt(MIN, MAX)
      const operation = '/'
      const resultNumber = frstNumber / scndNumber - 1

      expect(calc(frstNumber, scndNumber, operation, resultNumber)).toBe(false)
    })
  })
})
