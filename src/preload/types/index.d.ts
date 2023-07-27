import { ElectronAPI } from "@electron-toolkit/preload"

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
