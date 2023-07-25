<script setup lang="ts">
import { zhCN, dateZhCN } from "naive-ui"
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <div>
      <n-button type="primary"> Primary </n-button>
    </div>
  </n-config-provider>
</template>

