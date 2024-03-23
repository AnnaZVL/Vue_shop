<script setup>
import LoaderBase from '@/components/Loader/LoaderBase.vue';

import { useProducts } from '@/composables/Base/useProducts';
import { useCartList, updateUserAccessKey } from './composables/Cart/useCartsData';
import { ref, onBeforeMount } from 'vue';

const isLoading = ref(true);

onBeforeMount(async () => {
  try {
    await useProducts();
    updateUserAccessKey();
    await useCartList();
    isLoading.value = false;
  } catch (error) {
    console.log('Ошибка при загрузке данных', error);
  }
});
</script>

<template>
  <div class="">
    <router-view name="header"></router-view>

    <LoaderBase v-if="isLoading"></LoaderBase>
    <router-view v-else></router-view>

    <router-view name="footer"></router-view>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
</style>
