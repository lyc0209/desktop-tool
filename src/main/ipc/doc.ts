import { ipcMain } from "electron"
import { IpcEnum } from "@common/IpcEnum"
import { selectSavePath } from "@main/utils/electron"
import { saveArrayBuffer } from "@main/utils/file"
import { join } from "path"

export const initDocIpc = () => {
  ipcMain.handle(IpcEnum.TransformPDFToPicture, async (_e, list: ArrayBuffer[]) => {
    console.log("fileList", list)

    const savePath = await selectSavePath()
    if (!savePath) {
      return false
    }
    console.log(savePath)

    await Promise.all(
      list.map((buffer, index) => {
        saveArrayBuffer(join(savePath, `pdf-${String(index + 1)}.png`), buffer).then(() => {})
      })
    )

    return true
  })
}
