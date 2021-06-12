import "../conf"
import webpack from "webpack"
import { endWebpack } from "../utils/Webpack"
import clientConfig from "../configs/webpack.client"
import serverConfig from "../configs/webpack.server"

// eslint-disable-next-line no-console
console.log("Compiling...")
// Complie source client
webpack(clientConfig).run((err, stats) =>
  endWebpack(
    err,
    stats,
    webpack(serverConfig).run((err, stats) => endWebpack(err, stats))
  )
)
