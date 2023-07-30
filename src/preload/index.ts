import { contextBridge, ipcRenderer } from "electron"
import { electronAPI } from "@electron-toolkit/preload"
import { IpcEnum } from "@common/IpcEnum"
import { DocApi } from "@preload/types"

// Custom APIs for renderer
const api = {}

const docApi: DocApi = {
  transformPDFToPicture: (pathList) => ipcRenderer.invoke(IpcEnum.TransformPDFToPicture, pathList)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI)
    contextBridge.exposeInMainWorld("api", api)

    contextBridge.exposeInMainWorld("test", {
      getTest: (keys: string): Promise<string> => ipcRenderer.invoke(IpcEnum.Test, keys)
    })
    contextBridge.exposeInMainWorld("doc", docApi)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
