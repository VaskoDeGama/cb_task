
/**
 * parallel, accepts an array of functions and a final callback as input.
 * The passed functions must be called in parallel. In case of an error,
 * the final callback with an error is called immediately.
 * At the end of the last function, the final callback should be called.
 * task-parallel
 *
 * Реализовать в файле src/parallel.js в виде экспорта по-умолчанию функцию parallel,
 * которая принимает на вход массив функций и итоговый callback.
 * Переданные функции должны быть вызваны параллельно.
 * В случае ошибки сразу вызывается итоговый callback с ошибкой.
 * По окончанию работы последней функции должен быть вызван итоговый callback.
 *
 * Ограничения на входные данные
 * На вход гарантированно подаётся массив функций
 * Каждая функция принимает на вход ровно один аргумент - функцию-callback.
 * В этом задании все переданные функции используют "стандартную" сигнатуру callback - (err, result)
 * Задачу необходимо решить без использования Promise
 *
 * @param arrayOfFunctions
 * @param resultCb
 * @returns {boolean}
 */
function parallel (arrayOfFunctions, resultCb) {
  const cache = new Map()
  let allDone = false
  let wasError = false

  const watcher = (err, res) => {
    if (err && !wasError) {
      resultCb(err)

      wasError = true
    }

    if (!cache.has(res)) {
      cache.set(res, 1)
    }

    if (cache.size === arrayOfFunctions.length && !allDone && !wasError) {
      resultCb(null)

      allDone = true
    }
  }

  try {
    arrayOfFunctions.forEach((item, idx) => {
      item((err) => watcher(err, idx))
    })
  } catch (err) {
    resultCb(err)
  }
}

module.exports = parallel
