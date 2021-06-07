import { Request, Response, NextFunction } from "express"

export const noCache = (req: Request, res: Response, next: NextFunction) => {
  res.header("Cache-Control", "private,no-cache,no-store,must-revalidate,max-age=0")
  res.header("Pragma", "no-cache")
  next()
}

export const setTimePrivate = (res: Response, next: NextFunction, time: number) => {
  res.header("Cache-Control", `private,max-age=${time}`)
  next()
}

export const setTimePublic = (res: Response, next: NextFunction, time: number) => {
  res.header("Cache-Control", `public,max-age=${time}`)
  next()
}

export const setImmutable = (res: Response, next: NextFunction, time: number) => {
  res.header("Cache-Control", `public,max-age=${time},immutable`)
  next()
}

export const reValidation = (res: Response, next: NextFunction) => {
  res.header("Cache-Control", `no-cache,max-age=0`)
  next()
}
