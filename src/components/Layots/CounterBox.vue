<script setup>
import IconMinus from '@/assets/images/icons/IconMinus.vue';
import IconPlus from '@/assets/images/icons/IconPlus.vue';

import { defineEmits, toRef, defineProps } from 'vue';

const props = defineProps({
  quantity: Number,
});

const emit = defineEmits(['update:quantity']);

const count = toRef(+props.quantity);

const countPlus = () => {
  count.value++;
  emit('update:quantity', Number(count.value));
};

const countMinus = () => {
  count.value = Math.max(1, Number(count.value) - 1);
  emit('update:quantity', Number(count.value));
};

const updateQuantity = (newValue) => {
  count.value = newValue;
  emit('update:quantity', Number(newValue));
};
</script>

<template>
  <div class="form__counter">
    <button
      class="form__counter-btn"
      type="button"
      @click.stop="countMinus"
      :disabled="count === 1"
      aria-label="Убрать один товар"
    >
      <IconMinus class="icon"></IconMinus>
    </button>

    <input type="text" v-model="count" name="count" @input="updateQuantity($event.target.value)" />

    <button
      class="form__counter-btn"
      type="button"
      @click.stop="countPlus"
      aria-label="Добавить один товар"
    >
      <IconPlus class="icon"></IconPlus>
    </button>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variable.scss';
.form__counter {
  display: flex;
  align-items: center;
  width: 150px;
  height: 70px;
  background-color: $color_white;

  &-btn {
    margin: 0;
    padding: 0;
    border: 0;
    outline: none;
    background-color: transparent;
    -webkit-tap-highlight-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid #e2e2e2;
    flex-shrink: 0;
    width: 37px;
    height: 37px;
    flex-shrink: 0;
    cursor: pointer;
    transition: background 0.3s ease-in-out;

    .icon {
      transition: fill 0.3s ease-in-out;
    }

    &:hover,
    &:focus {
      background-color: $color_text;
      .icon {
        fill: $color_white;
      }
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  & input {
    height: 70px;
    width: 70px;
    border-radius: 0;
    background-color: transparent;
    border: none;
    box-shadow: none;
    color: $color_text;
    outline: none;
    font-size: 24px;
    line-height: 1;
    text-align: center;
  }
}

@media (max-width: 562px) {
  .form__counter {
    &-btn {
      width: 25px;
      height: 25px;
    }

    & input {
      font-size: 16px;
    }
  }
}
</style>
