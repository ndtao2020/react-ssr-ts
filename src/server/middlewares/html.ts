import { Request, Response, NextFunction } from "express"

export default (req: Request, res: Response, next: NextFunction) => {
  res.type("text/html;charset=utf-8")
  next()
}
