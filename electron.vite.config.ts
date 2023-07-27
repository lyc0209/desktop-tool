import { resolve } from "path"
import { defineConfig, externalizeDepsPlugin } from "electron-vite"
import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { NaiveUiResolver } from "unplugin-vue-components/resolvers"
import UnoCSS from "unocss/vite"
import presetRemToPx from "@unocss/preset-rem-to-px"

export default defineConfig({
  main: {
    resolve: {
      alias: {
        "@main": resolve("src/main"),
        "@common": resolve("src/common")
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    resolve: {
      alias: {
        "@main": resolve("src/main"),
        "@common": resolve("src/common")
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src"),
        "@common": resolve("src/common")
      }
    },
    plugins: [
      vue(),
      AutoImport({
        imports: [
          "vue",
          {
            "naive-ui": ["useDialog", "useMessage", "useNotification", "useLoadingBar"]
          },
          "vue-router",
          "vue-router/composables"
        ]
      }),
      Components({
        resolvers: [NaiveUiResolver()]
      }),
      UnoCSS(),
      presetRemToPx()
    ]
  }
})
