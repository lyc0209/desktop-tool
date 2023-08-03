import { writeFile } from "fs-extra"

export const saveArrayBuffer = async (path: string, buffer: ArrayBuffer) => {
  await writeFile(path, Buffer.from(buffer))
}
