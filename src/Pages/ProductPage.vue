<script setup>
import BreadCrumbs from '@/components/Layots/BreadCrumbs.vue';
import ButtonBase from '@/components/Buttons/ButtonBase.vue';
import CounterBox from '@/components/Layots/CounterBox.vue';
import FormFieldset from '@/components/FiltersBox/FormFieldset.vue';
import InputRadio from '@/components/FiltersBox/InputRadio.vue';
import LoaderBase from '@/components/Loader/LoaderBase.vue';

import { useCartStore } from '@/store/cartStore.js';
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/store/productStore.js';

const productStore = useProductStore();
const cartStore = useCartStore();
const productId = ref(null);
let currentProduct = ref({});
const breadList = ref([]);
const route = useRoute();
let mainUrl = ref('');
const currentColorId = ref(null);
const selectSizeId = ref('');
const currentQuantity = ref(1);
const isLoading = ref(false);
const isLoadingPage = ref(true);
const isAdded = ref(false);
const isShow = ref(true);

productId.value = parseInt(route.params.id, 10);
onBeforeMount(async () => {
  try {
    await productStore.getProduct(productId.value);
    currentProduct.value = productStore.product;

    breadList.value = [
      { name: 'Каталог', path: { name: 'Каталог' } },
      { name: currentProduct.value.category.title, path: { name: 'Каталог' } },
      { name: currentProduct.value.title, path: '' },
    ];
    // Заменяем белый цвет на серый
    currentProduct.value.colors.forEach((color) => {
      if (color.color.code === '#ffffff') {
        color.color.code = '#F0F0F0';
      }
    });
    mainUrl.value = currentProduct.value.colors[0].gallery[0].file.url;
    currentColorId.value = currentProduct.value.colors[0].color.id;
    selectSizeId.value = currentProduct.value.sizes[0].id;
    isLoadingPage.value = false;
  } catch (error) {
    console.log('Ошибка продукта в компоненте');
  }
});

// Смена главного фото по клику на цвет или малое фото
const changeColor = (colorId) => {
  currentColorId.value = colorId;
  const color = currentProduct.value.colors.find((color) => color.color.id === colorId);

  if (color && color.gallery) {
    mainUrl.value = color.gallery[0].file.url;
  }
  return mainUrl.value;
};

const handlTab = () => {
  isShow.value = !isShow.value;
};

const handleQuantityChange = (newQuantity) => {
  currentQuantity.value = newQuantity;
};

const handlSubmit = () => {
  isLoading.value = true;
  const data = {
    productId: String(productId.value),
    colorId: String(currentColorId.value),
    sizeId: String(selectSizeId.value),
    quantity: currentQuantity.value,
  };

  cartStore.addCart(data).then(() => {
    isLoading.value = false;
    isAdded.value = true;
    setTimeout(() => {
      isAdded.value = false;
    }, 3000);
  });
};
</script>

