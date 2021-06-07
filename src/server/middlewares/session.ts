import { Request, Response, NextFunction } from "express"

// middleware function to check for logged-in users
export const isLogin = (req: Request) => {
  if (req === undefined || req === null) return false
  if (req.session === undefined || req.session === null) return false
  return req.session.user !== undefined && req.session.user !== null
}
// middleware function to check for logged-in users
export const sessionChecker = (req: Request, res: Response, next: NextFunction) =>
  isLogin(req) ? next() : res.redirect("/login")
// extract Token
export const extractSession = (req: Request) => {
  if (!isLogin(req)) {
    return null
  }
  return req.session.user.token
}
