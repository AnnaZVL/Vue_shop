<script setup>
import BreadCrumbs from '@/components/Layots/BreadCrumbs.vue';
import ContentRow from '@/components/Layots/ContentRow.vue';
import InputCart from '@/components/Cart/InputCart.vue';
import CheckCart from '@/components/Cart/CheckCart.vue';
import CartRezaltBlock from '@/components/Cart/CartRezaltBlock.vue';

import { useCartStore } from '@/store/cartStore';
import { ref, computed, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { validEmail, validPhone } from '@/helpers/validation';

const cartStore = useCartStore();

const order = ref({
  name: '',
  address: '',
  phone: '',
  email: '',
  comment: '',
  deliveryTypeId: '',
  paymentTypeId: '',
});

const isLoading = ref(false);
const isValid = ref(false);
const isSuccess = ref(true);
const errors = ref({
  name: { value: false, message: '' },
  address: { value: false, message: '' },
  phone: { value: false, message: '' },
  email: { value: false, message: '' },
});
const delivery = ref([]);
const currentDeliveryId = ref(1);
const pay = ref([]);
const currentPayId = ref(1);
const router = useRouter();
const breadList = ref([]);
breadList.value = [
  { name: 'Каталог', path: { name: 'Каталог' } },
  { name: 'Корзина', path: '/cart' },
  { name: 'Оформление заказа', path: '' },
];

onBeforeMount(async () => {
  await cartStore.getDeliveryList();
  await cartStore.getPayList();

  delivery.value = cartStore.deliveryList;
  pay.value = cartStore.payList;
});

// Вывод названия доставки, в зависимости от выбранного способа
const deliveryName = computed(() => getDeliveryName(currentDeliveryId.value));

function getDeliveryName(id) {
  const item = delivery.value.find((i) => i.id === +id);
  return item ? (item.price === '0' ? 'бесплатно' : item.title) : '';
}

async function changeDelivery(value) {
  pay.value = await cartStore.getPayList(value);
  currentPayId.value = 2;
  currentDeliveryId.value = value;
}

function changePay(value) {
  if (value === 1) {
    changeDelivery(1);
  }
  currentPayId.value = value;
}

async function handlSubmit() {
  isValid.value = true;
  isSuccess.value = false;

  errors.value.name = { value: false, message: '' };
  errors.value.address = { value: false, message: '' };
  errors.value.phone = { value: false, message: '' };
  errors.value.email = { value: false, message: '' };
  // Валидация на обязательное заполнение
  if (!order.value.name) {
    errors.value.name = { value: true, message: 'Поле обязательно для заполнения' };
    isValid.value = false;
    isSuccess.value = false;
  }

  if (!order.value.address) {
    errors.value.address = { value: true, message: 'Поле обязательно для заполнения' };
    isValid.value = false;
    isSuccess.value = false;
  }

  if (!order.value.phone) {
    errors.value.phone = { value: true, message: 'Поле обязательно для заполнения' };
    isValid.value = false;
    isSuccess.value = false;
  }

  if (!order.value.email) {
    errors.value.email = { value: true, message: 'Поле обязательно для заполнения' };
    isValid.value = false;
    isSuccess.value = false;
  }

  // Валидация почты
  if (!validEmail(order.value.email)) {
    errors.value.email.value = true;
    errors.value.email.message = 'Не верный формат почты';
    isValid.value = false;
    isSuccess.value = false;
  }

  // Валидация телефона
  if (!validPhone(order.value.phone)) {
    errors.value.phone.value = true;
    errors.value.phone.message = 'Не верный формат телефона';
    isValid.value = false;
    isSuccess.value = false;
  }

  if (isValid.value) {
    isSuccess.value = true;
    order.value.deliveryTypeId = currentDeliveryId.value;
    order.value.paymentTypeId = currentPayId.value;

    const res = await cartStore.createdOrder(order.value);

    if (res) {
      cartStore.updateOrderData(res);

      router.push({ name: 'Заказ оформлен', params: { orderId: res.id } });
    } else {
      isSuccess.value = false;
    }
  } else {
    console.log('ERROR', isValid.value, errors.value);
  }
}

function resetError(fieldName) {
  errors.value[fieldName] = { value: false, message: '' };
}
</script>

<template>
  <main class="content container">
    <div class="content__top">
      <BreadCrumbs :breadList="breadList"></BreadCrumbs>
      <ContentRow :name="'Оформление заказа'"></ContentRow>
    </div>
    <section class="cart">
      <p v-if="isLoading">Загрузка</p>
      <form class="cart__form form" @submit.prevent="handlSubmit" v-else>
        <div class="cart__field">
          <div class="cart__data">
            <InputCart
              :name="'name'"
              :placeholder="'Введите ваше полное имя'"
              :label="'ФИО'"
              v-model:value="order.name"
              :error="errors.name"
              @focus="resetError('name')"
            ></InputCart>

            <InputCart
              :name="'address'"
              :placeholder="'Введите ваш адрес'"
              :label="'Адрес доставки'"
              v-model:value="order.address"
              :error="errors.address"
              @focus="resetError('address')"
            ></InputCart>

            <InputCart
              :type="'tel'"
              :name="'phone'"
              :placeholder="'Введите ваш телефон'"
              :label="'Телефон'"
              :error="errors.phone"
              v-model:value="order.phone"
              @focus="resetError('phone')"
            ></InputCart>

            <InputCart
              :type="'email'"
              :name="'email'"
              :placeholder="'Введи ваш Email'"
              :label="'Email'"
              v-model:value="order.email"
              :error="errors.email"
              @focus="resetError('email')"
            ></InputCart>

            <label class="form__label">
              <textarea
                class="form__input form__input--area"
                name="comments"
                v-model="order.comment"
                placeholder="Ваши пожелания"
              ></textarea>
              <span class="form__value">Комментарий к заказу</span>
            </label>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item" v-for="item in delivery" :key="item.id">
                <CheckCart
                  :name="'delivery'"
                  :label="item.title"
                  :count="item.price + ' ₽'"
                  v-model="item.id"
                  :checked="item.id === currentDeliveryId"
                  @change="changeDelivery(item.id)"
                ></CheckCart>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item" v-for="item in pay" :key="item.id">
                <CheckCart
                  :name="'pay'"
                  :label="item.title"
                  v-model="item.id"
                  @change="changePay(item.id)"
                  :checked="item.id === currentPayId"
                ></CheckCart>
              </li>
            </ul>
          </div>
        </div>
        <CartRezaltBlock
          :deliveryName="deliveryName"
          :productsList="cartStore.cartList"
        ></CartRezaltBlock>
        <transition name="error">
          <div class="cart__error form__error-block" v-if="!isSuccess">
            <h4>Заявка не отправлена!</h4>
            <p>Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.</p>
          </div>
        </transition>
      </form>
    </section>
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variable.scss';
.error-enter-active,
.error-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.error-enter,
.error-leave-to {
  opacity: 0;
}
.cart__data {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-gap: 5px 30px;
  padding-bottom: 25px;
  margin-bottom: 15px;

  label:not(:nth-child(4)):not(:nth-child(3)) {
    grid-column: 1/-1;
  }
}

.cart__title {
  margin: 0 0 20px;
  font-size: 14px;
  line-height: 24px;
  text-transform: uppercase;
}
.options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-gap: 30px;

  &__item {
    max-width: 360px;
  }
  &:not(:last-child) {
    margin-bottom: 40px;
  }
}
.cart__error {
  grid-column: 2/3;
}
</style>
