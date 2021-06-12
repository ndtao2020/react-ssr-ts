import { Request } from "express"

/**
 * Parse Host
 */
export function parseHost(req: Request): String {
  return `${req.protocol}://${req.subdomains ? `${req.subdomains.join(".")}.` : ""}${
    req.hostname
  }`
}
/**
 * Normalize a port into a number, string, or false.
 */
export function normalizePort(val: string): number | undefined {
  var port = parseInt(val, 10)
  if (port >= 0) {
    return port
  }
  return undefined
}
/**
 * Event listener for HTTP server "error" event.
 */
export function onError(error: Error, port: any) {
  if (error.name !== "listen") throw error
  switch (error.stack) {
    case "EACCES":
      // eslint-disable-next-line no-console
      console.error(`Pipe ${port} requires elevated privileges`)
      process.exit(1)
      break
    case "EADDRINUSE":
      // eslint-disable-next-line no-console
      console.error(`Port ${port} is already in use `)
      process.exit(1)
      break
    default:
      throw error
  }
}
