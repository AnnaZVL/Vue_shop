<script setup>
import BreadCrumbs from '@/components/Layots/BreadCrumbs.vue';
import ContentRow from '@/components/Layots/ContentRow.vue';
import CatrItem from '@/components/Cart/CatrItem.vue';
import ButtonBase from '@/components/Buttons/ButtonBase.vue';

import { useCartStore } from '@/store/cartStore.js';
import { watch, ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const cartList = ref(cartStore.cartList);
const router = useRouter();
const breadList = ref([]);
const isLoading = ref(false);

breadList.value = [
  { name: 'Каталог', path: { name: 'Каталог' } },
  { name: 'Корзина', path: '' },
];

const totalAmount = computed(() => cartList.value.length);
const currentTotalSum = computed(() =>
  cartList.value.reduce((acc, item) => item.price * item.quantity + acc, 0),
);

watch(
  () => cartStore.cartList,
  (newCartList) => {
    cartList.value = newCartList;
  },
);

const handlSubmit = async () => {
  isLoading.value = true;
  isLoading.value = false;
  router.push({ name: 'Оформление заказа' });
};
</script>

<template>
  <main class="content container">
    <div class="content__top">
      <BreadCrumbs :breadList="breadList"></BreadCrumbs>
      <ContentRow :name="'Корзина'" :quantity="totalAmount"></ContentRow>
    </div>
    <section class="cart" v-if="totalAmount">
      <form class="cart-form form" @submit.prevent="handlSubmit">
        <div class="cart-formt__field">
          <ul class="cart-form__list" v-auto-animate>
            <CatrItem v-for="product in cartList" :key="product.id" :product="product"></CatrItem>
          </ul>
        </div>
        <div class="cart__block">
          <p class="cart__desc">Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе</p>
          <p class="cart__price">
            Итого: <span>{{ currentTotalSum }} ₽</span>
          </p>
          <ButtonBase class="cart__button" type="submit" :loading="isLoading"
            >Оформить заказ</ButtonBase
          >
        </div>
      </form>
    </section>
    <p v-else>Корзина пуста</p>
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variable.scss';

.cart {
  &-form {
    display: grid;
    grid-template-columns: 1fr 370px;
    gap: 50px;
    align-items: flex-start;
  }

  &__block {
    border: 1px solid $color_border-second;
    border-radius: 1px;
    padding: 35px 30px;
  }

  &__button {
    margin-top: 20px;
    width: 100%;
  }

  &__desc {
    margin: 0 0 15px;
    font-size: 16px;
    line-height: 22px;
  }

  &__price {
    margin: 0 0 15px;
    font-size: 30px;
    line-height: 48px;
    & span {
      font-weight: 500;
      font-size: 34px;
      line-height: 48px;
    }
  }
}

@media (max-width: 1024px) {
  .cart {
    &-form {
      gap: 25px;
    }
  }
}

@media (max-width: 768px) {
  .cart {
    &-form {
      grid-template-columns: 1fr;
    }

    &__block {
      margin-top: 20px;
      width: 370px;
      justify-self: center;
    }
  }
}

@media (max-width: 562px) {
  .cart {
    &__block {
      width: 320px;
    }
  }
}
</style>
