import { ElectronAPI } from "@electron-toolkit/preload"

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    test: TestApi
    doc: DocApi
  }
}

export interface TestApi {
  getTest: (keys: string) => Promise<string>
}

export interface DocApi {
  transformPDFToPicture: (list: ArrayBuffer[]) => Promise<boolean>
}
