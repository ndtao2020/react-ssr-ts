import { Request, Response, NextFunction } from "express"

export default (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Content-Encoding", "gzip")
  next()
}
