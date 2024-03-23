<script setup>
import { computed, defineProps } from 'vue';
import ButtonLoader from '../Loader/ButtonLoader.vue';

const props = defineProps({
  color: {
    type: String,
    default: 'primery',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const determinateColor = computed(() => {
  if (props.color === 'second') {
    return 'button--second';
  } else {
    return 'button--primery';
  }
});
</script>

<template>
  <button class="button" :class="determinateColor" :disabled="disabled">
    <ButtonLoader v-if="loading"></ButtonLoader>
    <slot>Применить</slot>
  </button>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variable.scss';

.button {
  margin: 0;
  padding: 25px 15px;
  border: 0;
  outline: none;
  background-color: transparent;
  -webkit-tap-highlight-color: transparent;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 5px;
  font-family: 'Circe', 'Arial', sans-serif;
  text-transform: uppercase;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &--primery {
    background-color: $color_primery;
    border: none;
    color: $color_white;
    font-size: 13px;
    transition: background 0.3s ease-in-out;

    &:not(:disabled):hover,
    &:not(:disabled):focus {
      background-color: $color_black;
    }
  }
  &--second {
    background-color: transparent;
    border: 1px solid $color_text;
    padding: 15px;
    color: $color_text;
    font-size: 14px;
    transition: background 0.3s ease-in-out, color 0.3s ease-in-out;

    &:not(:disabled):hover,
    &:not(:disabled):focus {
      background-color: $color_text;
      color: $color_white;
    }
  }
  &-del {
    margin: 0;
    padding: 0;
    border: 0;
    background-color: transparent;
    -webkit-tap-highlight-color: transparent;
    width: 20px;
    height: 20px;
  }
}
</style>
