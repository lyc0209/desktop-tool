import { ipcMain } from "electron"
import { IpcEnum } from "@common/IpcEnum"
import { initDocIpc } from "@main/ipc/doc"
import { initCommonIpc } from "@main/ipc/common"
export const initIpc = () => {
  ipcMain.handle(IpcEnum.Test, (_e, name: string) => {
    console.log("test ipc: ", name)
    return "tbz"
  })

  initCommonIpc()
  initDocIpc()
}
