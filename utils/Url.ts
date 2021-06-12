import { Request, Response, NextFunction } from "express"

const subStringURL = (url: string) => {
  if (url === "/") return ``
  if (url.startsWith("/?")) return `${url.substring(1, url.length)}`
  return `${url}`
}

/**
 * @param req Request từ Client
 * @description Lấy API theo Node route
 */
export const requestURL = (req: Request) => `${req.baseUrl}${subStringURL(req.url)}`

/**
 * @param req Request từ Client
 * @param prefix chuỗi cần cắt bỏ
 * @description Lấy API theo Node route và cắt chuỗi đầu tiên
 */
export const replaceFirstURL = (req: Request, prefix: string) =>
  `${req.baseUrl.substring(prefix.length)}${subStringURL(req.url)}`
