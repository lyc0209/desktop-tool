import { BrowserWindow, shell } from "electron"
import { join } from "path"
import icon from "../../../resources/icon.png?asset"
import { is } from "@electron-toolkit/utils"
import { WindowType } from "@main/enum"
import { IWindowConfig, IWindowManager } from "@main/window/types"

const windowOptionMap = new Map<WindowType, IWindowConfig>()

windowOptionMap.set(WindowType.MAIN, {
  option: () => {
    return {
      width: 900,
      height: 600,
      show: false,
      autoHideMenuBar: true,
      ...(process.platform === "linux" ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, "../preload/index.js"),
        sandbox: false,
        nodeIntegrationInWorker: true
      }
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  callback: async (window: BrowserWindow, _windowManager: IWindowManager) => {
    window.webContents.setWindowOpenHandler(({ url }) => {
      if (url.startsWith("https://login.microsoftonline.com/common/oauth2/v2.0/authorize")) {
        return {
          action: "allow",
          overrideBrowserWindowOptions: {
            fullscreenable: false,
            autoHideMenuBar: true
          }
        }
      }
      shell.openExternal(url).then(() => {})
      return { action: "deny" }
    })

    window.on("ready-to-show", () => {
      window.show()
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
      await window.loadURL(process.env["ELECTRON_RENDERER_URL"])
    } else {
      await window.loadFile(join(__dirname, "../renderer/index.html"))
    }
  }
})

export default windowOptionMap
