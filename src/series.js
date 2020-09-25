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
 * Series
 * @param arr
 * @param resultCb
 * @param trace
 */

const runSeries = (arr, resultCb, trace = { allDone: false, current: 0, startLength: 0, wasErr: false }) => {
  try {
    if (trace.current === 0) {
      trace.startLength = arr.length
    }

    const currentFunction = arr.shift()

    if (currentFunction) {
      currentFunction((err, result) => {
        if (err) {
          trace.wasErr = true
          return resultCb(err)
        }

        if (arr.length === 0 && !trace.wasErr) {
          return resultCb(null, result)
        }

        if (!trace.wasErr) {
          return runSeries(arr, resultCb, trace)
        }
      })
    }
  } catch (err) {
    resultCb(err)
  }
}

/**
 * Wrapper
 * @param arrayOfFunctions
 * @param resultCb
 */

function series (arrayOfFunctions, resultCb) {
  const arr = [...arrayOfFunctions]

  runSeries(arr, resultCb)
}

module.exports = series
