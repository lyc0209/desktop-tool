/**
 * @desc blob 转 arraybuffer
 * @param blob
 */
export const blobToArrayBuffer = (blob: Blob) => {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      if (reader.readyState === FileReader.DONE) {
        resolve(reader.result as ArrayBuffer)
      }
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(blob)
  })
}
