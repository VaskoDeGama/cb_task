/**
 *
 * Implement the calc (firstNumber, secondNumber, operation, result) function which
 * performs operation on numbers firstNumber and secondNumber
 * the resulting number is compared with the result variable
 * returns the result of this comparison.
 *
 * -Call example-
 * calc ("1", "2", "", "3");
 * Result is true
 *
 * Restrictions on input data
 *
 * firstNumber, secondNumber, result - can be either Number or String type.
 * Variables of type String when converting to a number format will always be
 * valid number. Numeric values of variables can be in the range from
 * 0 to 1,000,000 inclusive.
 *
 * operation - a string with one of 4 mathematical operations:, -, *, /
 *
 * ----------------------------------------------------------------------
 * Реализуйте функцию calc(firstNumber, secondNumber, operation, result), которая
 * производит операцию operation над числами firstNumber и secondNumber
 * полученное число сравнивает с переменной result
 * возвращает результат этого сравнения.
 *
 * -Пример вызова-
 * calc("1", "2", "+", "3");
 * Результат true
 *
 * Ограничения на входные данные
 *
 * firstNumber, secondNumber, result - могут быть как типа Number так и String.
 * Переменные типа String при преобразовании к числовому формату всегда будут
 * валидным числом. Числовые значения переменных могут быть в промежутке от
 * 0 до 1000000 включительно.
 *
 * operation - строка c одной из 4 математических операций: +, -, *, /
 *
 * ----------------------------------------------------------------------
 */

const VALID_OPERATIONS = '+-*/'
const MIN = 0
const MAX = 1000000

/**
 * Check operation
 * @param operation
 * @returns {boolean}
 */
const isValidOperation = (operation) => VALID_OPERATIONS.includes(operation)

/**
 * Check value
 * @returns {boolean}
 * @param value
 */

const isValidValue = (value) => (MIN <= value && value <= MAX)

/**
 * Compares the result of an operation with
 * an expectation by comparing the difference with epsilon
 * @param localResult
 * @param result
 * @param epsilon
 * @returns {boolean}
 */
const floatCompare = (localResult, result, epsilon) => {
  const diff = Math.abs(localResult - result)

  return diff <= epsilon
}

/**
 * Returns the result of the operation by template
 * @param firstNumber
 * @param secondNumber
 * @param operation
 * @returns {*}
 */
const getResultOfOperation = (firstNumber, secondNumber, operation) => {
  const template = {
    '+': firstNumber + secondNumber,
    '-': firstNumber - secondNumber,
    '*': firstNumber * secondNumber,
    '/': firstNumber / secondNumber
  }

  return template[operation]
}

/**
 * Get epsilon
 * @param firstNumber
 * @param secondNumber
 * @returns {number}
 */
const getEpsilon = (firstNumber, secondNumber) => {
  return (Math.abs(firstNumber) + Math.abs(secondNumber)) * Number.EPSILON
}

/**
 * Main function
 * @param firstNumber (Number || String)
 * @param secondNumber (Number || String)
 * @param operation (String)
 * @param result (Number || String)
 * @returns {Error|boolean}
 */
const calc = (firstNumber, secondNumber, operation, result) => {
  const firstParsedNumber = Number(firstNumber)
  const secondPursedNumber = Number(secondNumber)
  const resultParsedNumber = Number(result)
  const trimmedOperation = operation.trim()

  if (!isValidOperation(trimmedOperation)) {
    return Error('Operation not supported')
  }

  if (!isValidValue(firstParsedNumber) || !isValidValue(secondPursedNumber)) {
    return Error('Out of input range')
  }

  const epsilon = getEpsilon(firstParsedNumber, secondPursedNumber)
  const localResult = getResultOfOperation(firstParsedNumber, secondPursedNumber, trimmedOperation)

  return floatCompare(localResult, resultParsedNumber, epsilon)
}

module.exports = calc
