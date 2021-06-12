import { Compiler, Stats } from "webpack"
/**
 *
 * @param {*} err
 * @param {*} stats
 */
// eslint-disable-next-line no-console
export const logErrorWebpack = (err: Error | undefined, stats: Stats | undefined) =>
  stats && stats.hasErrors() && err && console.log(err)

/**
 *
 * @param {*} stats
 */
// eslint-disable-next-line no-console
export const logDoneWebpack = (stats: Stats | undefined) =>
  console.log(stats && stats.toString({ colors: true }))

/**
 *
 * @param {*} err
 * @param {*} stats
 * @param {*} callback
 */
export const endWebpack = (
  err: Error | undefined,
  stats: Stats | undefined,
  callback?: any
) => {
  logErrorWebpack(err, stats)
  logDoneWebpack(stats)
  callback && callback()
}
