<script setup></script>

<template>
  <div class="loader"></div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variable.scss';

.loader {
  border: 4px solid transparent;
  border-top: 4px solid $color_grey;
  border-right: 4px solid $color_grey;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
