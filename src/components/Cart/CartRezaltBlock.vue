<script setup>
import ButtonBase from '@/components/Buttons/ButtonBase.vue';

import replacingEndings from '@/helpers/helpers.js';

import { ref, defineProps, computed } from 'vue';

const props = defineProps({
  productsList: {
    type: Array,
  },
  deliveryName: {
    type: String,
  },
  isButton: {
    type: Boolean,
    default: true,
  },
  totalPrice: {
    type: Number,
  },
});

const loading = ref(false);
let productsList = ref(props.productsList);

const currentTotalSum = computed(() =>
  productsList.value.reduce((acc, item) => item.price * item.quantity + acc, 0),
);

// Замена окончаний в зависимости от кол-ва товаров
const descrNumber = computed(() => replacingEndings(productsList.value.length));
</script>

<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <li class="cart__order" v-for="product in productsList" :key="product.id">
        <h3>{{ product.product.title }}</h3>
        <b>{{ product.price * product.quantity }} ₽</b>
        <span>Артикул: {{ product.product.slug }}</span>
      </li>
    </ul>

    <div class="cart__total">
      <p>
        Доставка: <b>{{ deliveryName }}</b>
      </p>
      <p>
        Итого: <b>{{ productsList.length }}</b> {{ descrNumber }} на сумму
        <b>{{ totalPrice || currentTotalSum }} ₽</b>
        <!--<b v-if="route.name !== 'Заказ оформлен'">{{ currentTotalSum }} ₽</b>
        <b v-else>{{ ca.totalPrice }} ₽</b> -->
      </p>

      <ButtonBase
        class="item__button"
        type="submit"
        v-if="isButton"
        :loading="loading"
        :disabled="loading"
        >Оформить заказ</ButtonBase
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variable.scss';
.cart__block {
  border: 1px solid $color_border-second;
  border-radius: 1px;
}
.cart__orders {
  padding: 35px 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-bottom: 1px solid $color_border-second;
}
.cart__order {
  display: grid;
  grid-template-columns: 1fr 90px;
  grid-gap: 5px 20px;

  h3 {
    margin: 0;
    font-size: 16px;
    line-height: 22px;
    font-weight: 400;
  }

  b {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    text-align: right;
  }
  span {
    font-size: 12px;
    line-height: 1;
    color: $color_grey;
  }
}

.cart__total {
  padding: 35px 30px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  button {
    margin-top: 20px;
  }
}
</style>
