<script setup>
import IconCartHeader from '@/assets/images/icons/IconCartHeader.vue';
import IconPhone from '@/assets/images/icons/IconPhone.vue';

import { useCartStore } from '@/store/cartStore.js';

const cartStore = useCartStore();
</script>

<template>
  <header class="header">
    <div class="header__container container">
      <router-link class="header__info" to="/"> Каталог </router-link>
      <router-link class="header__logo" to="/">
        <img src="@/assets/images/logo-moire.svg" alt="Логотип интернет магазина Moire" />
      </router-link>
      <div class="header__right">
        <a class="header__tel" href="tel:8 800 600 90 09">
          <span> 800 600 90 09</span>
          <IconPhone></IconPhone>
        </a>
        <router-link class="header__cart" to="/cart" aria-label="Корзина с товарами">
          <IconCartHeader></IconCartHeader>
          <span class="header__count" aria-label="Количество товаров">{{
            cartStore.cartList.length || 0
          }}</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variable.scss';
.header {
  background-color: $color_white;

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    padding-top: 23px;
    padding-bottom: 23px;
    border-bottom: 1px solid $color_border;
  }

  &__right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 30px;
  }

  &__info {
    font-size: 12px;
    text-transform: uppercase;
  }

  &__logo {
    display: block;
    width: 190px;
    margin: 0 auto;
    text-align: center;

    img {
      width: 116px;
      height: 34px;
    }
  }

  &__tel {
    margin-left: auto;
    span {
      font-size: 14px;
      color: $color_dark;
    }

    svg {
      display: none;
      width: 30px;
      height: 32px;
    }
  }

  &__cart {
    position: relative;
    height: 27px;
    width: 25px;
    svg {
      height: 100%;
      width: 100%;
    }
  }

  &__count {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: $color_primery;
    padding: 3px;
    min-width: 13px;
    height: 13px;
    border-radius: 50%;
    font-size: 7px;
    line-height: 1;
    font-weight: 500;
    color: $color_white;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .header {
    &__right {
      gap: 15px;
    }

    &__tel {
      span {
        display: none;
      }

      svg {
        display: block;
      }
    }
  }
}

@media (max-width: 562px) {
  .header {
    &__container {
      gap: 15px;
    }
    &__logo {
      width: 120px;
    }
  }
}
</style>
