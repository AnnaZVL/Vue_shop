<script setup>
import { defineProps } from 'vue';
defineProps({
  name: {
    type: String,
    requared: true,
  },
  label: {
    type: String,
    requared: true,
  },
  count: {
    type: String,
    default: '',
  },
  checked: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <label class="options__label">
    <input
      class="options__radio sr-only"
      type="radio"
      :name="name"
      value="card"
      :checked="checked"
    />
    <div class="options__value">
      <span> {{ label }} </span>
      <span> {{ count }} </span>
    </div>
  </label>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/_variable.scss';
.options {
  &__label {
    display: block;
    height: 100%;
    cursor: pointer;
  }

  &__value {
    position: relative;
    background-color: $color_white;
    border: 1px solid $color_border-second;
    border-radius: 2px;
    padding: 35px 10px 30px 67px;
    display: flex;
    gap: 5px;
    align-items: center;
    flex-wrap: wrap;
    font-size: 14px;
    line-height: 1;
    color: $color_text;
    transition: all 0.3s ease;
    span:last-child {
      font-weight: bold;
    }
  }
  &__value::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 35px;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    border: 1px solid $color_text;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .options__label:hover .options__value {
    background-color: rgba(224, 45, 113, 0.2);
  }
  .options__label:hover .options__value::before {
    border: 4px solid $color_white;
  }

  .options__radio:focus ~ .options__value {
    background-color: rgba(224, 45, 113, 0.2);
  }
  .options__radio:focus ~ .options__value::before {
    background-color: $color_text;
  }

  .options__radio:checked ~ .options__value {
    background-color: $color_primery;
    color: $color_white;
  }
  .options__radio:checked ~ .options__value::before {
    border: 4px solid $color_white;
  }
}
</style>
