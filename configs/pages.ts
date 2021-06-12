import { RenderView } from "../src/types"

const pages: RenderView[] = [
  {
    page: "home",
    title: `Home`,
    url: "/",
    view: import("../src/shared/pages/home"),
  },
  // {
  //   page: "admin",
  //   title: `Web Admin`,
  //   url: "/admin*",
  // },
]

export default pages
