<script>
export default {
  props: ['item', 'index'],
  setup() {
    const titles = ['Получатель', 'Адрес доставки', 'Телефон', 'Email', 'Способ оплаты'];
    return {
      titles,
    };
  },
};
</script>

<template>
  <li class="dictionary__item">
    <span class="dictionary__key"> {{ titles[index] }} </span>
    <span class="dictionary__value">
      {{ item }}
    </span>
  </li>
</template>

<style lang="scss" scoped>
.dictionary {
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
