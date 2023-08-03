import { createWriteStream } from "fs-extra"
import * as archiver from "archiver"

export const compressing = () => {
  // 创建一个输出流，将压缩文件写入磁盘
  const output = createWriteStream("archive.zip")
  const archive = archiver("zip", {
    zlib: { level: 9 } // 设置压缩级别（可选）
  })

  // 监听所有数据都已被写入到底层系统时触发的事件
  output.on("close", () => {
    console.log(archive.pointer() + " total bytes")
    console.log("Archiver has been finalized and the output file descriptor has closed.")
  })

  // 将输出流与archiver绑定
  archive.pipe(output)

  // 添加多个文件到ZIP
  archive.file("file1.txt", { name: "file1.txt" })
  archive.file("file2.jpg", { name: "file2.jpg" })

  // 完成压缩并关闭archiver
  archive.finalize()
}
