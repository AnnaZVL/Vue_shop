<script setup>
import InputRadio from '@/components/FiltersBox/InputRadio.vue';

import { useProductStore } from '@/store/productStore.js';
import { ref, defineProps, computed } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    requared: true,
  },
});

const productStore = useProductStore();
const product = ref(props.product);

let currentColorId = ref('');
currentColorId.value = product.value.colors[0].color.id;

const isActive = computed(() => {
  return productStore.selectColorId ? productStore.selectColorId : currentColorId.value;
});

// Заменяем белый цвет на серый
product.value.colors.forEach((color) => {
  if (color.color.code === '#ffffff') {
    color.color.code = '#F0F0F0';
  }
});
// выбор 1 фото под текущий цвет или замена на дефолтное, если фото нет
const selectColorImg = computed(() => {
  let currentUrl = '';

  let color = product.value.colors.find((color) => color.color.id === currentColorId.value);

  if (color && color.gallery) {
    currentUrl = color.gallery[0].file.url;
  } else currentUrl = require('@/assets/images/no-photo.jpg');

  return currentUrl;
});
// Смена фото при смене цвета
const changeColor = (colorId) => {
  currentColorId.value = colorId;
};
</script>

<template>
  <li class="item">
    <router-link
      class="item__pic"
      :to="{ name: 'Страница товара', params: { id: product.id } }"
      aria-level="Перейти на страницу товара"
    >
      <img :src="selectColorImg" :alt="product.title" />
    </router-link>

    <router-link
      class="item__title"
      :to="{ name: 'Страница товара', params: { id: product.id } }"
      aria-level="Перейти на страницу товара"
    >
      <h3>{{ product.title }}</h3>
    </router-link>

    <span class="item__price">
      {{ product.price + ' ₽' }}
    </span>
    <ul class="colors">
      <li class="colors__item" v-for="color in product.colors" :key="color.color.id">
        <InputRadio
          :item="color.color"
          @change="changeColor(color.color.id)"
          :isChecked="currentColorId === color.color.id"
          :isActive="isActive === color.color.id"
        ></InputRadio>
      </li>
    </ul>
  </li>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variable.scss';
.item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  height: 100%;
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;

  &:hover {
    -webkit-box-shadow: 3px 3px 4px 2px rgba(125, 119, 119, 0.29);
    -moz-box-shadow: 3px 3px 4px 2px rgba(125, 119, 119, 0.29);
    box-shadow: 3px 3px 4px 2px rgba(125, 119, 119, 0.29);
    transform: scale(1.02);
  }

  &__pic {
    display: block;
    width: 260px;
    height: 370px;
    margin-bottom: 10px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__title {
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: $color_text;
    transition: opacity 0.3s ease-in-out;

    &:hover,
    &:focus {
      opacity: 0.6;
    }
  }
  &__price {
    display: block;

    font-size: 18px;
    line-height: 24px;
    font-weight: 500;
  }
}

@media (max-width: 562px) {
  .item {
    &__title {
      font-size: 14px;
    }
  }
}
</style>
