<script setup>
import { defineProps, defineEmits } from 'vue';
defineProps({
  type: {
    type: String,
    default: 'text',
    requared: true,
  },
  name: {
    type: String,
    requared: true,
  },
  placeholder: {
    type: String,
    requared: true,
  },
  label: {
    type: String,
    requared: true,
  },
  error: {
    type: Object,
    default: () => ({ value: false, message: '' }),
  },
  value: {
    type: String,
    requared: true,
  },
});
const emit = defineEmits(['update:value', 'focus']);
const handlValue = (event) => {
  emit('update:value', event.target.value);
};

const onFocus = () => {
  emit('focus');
};
</script>

<template>
  <label class="form__label">
    <input
      class="form__input"
      :value="value"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      @input="handlValue"
      @focus="onFocus"
    />
    <span class="form__value">{{ label }}</span>
    <span class="form__error" v-if="error.value">{{ error.message }}</span>
  </label>
</template>

<style scoped></style>
