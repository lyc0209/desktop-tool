import * as pdfLib from "pdfjs-dist"
import * as pdfWorker from "pdfjs-dist/build/pdf.worker.min?url"

pdfLib.GlobalWorkerOptions.workerSrc = pdfWorker.default

export const convertPdfToImages = async (pdfBuffer: ArrayBuffer) => {
  return new Promise<Blob[]>((resolve, reject) => {
    const blobArr: Blob[] = []

    // 获取canvas元素和pdf文件路径
    const canvas = document.createElement("canvas")

    pdfLib
      .getDocument(pdfBuffer)
      .promise.then((pdf) => {
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          pdf
            .getPage(pageNum)
            .then((page) => {
              const viewport = page.getViewport({ scale: 1.0 })

              // 设置canvas尺寸
              canvas.width = viewport.width
              canvas.height = viewport.height

              page
                .render({
                  canvasContext: canvas.getContext("2d"),
                  viewport: viewport
                })
                .promise.then(() => {
                  canvas.toBlob((blob) => {
                    console.log(blob, pageNum, pdf.numPages)
                    if (blob) {
                      blobArr.push(blob)
                    }
                    if (pageNum === pdf.numPages) {
                      resolve(blobArr)
                    }
                  })
                })
                .catch((e) => {
                  reject(e)
                })
            })
            .catch((e) => {
              reject(e)
            })
        }
      })
      .catch((e) => {
        reject(e)
      })
  })
}
