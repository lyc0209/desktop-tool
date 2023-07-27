import { BrowserWindow } from "electron"
import { WindowType } from "@main/enum"
import windowOptionMap from "@main/window/config"

class WindowManager {
  private windowMap: Map<WindowType | string, BrowserWindow> = new Map()
  private windowIdMap: Map<number, WindowType | string> = new Map()

  public create(type: WindowType) {
    if (this.windowMap.has(type)) {
      return this.windowMap.get(type)!
    }
    const config = windowOptionMap.get(type)!

    const window = new BrowserWindow(config.option())
    const id = window.id
    this.windowMap.set(type, window)
    this.windowIdMap.set(window.id, type)

    config.callback(window, this)
    window.on("close", () => {
      this.deleteById(id)
    })
    return window
  }

  get(type: WindowType) {
    if (this.has(type)) {
      return this.windowMap.get(type)!
    } else {
      return this.create(type)
    }
  }

  has(type: WindowType) {
    return this.windowMap.has(type)
  }

  deleteById = (id: number) => {
    const name = this.windowIdMap.get(id)
    if (name) {
      this.windowMap.delete(name)
      this.windowIdMap.delete(id)
    }
  }
}

export const windowManager = new WindowManager()
