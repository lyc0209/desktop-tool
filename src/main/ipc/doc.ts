import { ipcMain } from "electron"
import { IpcEnum } from "@common/IpcEnum"
import { pdfToPicture } from "@main/utils/pdf"

export const initDocIpc = () => {
  ipcMain.handle(IpcEnum.TransformPDFToPicture, (_e, pathList: string[]) => {
    console.log("fileList", pathList)

    pathList.forEach((path) => pdfToPicture(path))

    return true
  })
}
