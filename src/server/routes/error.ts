import { HttpError } from "http-errors"
import { Request, Response, NextFunction } from "express"
import { RenderView } from "../../types"
import renderView from "../middlewares/renderView"
import { isProd } from "../../../utils/EnvUtils"

export default (err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message
  res.locals.error = isProd(process.env) ? {} : err
  const config: RenderView = {
    url: "/500",
    page: "500",
    title: `500`,
    description: `500`,
  }
  if (err.status === 404) {
    renderView(req, res, next, {
      ...config,
      url: "/404",
      page: "404",
      title: `404`,
      description: `404`,
    })
    return
  }
  renderView(req, res, next, config)
}
