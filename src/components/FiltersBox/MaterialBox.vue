<script setup>
import FormFieldset from './FormFieldset.vue';
import InputCheck from './InputCheck.vue';

import { useMaterialsList } from '@/composables/Base/useProducts';
import { ref, defineEmits, onBeforeMount } from 'vue';

const materialsArr = ref([]);

const currentMaterialId = ref(0);

const emit = defineEmits(['update:value']);

onBeforeMount(async () => {
  materialsArr.value = await useMaterialsList();
});

function handlValue(id) {
  currentMaterialId.value = id;
  emit('update:value', id);
}
</script>

<template>
  <FormFieldset :legend="'Материал'">
    <ul class="check-list">
      <li class="check-list__item" v-for="item in materialsArr" :key="item.id">
        <InputCheck
          :item="item"
          @change="handlValue(item.id)"
          :is-checked="currentMaterialId === item.id"
        ></InputCheck>
      </li>
    </ul>
  </FormFieldset>
</template>

<style lang="scss" scoped></style>
