<script lang="ts" setup>
import SystemMenu from "./menu/SystemMenu.vue"
</script>

<template>
  <div class="h-screen">
    <n-layout has-sider class="h-screen">
      <n-layout-sider
        collapse-mode="width"
        :collapsed-width="60"
        :width="200"
        show-trigger="arrow-circle"
        bordered
        :native-scrollbar="false"
      >
        <SystemMenu></SystemMenu>
      </n-layout-sider>
      <n-layout content-style="display: flex; flex-direction: column;">
        <n-layout-content
          embedded
          content-style="padding: 12px; height: 100%; display: flex; flex-direction: column;"
          class="flex-1"
        >
          <RouterView v-slot="{ Component, route }">
            <component :is="Component" :key="route.fullPath" />
          </RouterView>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </div>
</template>

<style lang="scss" scoped></style>
