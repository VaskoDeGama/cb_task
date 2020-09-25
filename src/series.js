/**
 * series, which takes an array of functions and a final callback as input.
 * The passed functions must be called sequentially - after the first successful
 * completion, the second is called, and so on. In case of an error, the final
 * callback with an error is called immediately. When the last function finishes,
 * the final callback should be called with the result returned by the last function.
 *
 * Реализовать в файле src/series.js в виде экспорта по-умолчанию функцию series,
 * которая принимает на вход массив функций и итоговый callback. Переданные функции
 * должны быть вызваны последовательно - после успешного окончания первой вызывается
 * вторая и так далее. В случае ошибки сразу вызывается итоговый callback с ошибкой. По
 * окончанию работы последней функции итоговый callback должен быть вызван с результатом,
 * возвращаемым последней функцией.
 *
 * Ограничения на входные данные
 * На вход гарантированно подаётся массив из одной и более функций
 * Каждая функция принимает на вход ровно один аргумент - функцию-callback.
 * В этом задании все переданные функции используют "стандартную" сигнатуру callback - (err, result)
 * Задачу необходимо решить без использования Promise
 */

/**
 * Gen and call next callback
 * @param err
 * @param res
 * @param arr
 * @param safeSCb
 * @returns {*}
 */
const nextCb = (err, res, arr, safeSCb) => {
  if (err) {
    return safeSCb(err)
  }

  const nextF = safeCbFabric(arr.pop())

  if (nextF) {
    nextF((err, res) => {
      nextCb(err, res, arr, safeSCb)
    })
  } else {
    safeSCb(null, res)
  }
}

/**
 * fabric safe callbacks
 * @returns {*}
 */

const safeCbFabric = (cb) => {
  let flag = false

  if (cb) {
    return (err, res) => {
      if (flag) {
        return false
      }

      flag = true
      cb(err, res)
    }
  }

  return cb
}

/**
 * Series exp
 * @param resCb
 * @param arr
 */

const runSeries = (arr, resCb) => {
  const safeSCb = safeCbFabric(resCb)

  const f = arr.pop()

  f((err, res) => {
    nextCb(err, res, arr, safeSCb)
  })
}

/**
 * HOF
 * @param arrayOfFunctions
 * @param resultCb
 */

function series (arrayOfFunctions, resultCb) {
  const arr = [...arrayOfFunctions].reverse()

  runSeries(arr, resultCb)
}

module.exports = series
