import { ipcMain } from "electron"
import { IpcEnum } from "@common/IpcEnum"
import { initDocIpc } from "@main/ipc/doc"
export const initIpc = () => {
  ipcMain.handle(IpcEnum.Test, (_e, name: string) => {
    console.log("test ipc: ", name)
    return "tbz"
  })

  initDocIpc()
}
