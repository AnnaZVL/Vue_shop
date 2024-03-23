<script setup>
import replacingEndings from '@/helpers/helpers.js';
import { computed, defineProps } from 'vue';

const props = defineProps({
  name: {
    type: String,
  },
  quantity: {
    type: Number,
  },
});

const descrNumber = computed(() => replacingEndings(props.quantity));
</script>

<template>
  <div class="content__row">
    <h1 class="content__title">{{ props.name }}</h1>
    <span class="content__info" v-if="props.quantity">
      {{ props.quantity }} {{ descrNumber }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variable.scss';
.content {
  &__row {
    display: flex;
    align-items: center;
  }

  &__title {
    margin: 10px 0;
    font-weight: 800;
    font-size: 24px;
    line-height: 54px;
    text-transform: uppercase;
  }

  &__info {
    margin: 10px 0 0 12px;
    font-size: 16px;
    font-weight: 300;
    line-height: 1;
    color: $color_grey;
  }
}
</style>
