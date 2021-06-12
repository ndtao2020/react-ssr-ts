import React from "react"
import { renderToNodeStream } from "react-dom/server"
import { Request, Response, NextFunction } from "express"
import { isLogin } from "./session"
import { RenderView } from "../../types"
import { parseHost } from "../../../utils/Server"
import HTML from "../components/HTML"

export default async (
  req: Request, res: Response, next: NextFunction,
  { css, scripts, hostname, view, state, page, title, requiredLogin = "public", ...attr }: RenderView
) => {
  try {
    const logined = isLogin(req)
    requiredLogin === "protected" && logined && res.redirect("/")
    requiredLogin === "private" && !logined && res.redirect("/login")
    // render
    const app = view ? await view : undefined
    renderToNodeStream(
      <HTML
        {...attr}
        title={title}
        hostname={hostname || parseHost(req)}
        url={req.url}
        page={page || "home"}
        css={css || []}
        scripts={scripts || []}
        isLogin={logined}
        state={state}
        csrf={req.csrfToken()}
      >
        {app ? <app.default /> : undefined}
      </HTML>
    ).pipe(res)
  } catch (err) {
    console.log(err)
    next()
  }
}
