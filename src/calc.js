/**
 *
 * Implement the calc (firstNumber, secondNumber, operation, result) function which
 * performs operation operation on numbers firstNumber and secondNumber
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
 *
 * @param firstNumber (Number || String)
 * @param secondNumber (Number || String)
 * @param operation (String)
 * @param result (Number || String)
 * @returns {Error|boolean}
 */
const calc = (firstNumber, secondNumber, operation, result) => {
  const operations = '+-*/'
  const MIN = 0
  const MAX = 1000000
  const frstNumber = Number(firstNumber)
  const scndNumber = Number(secondNumber)
  const resultNumber = Number(result)

  if (!operations.includes(operation)) {
    return Error('Operation not supported')
  }

  if (frstNumber < MIN || scndNumber < MIN || frstNumber > MAX || scndNumber > MAX) {
    return Error('Out of input range')
  }

  switch (operation) {
    case '+': {
      return resultNumber === frstNumber + scndNumber
    }

    case '-': {
      return resultNumber === frstNumber - scndNumber
    }

    case '*': {
      return resultNumber === frstNumber * scndNumber
    }

    case '/': {
      return resultNumber === frstNumber / scndNumber
    }
  }
}

module.exports = calc
