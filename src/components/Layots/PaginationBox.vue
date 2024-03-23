<script setup>
import IconArrowLeft from '@/assets/images/icons/IconArrowLeft.vue';
import IconArrowRight from '@/assets/images/icons/IconArrowRight.vue';

import { useProductStore } from '@/store/productStore.js';
import { defineProps, ref, defineEmits } from 'vue';

const productStore = useProductStore();
const props = defineProps({
  page: {
    type: Number,
  },
});
const emit = defineEmits(['update:pade']);
const currentPage = ref(props.page);

function pagination(page) {
  currentPage.value = page;
  emit('update:pade', currentPage.value);
}

function paginationNext() {
  currentPage.value += 1;
  emit('update:pade', currentPage.value);
}

function paginationBack() {
  currentPage.value -= 1;
  emit('update:pade', currentPage.value);
}
</script>

<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        aria-label="Предыдущая страница"
        @click.prevent="paginationBack()"
        :class="{ disabled: currentPage === 1 }"
      >
        <IconArrowLeft></IconArrowLeft>
      </a>
    </li>
    <li class="pagination__item" v-for="page in productStore.paginationAll.pages" :key="page">
      <a
        class="pagination__link"
        :class="{ current: page === currentPage }"
        @click.prevent="pagination(page)"
      >
        {{ page }}
      </a>
    </li>

    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        href="#"
        aria-label="Следующая страница"
        @click.prevent="paginationNext()"
        :class="{ disabled: currentPage === productStore.paginationAll.pages }"
      >
        <IconArrowRight></IconArrowRight>
      </a>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variable.scss';

.pagination {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &__item:first-child {
    margin-right: 25px;
  }

  &__item:last-child {
    margin-left: 25px;
  }

  &__link {
    display: block;
    padding: 13px 3px;
    height: 40px;
    min-width: 40px;
    font-size: 16px;
    line-height: 1;
    color: #d1d1d1;
    text-align: center;
    transition: all 0.2s ease;

    &:not(:disabled):hover,
    &:not(:disabled):focus {
      color: $color_text;
    }
    &.disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    &.current {
      color: $color_text;
      font-weight: 700;
    }
    &--arrow {
      border: 1px solid #e2e2e2;
      border-radius: 50%;
      &:hover,
      &:focus {
        border-color: $color_text;
      }
    }
    &--disabled {
      opacity: 0.6;
      cursor: not-allowed;
      &:hover,
      &:focus {
        border-color: #e2e2e2;
      }
    }
  }
}
</style>
