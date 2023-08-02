<script setup lang="ts">
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5"
import { UploadFileInfo } from "naive-ui"
import { transformPDFToPictureApi } from "@renderer/api/doc"
import { convertPdfToImages } from "@renderer/utils/doc/pdf"

const toTransformList = ref<UploadFileInfo[]>([])

const handleUploadChange = (data: { fileList: UploadFileInfo[] }) => {
  toTransformList.value = data.fileList
}

const handleRemove = (data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
  console.log(data)
}

const onTransformClick = async () => {
  // if (list.length === 0) {
  //   return
  // }

  const bufferList = await Promise.all(toTransformList.value.map((item) => item.file.arrayBuffer()))

  const result = await convertPdfToImages(bufferList[0])
  console.log("result: ", result)

  // const blobList = await Promise.all(bufferList.map((buffer) => convertPdfToImages(buffer)))
  // console.log("blobList: ", blobList)
  // const result = await transformPDFToPictureApi(list)
  // console.log(result)
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
    <n-button type="primary" @click="onTransformClick">转换</n-button>
  </PageWrapper>
</template>

<style scoped lang="scss"></style>
