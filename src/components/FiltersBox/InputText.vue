<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  value: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:value']);

const newValue = ref(props.value);
const name = ref(props.name);

function handlValue(event) {
  newValue.value = +event.target.value;
  emit('update:value', +newValue.value);
}
</script>

<template>
  <label class="form__label form__label--price">
    <input
      class="form__input"
      type="text"
      :name="name"
      :value="newValue"
      @input="handlValue($event)"
    />
    <span class="form__value"><slot></slot></span>
  </label>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variable.scss';
// const productStore = useProductStore();
// if (name.value === 'minPrice') {
//   productStore.handlePriceMin(event.target.value);
// } else {
//   productStore.handlePriceMax(event.target.value);
// }
.form {
  &__label {
    position: relative;
    display: block;
    color: $color_text;

    &:not(:last-child) {
      margin-bottom: 25px;
    }

    &--price::after {
      content: '₽';
      position: absolute;
      top: 32px;
      right: 20px;
      font-size: 16px;
      line-height: 1;
      color: $color_text;
    }
  }
  &__value {
    position: absolute;
    top: 10px;
    left: 20px;
    font-size: 12px;
    line-height: 1;
    color: $color_text_form;
    font-weight: 300;
  }

  &__input {
    padding: 28px 45px 13px 20px;
    width: 100%;
    height: 65px;
    border-radius: 1px;
    border: 1px solid transparent;
    background-color: $color_bg;
    transition: all 0.2s ease;
    color: $color_text;
    font-size: 16px;
    line-height: 1;

    &:hover,
    &:focus {
      outline: none;
      border-color: $color_text;
    }
  }
}
</style>
