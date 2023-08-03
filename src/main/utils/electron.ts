import { dialog } from "electron"

export const selectSavePath = async (): Promise<string | undefined> => {
  const result = await dialog.showOpenDialog({
    title: "保存文件",
    buttonLabel: "确定",
    properties: ["openDirectory"]
  })

  return result.filePaths[0]
}
