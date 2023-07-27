<script setup lang="ts">
import { MenuOption, NIcon } from "naive-ui"
import { Component } from "vue"
import { DocumentsOutline, LayersOutline } from "@vicons/ionicons5"
import { RouterLink } from "vue-router"
import { FilePdfOutlined } from "@vicons/antd"

const activeKey = ref("")
const collapsed = ref(false)

const renderIcon = (icon: Component) => {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const routerMap = {
  PDF转换: "/doc/pdf"
}
const renderLabel = (label: string) => {
  if (!routerMap[label]) {
    return label
  }
  return () =>
    h(
      RouterLink,
      {
        to: {
          path: routerMap[label]
        }
      },
      { default: () => label }
    )
}

const menuOptions: MenuOption[] = [
  {
    label: "文档处理",
    key: "doc-parent",
    icon: renderIcon(DocumentsOutline),
    children: [
      {
        label: renderLabel("PDF转换"),
        key: "pdf-tool",
        icon: renderIcon(FilePdfOutlined)
      }
    ]
  },
  {
    label: renderLabel("关于"),
    key: "tool",
    icon: renderIcon(LayersOutline)
  }
]
</script>

<template>
  <n-menu
    v-model:value="activeKey"
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="menuOptions"
  />
</template>

<style scoped lang="scss"></style>
