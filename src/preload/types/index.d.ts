import { ElectronAPI } from "@electron-toolkit/preload"

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    test: TestApi
    common: CommonApi
    doc: DocApi
  }
}

export interface TestApi {
  getTest: (keys: string) => Promise<string>
}

export interface CommonApi {
  selectSavePath: () => Promise<string | undefined>
  saveFile: (file: ArrayBuffer, savePath: string, fileName: string) => Promise<boolean>
}

export interface DocApi {
  transformPDFToPicture: (list: ArrayBuffer[]) => Promise<boolean>
}
