import { ipcMain } from "electron"
import { IpcEnum } from "@common/IpcEnum"
export const initIpc = () => {
  ipcMain.handle(IpcEnum.Test, (_e, name: string) => {
    console.log("test ipc: ", name)
    return "tbz"
  })
}
