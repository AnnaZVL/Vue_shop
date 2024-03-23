<script setup>
import FormFieldset from './FormFieldset.vue';
import InputCheck from './InputCheck.vue';

import { useSeasonsList } from '@/composables/Base/useProducts';
import { ref, defineEmits, onBeforeMount } from 'vue';

const seasonsArr = ref([]);

const currentSeasonlId = ref(0);

const emit = defineEmits(['update:value']);

onBeforeMount(async () => {
  seasonsArr.value = await useSeasonsList();
});

function handlValue(id) {
  currentSeasonlId.value = id;
  emit('update:value', id);
}
</script>

<template>
  <FormFieldset :legend="'Коллекция'">
    <ul class="check-list">
      <li class="check-list__item" v-for="item in seasonsArr" :key="item.id">
        <InputCheck
          :item="item"
          :value="item.title"
          @change="handlValue(item.id)"
          :is-checked="currentSeasonlId === item.id"
        ></InputCheck>
      </li>
    </ul>
  </FormFieldset>
</template>

<style lang="scss" scoped></style>
