import { ElectronAPI } from "@electron-toolkit/preload"
import { ipcRenderer } from "electron";
import { IpcEnum } from "@common/IpcEnum";

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    test: TestApi
  }
}

export interface TestApi {
  getTest: (keys: string) => Promise<string>
}
