<script setup lang="ts">
import PageWrapper from "@renderer/components/page-wrapper/PageWrapper.vue"

const router = useRouter()
const toPictureClick = () => {
  router.push("/doc/pdf/to_picture")
}
</script>

<template>
  <PageWrapper>
    <n-grid x-gap="12" :cols="4">
      <n-gi>
        <n-card hoverable @click="toPictureClick"> PDF转图片 </n-card>
      </n-gi>
      <n-gi>
        <n-card hoverable> PDF转图片 </n-card>
      </n-gi>
      <n-gi>
        <n-card hoverable> PDF转图片 </n-card>
      </n-gi>
      <n-gi>
        <n-card hoverable> PDF转图片 </n-card>
      </n-gi>
    </n-grid>
  </PageWrapper>
</template>

<style scoped lang="scss">
.n-card {
  cursor: pointer;
  user-select: none;
}
</style>
