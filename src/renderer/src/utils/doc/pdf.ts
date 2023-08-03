import * as pdfLib from "pdfjs-dist"
import * as pdfWorker from "pdfjs-dist/build/pdf.worker.min?url"

pdfLib.GlobalWorkerOptions.workerSrc = pdfWorker.default

export const convertPdfToImages = async (pdfBuffer: ArrayBuffer) => {
  const blobArr: Blob[] = []

  const canvas = document.createElement("canvas")

  const pdf = await pdfLib.getDocument(pdfBuffer).promise

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum)

    const viewport = page.getViewport({ scale: 4 })
    const outputScale = window.devicePixelRatio || 1

    // 设置canvas尺寸
    canvas.width = Math.floor(viewport.width * outputScale)
    canvas.height = Math.floor(viewport.height * outputScale)
    canvas.style.width = Math.floor(viewport.width) + "px"
    canvas.style.height = Math.floor(viewport.height) + "px"

    await page.render({
      canvasContext: canvas.getContext("2d", { willReadFrequently: true }),
      viewport: viewport,
      transform: outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined
    }).promise

    await new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          blobArr.push(blob)
        }
        resolve()
      })
    })
  }

  canvas.remove()
  return blobArr
}
