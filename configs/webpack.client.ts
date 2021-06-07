import path from "path"
import webpack, { Configuration } from "webpack"
import ESLintPlugin from "eslint-webpack-plugin"
import TerserPlugin from "terser-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { WebpackManifestPlugin } from "webpack-manifest-plugin"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import pages from "./pages"
import configBuild from "./build"
import { isDev } from "../utils/EnvUtils"
import { getFileExtension } from "../utils/IO"
import common from "./webpack.common.js"

declare global {
  interface Window {
    __DATA__: any
  }
}

const config: Configuration = {
  name: "client",
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
  target: "web",
  resolve: common.resolve,
  stats: process.env.NODE_ENV === "development" ? "errors-warnings" : "none",
  module: {
    rules: common.rules(true),
  },
  entry: pages.reduce(
    (result: any, { page }) => {
      const p = path.resolve(__dirname, `../src/client/${page}`)
      result[page] = isDev(process.env) ? [p, `webpack-hot-middleware/client`] : p
      return result
    },
    {
      404: path.resolve(__dirname, `../src/client/error/404.jsx`),
      500: path.resolve(__dirname, `../src/client/error/500.jsx`),
    }
  ),
  optimization: {
    minimize: !isDev(process.env),
    splitChunks: isDev(process.env) ? false : { chunks: "all" },
    runtimeChunk: isDev(process.env)
      ? false
      : { name: ({ name }: any) => `r.${name}` },
    removeEmptyChunks: !isDev(process.env),
    removeAvailableModules: !isDev(process.env),
    minimizer: isDev(process.env)
      ? []
      : [
          new TerserPlugin({
            terserOptions: {
              output: {
                comments: false,
              },
              compress: true,
            },
          }),
        ],
  },
  output: {
    pathinfo: !isDev(process.env),
    publicPath: `/${configBuild.folderStatic}/`,
    filename: isDev(process.env) ? `[name].js` : `[name].[contenthash].js`,
    chunkFilename: isDev(process.env) ? "[id].js" : "[id].[chunkhash].js",
    path: path.resolve(
      __dirname,
      `../${configBuild.folderBuild}/${configBuild.folderStatic}`
    ),
  },
  devtool: isDev(process.env) ? "eval-source-map" : false,
  plugins: [
    ...common.plugins,
    new ESLintPlugin({}),
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin({
      openAnalyzer: !isDev(process.env),
      analyzerMode: isDev(process.env) ? "server" : "static",
    }),
    new MiniCssExtractPlugin({
      filename: isDev(process.env) ? "[name].css" : "[name].[contenthash].css",
      chunkFilename: isDev(process.env) ? "[id].css" : "[id].[chunkhash].css",
    }),
    new WebpackManifestPlugin({
      fileName: "manifest.json",
      publicPath: `/${configBuild.folderStatic}/`,
      generate: (seed, files, entrypoints) => {
        let entrypointsCSS: any = {},
          entrypointsJS: any = {}
        // loops
        for (var key in entrypoints) {
          const css: String[] = [],
            js: String[] = []
          entrypoints[key].forEach((entry) => {
            if (getFileExtension(entry) === "css") {
              css.push(entry)
            }
            if (getFileExtension(entry) === "js") {
              js.push(entry)
            }
          })
          entrypointsCSS[key] = [...css]
          entrypointsJS[key] = [...js]
        }
        return { css: { ...entrypointsCSS }, js: { ...entrypointsJS } }
      },
    }),
  ],
}

export default config
