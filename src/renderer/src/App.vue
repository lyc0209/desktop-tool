<script setup lang="ts">
import { zhCN, dateZhCN } from "naive-ui"
</script>

<template>
  <n-config-provider class="h-screen" :locale="zhCN" :date-locale="dateZhCN">
    <router-view />
  </n-config-provider>
</template>
