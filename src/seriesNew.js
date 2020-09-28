module.exports = function series (functionSeries, callback) {
  const called = new Set()
  const callbackIndex = functionSeries.length

  const createNextFn = (next, fn, i) => {
    return (err, res) => {
      if (called.has(callbackIndex)) {
        return
      }

      if (err && i !== callbackIndex) {
        return next(err)
      }

      if (called.has(i)) {
        return
      }

      called.add(i)

      if (i === callbackIndex) {
        return callback(err, res)
      }

      try {
        fn(next)
      } catch (errSync) {
        next(errSync)
      }
    }
  }

  functionSeries.reduceRight(createNextFn, createNextFn(null, callback, callbackIndex))()
}
