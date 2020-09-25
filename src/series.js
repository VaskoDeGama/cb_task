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
 * HOF
 * @param arrayOfFunctions
 * @param resultCb
 */

function series (arrayOfFunctions, resultCb) {
  let wasErr = false
  let allDone = false

  const safeCbFabric = (cb) => {
    let wasFlag = false

    return (err, res) => {
      if (wasFlag) {
        return false
      }

      wasFlag = true

      if (!allDone) {
        cb(err, res)
      }
    }
  }

  /**
 * Series exp
 * @param resCb
 * @param arr
 */

  const safeSCb = safeCbFabric(resultCb)

  const allDoneSetter = (err, res) => {
    safeSCb(err, res)
    allDone = true
  }

  const arr = [...arrayOfFunctions]
  const seriesFlow = arr.reduceRight((next, prev) => {
    const safeNext = safeCbFabric(next)

    return () => {
      prev((err, res) => {
        if (err) {
          wasErr = true
          return allDoneSetter(err)
        }

        try {
          if (!wasErr) {
            safeNext(null, res)
          }
        } catch (e) {
          wasErr = true
          allDoneSetter(e)
        }
      })
    }
  }, allDoneSetter)

  seriesFlow()
}

module.exports = series
