import express from "express"
import createError from "http-errors"
import { RenderView } from "../../types"
// build
import pages from "../../../configs/pages"
import configBuild from "../../../configs/build"
// midderware
import html from "../middlewares/html"
import csrfProtection from "../middlewares/csrf"
import renderView from "../middlewares/renderView"
// Routes
import api from "../api"
import error from "./error"
// init
const router = express.Router()
// API
router.use(csrfProtection, api)
router.get("/robots.txt", (req, res) => {
  res.type("text/plain")
  res.send(`User-agent: *\nDisallow: /profile/*`)
})
// PAGES
pages.forEach(({ url, page, css, scripts, ...attr }: RenderView) =>
  router.get(url, csrfProtection, html, async (req, res, next) => {
    const entryCss: Array<string> = [],
      entryJS: Array<any> = []
    // css, js
    css && css.forEach((e) => entryCss.push(e))
    scripts && scripts.forEach((e) => entryJS.push(e))
    // devMiddleware
    const manifest = await import("../../../build/statics/manifest.json")
    manifest["css"][page].forEach((e: string) =>
      entryCss.push(`/${configBuild.folderStatic}/${e}`)
    )
    manifest["js"][page].forEach((e: any) =>
      entryJS.push({
        async: false,
        src: `/${configBuild.folderStatic}/${e}`,
      })
    )
    renderView(req, res, next, {
      ...attr,
      url,
      css: entryCss,
      scripts: entryJS,
      page,
    })
  })
)
// catch 404 and forward to error handler
router.use(html, (req, res, next) => next(createError(404)))
// error handler
router.use(error)
// router
export default router
