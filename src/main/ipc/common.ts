import { ipcMain } from "electron"
import { CommonEnum } from "@common/IpcEnum"
import { selectSavePath } from "@main/utils/electron"
import { saveArrayBuffer } from "@main/utils/file"
import { join } from "path"

export const initCommonIpc = () => {
  ipcMain.handle(CommonEnum.SelectSavePath, async () => {
    return await selectSavePath()
  })
  ipcMain.handle(
    CommonEnum.SaveFile,
    async (_e, file: ArrayBuffer, savePath: string, fileName: string) => {
      if (!savePath || !fileName) {
        return false
      }

      await saveArrayBuffer(join(savePath, fileName), file)
      console.log("save file: ", join(savePath, fileName))
      return true
    }
  )
}
