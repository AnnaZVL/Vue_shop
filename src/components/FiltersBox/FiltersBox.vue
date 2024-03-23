<script setup>
import ButtonBase from '../Buttons/ButtonBase.vue';
import FormFieldset from './FormFieldset.vue';
import InputText from './InputText.vue';
import CategoryBox from './CategoryBox.vue';
import ColorBox from './ColorBox.vue';
import MaterialBox from './MaterialBox.vue';
import SeasonBox from './SeasonBox.vue';

import { defineProps, defineEmits, ref, computed } from 'vue';

const props = defineProps({
  filters: Object,
  loading: Boolean,
});

const emit = defineEmits(['update:filters']);

const filters = ref(props.filters);

// Обновление значений фильтров
const handlFilter = () => {
  emit('update:filters', filters.value);
};

const resertFilters = () => {
  filters.value = {
    selectPriceMin: 0,
    selectPriceMax: 0,
    selectColorId: 0,
    selectCategoryId: 0,
    selectMaterialId: 0,
    selectSeasonId: 0,
  };
  emit('update:filters', filters.value);
};

// Проверка наличия выбранных фильтров
const hasSelectedFilters = computed(() => {
  return (
    filters.value.selectPriceMin !== 0 ||
    filters.value.selectPriceMax !== 0 ||
    filters.value.selectCategoryId !== 0 ||
    filters.value.selectColorId !== 0 ||
    filters.value.selectMaterialId !== 0 ||
    filters.value.selectSeasonId !== 0
  );
});
</script>

<template>
  <aside class="filters">
    <form class="filter__form form" @submit.prevent="handlFilter">
      <FormFieldset :legend="'Цена'">
        <InputText v-model:value="filters.selectPriceMin" :name="'minPrice'">От</InputText>
        <InputText v-model:value="filters.selectPriceMax" :name="'maxPrice'">До</InputText>
      </FormFieldset>

      <CategoryBox v-model:value="filters.selectCategoryId"></CategoryBox>

      <ColorBox v-model:value="filters.selectColorId"></ColorBox>

      <MaterialBox v-model:value="filters.selectMaterialId"></MaterialBox>

      <SeasonBox v-model:value="filters.selectSeasonId"></SeasonBox>

      <ButtonBase class="filter__submit" :loading="loading" type="submit"></ButtonBase>

      <ButtonBase
        class="filter__reset"
        v-if="hasSelectedFilters"
        :color="'second'"
        :loading="loading"
        @click="resertFilters"
        >Сбросить</ButtonBase
      >
    </form>
  </aside>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variable.scss';
.filter__submit {
  width: 100%;
}

.filter__reset {
  width: 144px;
}
@media (max-width: 1024px) {
  .filters {
    padding: 10px;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(-100%);
    z-index: 100;
    width: 310px;
    background-color: $color_white;
    -webkit-box-shadow: 2px 5px 4px 4px rgba(0, 0, 0, 0.29);
    -moz-box-shadow: 2px 5px 4px 4px rgba(0, 0, 0, 0.29);
    box-shadow: 2px 5px 4px 4px rgba(0, 0, 0, 0.29);
    opacity: 0;
    visibility: hidden;
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  }

  .filters.open {
    opacity: 1;
    visibility: visible;
    transform: translateX(0%);
  }
}
</style>
