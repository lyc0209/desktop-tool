<script setup lang="ts">
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5"
import { UploadFileInfo } from "naive-ui"
import { convertPdfToImages } from "@renderer/utils/doc/pdf"
import { selectSavePathApi } from "@renderer/api/common"

const message = useMessage()

const toTransformList = ref<UploadFileInfo[]>([])

const handleUploadChange = (data: { fileList: UploadFileInfo[] }) => {
  toTransformList.value = data.fileList
}

const handleRemove = (data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
  console.log(data)
}

const onTransformClick = async () => {
  if (toTransformList.value.length === 0) {
    message.warning("请先选择要转换的PDF")
    return
  }

  try {
    const savePath = await selectSavePathApi()
    console.log(savePath)

    processState.processing = true

    for (const item of toTransformList.value) {
      processState.percentage = 0
      processState.currentProcess = item.name
      await convertPdfToImages(item.file, savePath, (per) => (processState.percentage = per))
    }
    message.success("保存成功")
  } catch (e) {
    console.log(e)
    message.error("操作失败")
  } finally {
    processState.processing = false
  }
}

const processState = reactive({
  processing: false,
  percentage: 0,
  currentProcess: ""
})
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
    <n-button :loading="processState.processing" type="primary" @click="onTransformClick"
      >转换</n-button
    >
    <div v-if="processState.processing" class="flex flex-col flex-items-center m-t-4">
      <span style="width: 100%">正在处理：{{ processState.currentProcess }}</span>
      <n-progress
        class="m-t-2"
        type="line"
        :percentage="processState.percentage"
        indicator-placement="inside"
        processing
      />
    </div>
  </PageWrapper>
</template>

<style scoped lang="scss"></style>
