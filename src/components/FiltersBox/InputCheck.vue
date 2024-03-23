<script setup>
// import { useProductStore } from '@/store/productStore.js';
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  item: {
    tupe: Object,
    required: true,
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:value']);
const newValue = ref(props.value);

function handlValue(id) {
  newValue.value = id;
  emit('update:value', +newValue.value);
}
</script>

<template>
  <label class="check-list__label">
    <input
      class="check-list__check sr-only"
      type="checkbox"
      :value="newValue"
      @change="handlValue(item.id)"
      :checked="props.isChecked"
    />
    <span class="check-list__desc">
      {{ item.title }}
      <span>{{ item.productsCount }}</span>
    </span>
  </label>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variable.scss';

.check-list__label {
  display: block;
  cursor: pointer;

  &:hover .check-list__desc::after,
  &:focus .check-list__desc::after {
    opacity: 0.3;
  }
}

.check-list__desc {
  position: relative;
  display: block;
  padding-left: 27px;
  padding-top: 3px;
  padding-bottom: 3px;
  font-size: 16px;
  line-height: 1;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    background-color: $color_white;
    border: 1px solid $color_text;
  }
  &::after {
    content: '';
    position: absolute;
    opacity: 0;
    top: 50%;
    left: 3px;
    width: 6px;
    height: 6px;
    transform: translateY(-50%);
    background-color: $color_primery;
    transition: all 0.2s ease;
  }
  span {
    color: $color_text_form;
  }
}

.check-list__check:checked ~ .check-list__desc::after {
  opacity: 1;
}
</style>
