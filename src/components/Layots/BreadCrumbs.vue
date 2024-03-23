<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  breadList: Array,
});
</script>

<template>
  <ul class="breadcrumbs">
    <li class="breadcrumbs__item" v-for="(link, index) in props.breadList" :key="index">
      <router-link class="breadcrumbs__link" :to="link.path">{{ link.name }}</router-link>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variable.scss';

.breadcrumbs {
  margin: 0;
  margin-bottom: 10px;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  &__item {
    position: relative;

    &:not(:last-child) {
      padding-right: 35px;
    }
    &:not(:last-child)::after {
      content: '—';
      position: absolute;
      top: 50%;
      right: 13px;
      transform: translateY(-50%);
      color: $color_grey-light;
    }
    &:last-child > .breadcrumbs__link {
      cursor: default;
    }
  }
  &__link {
    font-size: 14px;
    line-height: 1;
    color: $color_grey-light;
    transition: all 0.2s ease;

    &[href]:hover,
    &[href]:focus {
      color: $color_text;
    }
  }
}
</style>
