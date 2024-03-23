<script setup>
import FormFieldset from './FormFieldset.vue';
import InputRadio from './InputRadio.vue';

import { useColorsList } from '@/composables/Base/useProducts';
import { ref, defineEmits, onBeforeMount } from 'vue';

const colorArr = ref([]);
const currentColorId = ref(0);

const emit = defineEmits(['update:value']);

onBeforeMount(async () => {
  colorArr.value = await useColorsList();
});

function handlValue(id) {
  currentColorId.value = id;
  emit('update:value', id);
}
</script>

<template>
  <FormFieldset :legend="'Цвет'">
    <ul class="colors">
      <li class="colors__item" v-for="item in colorArr" :key="item.id">
        <InputRadio
          :item="item"
          @change="handlValue(item.id)"
          :isChecked="currentColorId === item.id"
        ></InputRadio>
      </li>
    </ul>
  </FormFieldset>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variable.scss';
</style>
