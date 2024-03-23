<script setup>
import FormFieldset from './FormFieldset.vue';

import { ref, toRef, defineProps, defineEmits, onBeforeMount } from 'vue';
import { useCategoryList } from '@/composables/Base/useProducts';

const props = defineProps({
  value: {
    type: Number,
  },
});

const emit = defineEmits(['update:value']);

const selectValue = toRef(props.value);
const categoryArr = ref([]);

onBeforeMount(async () => {
  categoryArr.value = await useCategoryList();
});

function handlValue(id) {
  emit('update:value', id);
}
</script>

<template>
  <FormFieldset :legend="'Категория'">
    <label class="form__label form__label--select">
      <select
        class="form__select"
        name="category"
        v-model="selectValue"
        @change="handlValue(selectValue)"
      >
        <option v-for="item in categoryArr" :key="item.id" :value="item.id">
          {{ item.title }}
        </option>
      </select>
    </label>
  </FormFieldset>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variable.scss';
.form {
  &__label {
    position: relative;
    display: block;
    color: $color_text;

    &--select::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
      width: 14px;
      height: 7px;
      background-image: url('@/assets/images/icon-arrow-bottom.svg');
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
  &__select {
    width: 100%;
    height: 52px;
    border-radius: 0;
    border: none;
    appearance: none;
    padding: 14px 35px 14px 18px;
    background-color: $color_bg;
    color: $color_text;
    font-size: 16px;
    line-height: 1;
  }
}
</style>
