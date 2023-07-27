import { BrowserWindow, BrowserWindowConstructorOptions } from "electron"
import { WindowType } from "@main/enum"

export interface IWindowManager {
  create: (type: WindowType) => BrowserWindow | null
  get: (type: WindowType) => BrowserWindow | null
  has: (type: WindowType) => boolean
  deleteById: (id: number) => void
}
export interface IWindowConfig {
  option: () => BrowserWindowConstructorOptions
  callback: (window: BrowserWindow, windowManager: IWindowManager) => void
}
