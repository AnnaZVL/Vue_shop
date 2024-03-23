<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const limitsArr = ref([6, 12, 24, 32]);
const props = defineProps({
  limit: {
    type: Number,
  },
});
const emit = defineEmits(['update:limit']);

const currentLimit = ref(props.limit);
function changeLimit(limit) {
  currentLimit.value = limit;
  emit('update:limit', currentLimit.value);
}
</script>

<template>
  <div class="limits">
    <span class="limits__title">Товаров на странице</span>
    <ul class="limits__list">
      <li
        class="limits__item"
        :class="{ active: currentLimit === limit }"
        v-for="limit in limitsArr"
        :key="limit"
        @click="changeLimit(limit)"
      >
        {{ limit }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variable.scss';
.limits {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 400px;
  align-self: center;

  &__title {
    font-size: 16px;
    line-height: 1;
    color: $color_text_form;
    text-align: center;
  }
  &__list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }
  &__item {
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: 1px solid $color_text;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: $color_text;
    font-size: 14px;
    line-height: 1;
    transition: background 0.3s ease-in-out, color 0.3s ease-in-out, border 0.3s ease-in-out;

    &:hover {
      background-color: $color_primery;
      color: $color_white;
      border-color: transparent;
    }

    &.active {
      background-color: $color_primery;
      color: $color_white;
      border-color: transparent;
    }
  }
}
</style>
