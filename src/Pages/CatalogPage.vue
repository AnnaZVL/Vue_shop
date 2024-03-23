<script setup>
import ContentRow from '@/components/Layots/ContentRow.vue';
import FiltersBox from '@/components/FiltersBox/FiltersBox.vue';
import ProductItem from '@/components/Products/ProductItem.vue';
import PaginationBox from '@/components/Layots/PaginationBox.vue';
import LimitProducts from '@/components/Layots/LimitProducts.vue';
import ButtonBase from '@/components/Buttons/ButtonBase.vue';

import { useProductStore } from '@/store/productStore.js';
import { ref } from 'vue';

const productStore = useProductStore();

const loading = ref(false);

const filters = ref({
  selectPriceMin: 0,
  selectPriceMax: 0,
  selectColorId: 0,
  selectCategoryId: 0,
  selectMaterialId: 0,
  selectSeasonId: 0,
});
const page = ref(1);
const limit = ref(6);

let isShow = ref(false);

const showFilters = () => {
  isShow.value = !isShow.value;
};

// Обновление фильтров
const handleFilters = async (updatedFilters) => {
  Object.keys(updatedFilters).forEach((key) => {
    filters.value[key] = updatedFilters[key];
  });
  try {
    await productStore.getProductsList(filters.value, page.value, limit.value);
    loading.value = false;
  } catch (error) {
    console.log('Ошибка при фильтрации', error);
  }
};

const handlePagination = async (newPage) => {
  page.value = newPage;
  try {
    await productStore.getProductsList(filters.value, newPage, limit.value);
    loading.value = false;
  } catch (error) {
    console.log('Ошибка при пагинации', error);
  }
};

const handleLimit = async (newLimit) => {
  limit.value = newLimit;
  try {
    await productStore.getProductsList(filters.value, page.value, newLimit);
    loading.value = false;
  } catch (error) {
    console.log('Ошибка при изменении лимита', error);
  }
};
</script>

<template>
  <main class="content container">
    <div class="content__top">
      <ContentRow :name="'Каталог'" :quantity="productStore.totalProducts"></ContentRow>
      <ButtonBase class="filter__open" type="button" @click="showFilters">Фильтры</ButtonBase>
    </div>

    <div class="content__catalog">
      <FiltersBox
        :class="{ open: isShow }"
        :filters="filters"
        :loading="loading"
        @update:filters="handleFilters"
      ></FiltersBox>
      <section class="catalog">
        <p v-if="productStore.productsList.length === 0">Ничего не найдено</p>
        <ul class="catalog__list" v-auto-animate>
          <ProductItem
            v-for="product in productStore.productsList"
            :key="product.id"
            :product="product"
          ></ProductItem>
        </ul>
        <PaginationBox
          v-if="productStore.productsList.length"
          :page="page"
          @update:pade="handlePagination"
        ></PaginationBox>
        <LimitProducts
          v-if="productStore.productsList.length"
          :limit="limit"
          @update:limit="handleLimit"
        ></LimitProducts>
      </section>
    </div>
  </main>
</template>

<style lang="scss">
@import '@/assets/scss/_variable.scss';

.content {
  &__catalog {
    display: grid;
    grid-template-columns: 290px 1fr;
    gap: 40px;
    align-items: flex-start;
  }

  .filter__open {
    display: none;
    min-width: 290px;
  }
}

.catalog {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 40px;

  &__list {
    margin: 0;
    margin-bottom: 30px;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 65px 30px;
    align-items: stretch;
  }
}

@media (max-width: 1024px) {
  .content {
    &__catalog {
      grid-template-columns: 1fr;
      position: relative;
    }

    .filter__open {
      display: flex;
    }
  }
}

@media (max-width: 562px) {
  .catalog {
    &__list {
      grid-template-columns: 1fr;
    }
  }
}
</style>
