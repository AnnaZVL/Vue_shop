<script setup>
import ContentRow from '@/components/Layots/ContentRow.vue';
import CartRezaltBlock from '@/components/Cart/CartRezaltBlock.vue';
import LoaderBase from '@/components/Loader/LoaderBase.vue';

import { useCartStore } from '@/store/cartStore';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const cartStore = useCartStore();
const orderList = ref([]);
const route = useRoute();
const orderId = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  orderId.value = parseInt(route.params.orderId, 10);
  try {
    await cartStore.getInfoOrder(orderId.value);
    orderList.value = cartStore.orderData;
    isLoading.value = false;
  } catch (error) {
    console.log('Ошибка при получении заказа');
  }
});
</script>

<template>
  <LoaderBase v-if="isLoading"></LoaderBase>
  <main class="content container" v-else>
    <div class="content__top">
      <div class="content__order">
        <ContentRow :name="'Заказ оформлен'"></ContentRow>
        <span class="content__info">№ {{ orderList.id }}</span>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" @submit.prevent="hendlOrder">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо
            с&nbsp;деталями заказа. Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для
            уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">Получатель</span>
              <span class="dictionary__value">
                {{ orderList.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">Адрес доставки</span>
              <span class="dictionary__value">
                {{ orderList.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">Телефон</span>
              <span class="dictionary__value">
                {{ orderList.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">Email</span>
              <span class="dictionary__value">
                {{ orderList.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">Способ оплаты</span>
              <span class="dictionary__value">
                {{ orderList.paymentType }}
              </span>
            </li>
          </ul>
        </div>
        <CartRezaltBlock
          :deliveryName="orderList.deliveryType ? orderList.deliveryType.title : ''"
          :isButton="false"
          :productsList="orderList.basket.items"
          :totalPrice="orderList.totalPrice"
        ></CartRezaltBlock>
      </form>
    </section>
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variable.scss';
.content__order {
  display: flex;
  align-items: center;
  gap: 1em;
}

.content__info {
  display: block;
  font-weight: 500;
  font-size: 18px;
}
.cart__message {
  margin-bottom: 50px;
  font-size: 16px;
  line-height: 24px;
}
.dictionary {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 30px;
  &__item {
    display: grid;
    grid-template-columns: 170px 1fr;
    grid-gap: 20px;
    font-size: 16px;
    line-height: 24px;
  }

  &__key {
    opacity: 0.6;
    font-weight: 300;
  }
}
</style>
