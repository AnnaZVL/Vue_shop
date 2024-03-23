<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  legend: {
    type: String,
  },
});
</script>

<template>
  <fieldset class="form__block">
    <legend class="form__legend">{{ props.legend }}</legend>
    <slot></slot>
  </fieldset>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variable.scss';

.form {
  &__block {
    padding: 0;
    margin: 0;
    // margin-bottom: 35px;
    border: none;
    width: 100%;
  }

  &__legend {
    margin-bottom: 12px;
    font-size: 14px;
    line-height: 1;
    color: $color_text_form;
  }
}
</style>
