<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  item: {
    tupe: Object,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <label class="colors__label">
    <input
      ref="radio"
      class="colors__radio sr-only"
      type="radio"
      :name="item.title"
      :value="item.id"
      :checked="props.isChecked"
      :class="{ active: props.isActive }"
    />
    <span class="colors__value" :style="{ 'background-color': item.code }"> </span>
  </label>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variable.scss';

.colors__label {
  position: relative;
  cursor: pointer;
  display: block;
  border-radius: 50%;
  padding: 3px;
}

.colors__value {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 1px solid transparent;
    transition: all 0.3s ease-in-out;
  }
}
.colors__label:hover .colors__value::before,
.colors__label:focus .colors__value::before,
.colors__radio:checked ~ .colors__value::before,
.colors__radio.active ~ .colors__value::before {
  border-color: $color_dark;
}

.colors__radio:focus ~ .colors__value::before {
  opacity: 0.7;
}
</style>