<template>
  <LoaderBase v-if="isLoadingPage"></LoaderBase>
  <main class="content container" v-else>
    <BreadCrumbs :breadList="breadList"></BreadCrumbs>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper" v-if="currentProduct.colors">
          <img class="pics__img" :src="mainUrl" :alt="currentProduct.title" />
        </div>
        <ul class="pics__list">
          <li
            class="pics__item"
            :class="{ current: currentColorId === color.color.id }"
            v-for="color in currentProduct.colors"
            :key="color.id"
            @click="changeColor(color.color.id)"
          >
            <img
              :src="img.file.url"
              :alt="currentProduct.title"
              v-for="img in color.gallery"
              :key="img.file.name"
            />
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ currentProduct.slug }}</span>
        <h2 class="item__title">{{ currentProduct.title }}</h2>
        <div class="item__form">
          <form class="form" @submit.prevent="handlSubmit">
            <div class="item__row item__row--center">
              <CounterBox
                v-model:quantity="currentQuantity"
                @update:quantity="handleQuantityChange"
              ></CounterBox>

              <b class="item__price"> {{ currentProduct.price }} ₽ </b>
            </div>

            <div class="item__row">
              <FormFieldset :legend="'Цвет'">
                <ul class="colors">
                  <li
                    class="colors__item"
                    v-for="color in currentProduct.colors"
                    :key="color.color.id"
                  >
                    <InputRadio
                      :item="color.color"
                      :value="color.color.title"
                      @change="changeColor(color.color.id)"
                      :isChecked="currentColorId === color.color.id"
                    ></InputRadio>
                  </li>
                </ul>
              </FormFieldset>
              <FormFieldset :legend="'Размер'">
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select" name="category" v-model="selectSizeId">
                    <option v-for="size in currentProduct.sizes" :key="size.id" :value="size.id">
                      {{ size.title }}
                    </option>
                  </select>
                </label>
              </FormFieldset>
            </div>
            <ButtonBase
              class="item__button"
              type="submit"
              :loading="isLoading"
              :disabled="isLoading"
              >В корзину</ButtonBase
            >
            <transition name="added">
              <p class="item__message" v-if="isAdded">Товар добавлен в корзину</p>
            </transition>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <span class="tabs__link tabs__link--current" @click="handlTab">
              Информация о товаре
            </span>
          </li>
          <li class="tabs__item">
            <span class="tabs__link" href="#" @click="handlTab"> Доставка и возврат </span>
          </li>
        </ul>

        <div class="item__content" v-if="isShow">
          {{ currentProduct.content || 'Информация о товаре скоро появится' }}
        </div>
        <div class="item__content" v-else>
          {{ currentProduct.content || 'Информация о доставке скоро появится' }}
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variable.scss';
.added-enter-active,
.added-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.added-enter,
.added-leave-to {
  opacity: 0;
}
.item {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 55px 30px;
  align-items: flex-start;

  &__code {
    font-size: 14px;
    line-height: 1;
    color: $color_grey-light;
  }

  &__title {
    margin: 10px 0 22px;
    font-size: 40px;
    line-height: 50px;
    font-weight: 400;
  }

  &__price {
    display: block;
    font-weight: 500;
    font-size: 40px;
    line-height: 1;
  }

  &__sizes {
    color: #898989;
  }

  &__row {
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-gap: 20px;
    justify-content: flex-start;

    &--center {
      align-items: center;
    }
  }

  &__desc {
    grid-column: 1/-1;
  }

  &__content {
    width: 595px;
    padding-top: 50px;
  }

  &__content h3 {
    margin: 25px 0 5px;
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;
  }
  &__content p {
    margin: 0 0 20px;
    font-size: 16px;
    line-height: 28px;
    color: $color_text;
    font-weight: 300;
  }
  &__content a {
    border-bottom: 2px dashed $color_text;
    transition: all 0.2s ease;
    font-size: 14px;
    line-height: 22px;
    color: $color_text;
  }
  &__content a:hover,
  &__content a:focus {
    border-color: transparent;
  }

  &__button {
    margin-bottom: 20px;
    min-width: 200px;
  }

  &__message {
    border-bottom: 1px solid $color_primery;
    width: max-content;
  }
}

.pics {
  &__wrapper {
    margin-bottom: 20px;
    max-width: 570px;
    height: 570px;
  }
  // .pics__img {
  //   width: 100%;
  //   height: 100%;
  //   object-fit: cover;
  // }
  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;
  }

  &__item {
    width: 98px;
    height: 98px;
    border-bottom: 3px solid transparent;
    transition: all 0.3s ease;
    cursor: pointer;
    img {
      height: 100%;
      width: 100%;
    }
    &.current {
      border-color: $color_primery;
    }
  }
}

.tabs {
  display: flex;

  align-items: center;
  border-bottom: 1px solid #e7e7e7;

  &__item:not(:last-child) {
    margin-right: 20px;
  }

  &__link {
    position: relative;
    display: block;
    padding: 15px 25px;
    font-size: 18px;
    color: $color_grey-light;

    &::after {
      content: '';
      position: absolute;
      bottom: -15px;
      left: 0;
      width: 100%;
      height: 3px;
      border-radius: 20px;
      background-color: transparent;
      transition: all 0.3s ease;
    }

    &:hover::after,
    &:focus::after {
      bottom: -1px;
      background-color: $color_primery;
    }
    .tabs__link--current {
      color: $color_text;
      font-weight: 700;
    }
    .tabs__link--current::after {
      bottom: -1px;
      background-color: $color_primery;
    }
  }
}

@media (max-width: 992px) {
  .item {
    grid-template-columns: 1fr;
    gap: 30px;

    &__desc {
      grid-column: auto;
    }
  }

  .pics {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;

    &__wrapper {
      height: 370px;
    }
    &__list {
      grid-template-columns: repeat(auto-fit, minmax(98px, 1fr));
    }
  }
}

@media (max-width: 768px) {
  .item {
    &__content {
      width: 98%;
    }
  }
}

@media (max-width: 562px) {
  .item {
    &__title {
      margin: 0;
      font-size: 28px;
      line-height: normal;
    }

    &__price {
      font-size: 28px;
    }
  }

  .tabs {
    flex-direction: column;
    align-items: flex-start;
  }
  .pics {
    flex-direction: column;

    &__wrapper {
      max-width: none;
      height: 350px;
    }
    &__list {
      width: 100%;
    }
  }
}
</style>
