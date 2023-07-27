<script setup lang="ts"></script>

<template>
  <div class="page-wrapper-container">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.page-wrapper-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #fff;
  padding: 12px;
}
</style>
