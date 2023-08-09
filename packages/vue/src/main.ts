import useEditor from "@/hooks/useEditor/index.vue"
import { Builder, BuilderComponent } from "@/index"
import { Client } from "@brizy/sdk"
import type { CompilerData } from "@brizy/sdk"
import { App } from "vue"

export default function (app: App): void {
  app.component("BuilderComponent", BuilderComponent)
  app.component("Builder", Builder)
  app.component("useEditor", useEditor)
  app.config.globalProperties.$builder = window.Builder
}

export { BuilderComponent, Builder, useEditor }
export { Client, type CompilerData }
