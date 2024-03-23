<script setup>
import CounterBox from '../Layots/CounterBox.vue';
import IconClose from '@/assets/images/icons/IconClose.vue';

import { useCartStore } from '@/store/cartStore.js';
import { toRef, defineProps } from 'vue';

const props = defineProps({
  product: Object,
});

const catrStore = useCartStore();
const currentQuantity = toRef(props.product.quantity);

function deleteProduct(cartProductId) {
  catrStore.deleteProductCart(String(cartProductId));
}

function handleQuantityChange(newQuantity) {
  // Обработка изменения количества товаров
  currentQuantity.value = newQuantity;
  catrStore.updateAmountProduct({
    basketItemId: props.product.id,
    quantity: currentQuantity.value,
  });
}
</script>

<template>
  <li class="cart__item product-cart">
    <div class="product-cart__inner">
      <div class="product-cart__pic">
        <img :src="product.color.gallery[0].file.url" :alt="product.product.title" />
      </div>
      <div class="product-cart__content">
        <h3 class="product-cart__title">{{ product.product.title }}</h3>
        <div class="product-cart__info product__info--color">
          Цвет:
          <span
            class="product-cart__info--color"
            :style="{ 'background-color': product.color.color.code }"
          ></span>
          <span class="product-cart__info--text">{{ product.color.color.title }}</span>
        </div>
        <span class="product-cart__code"> Артикул: {{ product.product.slug }} </span>
        <span class="product-cart__code">Размер: {{ product.size.title }} </span>
      </div>
    </div>
    <div class="product-cart__action">
      <div class="product-cart__wrapper">
        <CounterBox
          class="product-cart__counter"
          v-model:quantity="currentQuantity"
          @update:quantity="handleQuantityChange"
        ></CounterBox>

        <b class="product-cart__price"> {{ product.price * currentQuantity }} ₽ </b>
      </div>
      <button
        class="product-cart__del button-del"
        type="button"
        @click="deleteProduct(product.id)"
        aria-label="Удалить товар из корзины"
      >
        <IconClose></IconClose>
      </button>
    </div>
  </li>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variable.scss';
.product-cart {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 60px;
  }

  &__inner {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: flex-start;
  }

  &__action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    min-width: 300px;
  }

  &__pic {
    width: 120px;
    height: 120px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: flex-start;
    justify-content: space-between;
    height: 120px;
  }

  &__wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
  }
  &__title {
    margin-bottom: 5px;
    font-size: 16px;
    line-height: 22px;
    font-weight: 400;
    min-width: 200px;
  }

  &__info {
    font-size: 14px;
    line-height: 1;
    color: $color_text_form;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;

    &--color {
      display: block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }

    &--text {
      display: block;
      color: $color_text;
    }
  }

  &__code {
    font-size: 12px;
    color: $color_grey-light;
  }

  &__del {
    margin: 0;
    padding: 0;
    border: 0;
    background-color: transparent;
    -webkit-tap-highlight-color: transparent;
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: rotate(90deg);
    }
  }

  &__counter input {
    padding: 10px 5px;
    height: 40px;
    width: 55px;
  }
}

@media (max-width: 1024px) {
  .product-cart {
    flex-direction: column;
    align-items: flex-start;

    &__action {
      width: 100%;
    }
  }
}

@media (max-width: 768px) {
  .product-cart {
    flex-direction: row;

    &__action {
      min-width: auto;
      justify-content: flex-end;
      align-items: center;
      gap: 15px;
    }

    &__wrapper {
      flex-direction: column;
    }
  }
}

@media (max-width: 562px) {
  .product-cart {
    flex-direction: column;

    &__action {
      justify-content: space-between;
    }

    &__wrapper {
      flex-direction: row;
    }
  }
}

@media (max-width: 420px) {
  .product-cart {
    &__inner {
      flex-direction: column;
      align-items: flex-start;
    }
  }
}
</style>
