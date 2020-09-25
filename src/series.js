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

const runSeries = (arr, resultCb) => {
  try {
    const nope = () => {}
    let wasDone = false
    let wasErr = false
    let allDone = false
    let result = null

    for (const func of arr) {
      wasDone = false
      func((err, res) => {
        if (err) {
          wasErr = true
          return resultCb(err)
        }

        wasDone = true
        result = res
      })

      while (!wasDone) {
        nope()
      }
    }

    allDone = true

    if (!wasErr && allDone) {
      return resultCb(null, result)
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
