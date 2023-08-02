import * as pdfLib from "pdfjs-dist"
import * as pdfWorker from "pdfjs-dist/build/pdf.worker.min?url"

pdfLib.GlobalWorkerOptions.workerSrc = pdfWorker.default

export const convertPdfToImages = async (pdfBuffer: ArrayBuffer) => {
  const blobArr: Blob[] = []

  // 获取canvas元素和pdf文件路径
  const canvas = document.createElement("canvas")

  const pdf = await pdfLib.getDocument(pdfBuffer).promise

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum)

    const viewport = page.getViewport({ scale: 1.0 })

    // 设置canvas尺寸
    canvas.width = viewport.width
    canvas.height = viewport.height

    await page.render({
      canvasContext: canvas.getContext("2d"),
      viewport: viewport
    }).promise

    canvas.toBlob((blob) => {
      console.log(blob)
      if (blob) {
        blobArr.push(blob)
      }
    })
  }

  return blobArr
}
