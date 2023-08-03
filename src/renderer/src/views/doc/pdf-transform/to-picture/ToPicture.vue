<script setup lang="ts">
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5"
import { UploadFileInfo } from "naive-ui"
import { transformPDFToPictureApi } from "@renderer/api/doc"
import { convertPdfToImages } from "@renderer/utils/doc/pdf"
import { blobToArrayBuffer } from "@common/utils/file"
import { selectSavePathApi } from "@renderer/api/common"

const message = useMessage()

const toTransformList = ref<UploadFileInfo[]>([])

const handleUploadChange = (data: { fileList: UploadFileInfo[] }) => {
  toTransformList.value = data.fileList
}

const handleRemove = (data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
  console.log(data)
}

const btnLoading = ref(false)
const onTransformClick = async () => {
  if (toTransformList.value.length === 0) {
    message.warning("请先选择要转换的PDF")
    return
  }

  btnLoading.value = true
  try {
    const savePath = await selectSavePathApi()
    console.log(savePath)

    const list = (
      await Promise.all(
        toTransformList.value.map(async (item) => convertPdfToImages(await item.file.arrayBuffer()))
      )
    ).flat(1)

    // blob 转 buffer
    const arrayBufferList = await Promise.all(list.map((blob) => blobToArrayBuffer(blob)))

    // 保存图片
    const result = await transformPDFToPictureApi(arrayBufferList)
    if (result) {
      message.success("保存成功")
    }
  } catch (e) {
    console.log(e)
    message.error("操作失败")
  } finally {
    btnLoading.value = false
  }
}
</script>

<template>
  <PageWrapper>
    <n-upload
      :file-list="toTransformList"
      multiple
      directory-dnd
      :max="5"
      @remove="handleRemove"
      @change="handleUploadChange"
    >
      <n-upload-dragger>
        <div style="margin-bottom: 12px">
          <n-icon size="48" :depth="3">
            <ArchiveIcon />
          </n-icon>
        </div>
        <n-text style="font-size: 16px"> 点击或者拖动文件到该区域来上传PDF </n-text>
      </n-upload-dragger>
    </n-upload>
    <n-button :loading="btnLoading" type="primary" @click="onTransformClick">转换</n-button>
    <canvas id="pdf-canvas"></canvas>
  </PageWrapper>
</template>

<style scoped lang="scss"></style>
