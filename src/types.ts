import { ReactElement } from "react"

interface View {
  readonly url: string
  readonly page: string
  readonly title: string
  readonly css?: Array<string>
  readonly scripts?: Array<{ async: boolean; src: string }>
  readonly description?: string
  readonly keywords?: Array<string>
  readonly image?: string
  readonly hostname?: String
  readonly view?: Promise<any>
  readonly state?: object | undefined
}

interface RenderHTML extends View {
  readonly isLogin: boolean
  readonly csrf: string
  readonly children: ReactElement | undefined
}

interface RenderView extends View {
  readonly requiredLogin?: "protected" | "private" | "public"
}

export { View, RenderHTML, RenderView }
