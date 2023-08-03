import { ipcMain } from "electron"
import { CommonEnum } from "@common/IpcEnum"
import { selectSavePath } from "@main/utils/electron"

export const initCommonIpc = () => {
  ipcMain.handle(CommonEnum.SelectSavePath, async () => {
    return await selectSavePath()
  })
}
